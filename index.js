// console.log('ok')
const categories = async category =>{
     const url = `https://openapi.programming-hero.com/api/news/categories`;
     const res = await fetch(url);
     const data = await res.json();
     displayCategories(data.data.news_category);
     
}
const displayCategories = category =>{
    for(const cat of category){
        const categoryid = document.getElementById('category');
        categoryid.innerHTML +=  `
        <div class="col-sm categories"><a onclick = dataLoad('${cat.category_id}') href = "#">${cat.category_name}</a></div>
        `

        // const node = document.createElement('div');
        // node.className = 'col-sm categories';
        // const textnode = document.createTextNode(cat.category_name);
        // node.appendChild(textnode);
        // document.getElementById("category").appendChild(node);
        //  console.log(cat.category_id);

        // const elements = document.querySelectorAll('div[class*="col-sm"');



    }
    
}

const dataLoad =async (allData = '08') =>{
    try{
        const url = `https://openapi.programming-hero.com/api/news/category/${allData}`;
    const res = await fetch(url);
    const data = await res.json();
        // console.log(allData);
    const dataloadId = document.getElementById('dataload');
    dataloadId.innerHTML = '';
    let newsCount = 0;
    for(const news of data.data){
        
        newsCount++;
        dataloadId.innerHTML += 
    `
    <div onclick = "loadModal('${news._id}')" class="row news-data my-5" data-toggle="modal" data-target="#modalData">
    <div class="col-lg-4 col-md-4 col-sm-12">
    <img class = "py-3" src="${news.image_url}" style="height:100%;width:100%;border-radius: 20px;" alt="image">
    </div>
    <div class="col-lg-8 col-md-8 col-sm-12 p-5">
    <div style="height:90%;">
        <h3 class="news-data-title">${news.title}</h3>
        <p style="color:gray;">
        ${news.details?news.details.slice(0,400):'There is no Details here'}
        ...</p>
        </div>
        <div class="d-flex">
        <img class="mr-3" src="${news.author.img}" style="height:50px;width:50px;border-radius: 50%;" alt="">
        <div class = "mr-4">
            <h5 class="mr-5">${news.author.name}</h4>
                <p>${news.author.published_date}</p>
        </div>

        <p><i class="fa-solid fa-eye"></i> ${news.total_view}</p>
    </div>
</div>
</div>
    `
    }
    const countNewsId = document.getElementById('countNews');
    countNewsId.innerText = `${newsCount} items found`;
    countNewsId.classList.remove('d-none')
    //  console.log(data.data[0].category_id);
    }
    catch(err){
        console.log(err);
    }

}
const loadModal = async id =>{
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    console.log(data.data);

    const modalDataLabel = document.getElementById('modalDataLabel');
    modalDataLabel.innerText = data.data[0].title;
    const modalDetails = document.getElementById('modalDetails');
    modalDetails.innerHTML = data.data[0].author.published_date && data.data[0].total_view && data.data[0].author.name ?
    `
        <p>Author Name :${data.data[0].author.name}</p>   
        <p>Published Date : ${data.data[0].author.published_date}</p> 
        <p>Total view : ${data.data[0].total_view}</p>
    `
    :`<p>No data found.</p>`

}

categories();
dataLoad();