
const categoryContainer = document.getElementById('categoryContainer');

const newsContainer = document.getElementById('newsContainer');

const bookmarkContainer = document.getElementById('bookmarkContainer')

let bookmarks = [];

// nav category section strat
const loadCategroy = () => {
    fetch("https://news-api-fs.vercel.app/api/categories")
        .then((res) => res.json())
        .then((data) => {
            const categories = data.categories
            console.log(categories);
            
            showCategory(categories)
            
        })
        .catch((err) => {
            console.log(err);
        })
}
const showCategory = (categories)=>{
    categories.forEach(cat => {
                categoryContainer.innerHTML += `
                    <li id="${cat.id}" class="hover:border-b-4 hover:border-red-600 border-red-600 cursor-pointer">${cat.title}</li>
                `;
    });

    categoryContainer.addEventListener('click', (e)=>{
        const allLi = document.querySelectorAll('li')
        allLi.forEach(li =>{
            li.classList.remove('border-b-4')
        })

        if(e.target.localName === "li"){
            // console.log(e.target);
            showLoading()
            e.target.classList.add('border-b-4')
            loadNewsByCategory(e.target.id)
        }
    })
}
// nav category section End


// newsContainer section start
const loadNewsByCategory = (categoryId)=>{
    // console.log(categoryId);
    fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then(res => res.json())
    .then(data=>{
        showNewsByCategory(data.articles)
    })
    .catch(err=>{
        showError()
        
    }) 
}


const showNewsByCategory = (articles) => {
    newsContainer.innerHTML= ""
    articles.forEach((article)=>{
        newsContainer.innerHTML +=`
            <div class = "border border-gray-300 rounded-lg">
                <div>
                    <img src="${article.image.srcset[5].url}"/>
                </div>
                <div id="${article.id}" class= "p-2" > 
                    <h1 class="font-bold" >${article.title}</h1>
                    <p class="text-sm pt-2">${article.time}</p>
                    <button class="btn">bookmark</button>
                </div>
            </div>
    `
        
    })
    
}


newsContainer.addEventListener('click', (e)=>{
    if(e.target.innerText==="bookmark"){
    handleBookmarks(e)
        
    }
})

const handleBookmarks = (e)=>{
    const title = e.target.parentNode.children[0].innerText
        const id = e.target.parentNode.id
        bookmarks.push({
            title: title,
            id: id
        })
        showBookmark(bookmarks);
        
}

const showBookmark = (bookmarks)=>{
    bookmarkContainer.innerHTML = ""
    bookmarks.forEach(bookmark=>{
        bookmarkContainer.innerHTML += `
        <div class="border my-2 p-1">
            <h1>${bookmark.title}</h1>
            <button onclick="handleDeleteBookmarks('${bookmark.id}')" class="btn btn-xs">Delete</button>
        </div>
        `
    })
 
}


// const handleDeleteBookmarks = (bookmarkid)=>{
//     const filterBookmarks = bookmarks.filter(bookmark => bookmark.id!==bookmarkid)
//     bookmarks = filterBookmarks
//     showBookmark(bookmarks)
    
// }


const showLoading = ()=>{
    newsContainer.innerHTML = `
            <div class=" p-3 m-80">
                Loading...
            </div>
    `
}
const showError = ()=>{
    newsContainer.innerHTML = `
            <div class=" bg-red-500 p-3 m-60 col-span-3  text-center">
                Something Went wrong
            </div>
    `
}

loadCategroy();
loadNewsByCategory('main')


// const loadCategroyAsync = async () => {
//     try {
//         const res = await fetch("https://news-api-fs.vercel.app/api/categories")
//         const data = await res.json()
//         console.log(data);

//     } catch (error) {
//         console.log(error);
        
//     }
// }
// loadCategroyAsync();