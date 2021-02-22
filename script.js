const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded=0;
let totalImages =0;
let photosArray = [];

// Unsplash API
const count =30;
const apiKey='XS8eQ7Fsh5GyAas01Eo5XcA9R0L06zSlE-vrfGW_Q4I';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//Ceheck if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden=true;
    }
}


// Create elements for links and photos, add to DOM
function displayPhotos(){
    imagesLoaded=0;
    totalImages = photosArray.length;
    
    //run function for each object in photosArray
    photosArray.forEach((photo)=>{
        //crate <a> to link to Unsplah
        const item =document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');
        //create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        // Event listener, check when each is finishe loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get Photos from Unsplash API

async function getPhotos(){
    try{
        const reponse= await fetch(apiUrl);
        photosArray = await reponse.json();
        displayPhotos();
     
    }catch(error){
        //Catch error here
    }
}

//check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >=document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
        
    }
});

//On load
getPhotos();