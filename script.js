console.log("this is okay")

window.onload=()=>{
    loadNews("All")
}
let subject="";
const apply=document.getElementById("apply")
apply.addEventListener('click',()=>{
      subject=document.getElementById("subject").value
     console.log(subject)
     document.querySelector('.main').innerHTML = '';
     document.getElementById("search").value=""

     loadNews(subject)
})
let input=""
const getNews=document.getElementById("getNews")
getNews.addEventListener('click',()=>{
     input=document.getElementById("search").value
    document.querySelector('.main').innerHTML = '';
    console.log(input)
    
loadNews(input)
    
})
document.querySelector(".refresh").addEventListener('click',()=>{
      document.querySelector('.main').innerHTML = '';
    if(input){
      loadNews(input);
    }
    else if(subject){
      loadNews(subject)
    }
    else{
      loadNews("All")
    }



     
})


try {
    
function loadNews(subject){
  
    
fetch(`https://newsdata.io/api/1/latest?apikey=pub_3fbdb77a6f1c4b38bebdd3b416e75e85&q=${subject}`).then(res=>res.json())
.then(data=>{
 
    console.log(data.results[0].title);
    data.results.forEach(article => {
        console.log(article)
       
         const p = document.createElement('div');
         p.style.paddingBottom="10px"
      p.innerHTML= `
    <div class="news-card">
    
      <img src="${article.image_url}" alt="${article.title}">
       <h2 class="news-title">${article.title}</h2>
       <button class="toggal">view in detail</button>
       <div style="display:none" class="hide">
      <p>Date(GMT+05:30):${article.pubDate}</p>
       <p>country:${article.country}</p>
        <p>category:${article.category}</p>
      <div class="news-content">
       
        <p class="news-description">${article.description || 'No description available.'}</p>
        <p>publisher:${article.source_name}</p>
        </div>

        <a href="${article.link}" class="news-link" target="_blank">Read more</a>
      </div>
    </div>
  `;
  document.querySelector('.main').appendChild(p)
  




        
    });
 const hides=document.querySelectorAll('.hide')
  const toggals=document.querySelectorAll('.toggal')
toggals.forEach((btn,index)=>{
    
  btn.addEventListener("click",()=>{
    let hide=hides[index]
    
  if(hide.style.display==='none'){
    hide.style.display='block'
  }
  else{
    hide.style.display="none"
  }
  })

})
})}


    
} catch (error) {
    const p = document.createElement('div');
         p.style.paddingBottom="10px"
      p.innerHTML= `<h2>unable to fetch data</h2>`
        document.querySelector('.main').appendChild(p)
    
}