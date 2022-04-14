let scrollTop = 0;
let h1;
let coverImg;
let cover;
let navBar = document.querySelector(".nav-bar");
let menu = document.querySelector(".menu");
let close = document.querySelector(".close");
let greeting = document.querySelector("#greeting");
let underline = document.querySelector(".underline");
let origin = document.querySelectorAll("section")[0];
let section = document.querySelectorAll("section");
let greeting_btn = document.querySelector(".greeting-btn");
let info_btn = document.querySelector(".info-btn");
let location_btn = document.querySelector(".location-btn");
let photo_btn = document.querySelector(".photo-btn");

window.onload = function(){
  coverImg = document.getElementsByClassName("coverImg")[0];
  cover = document.getElementsByClassName("cover")[0];
  cover.style.opacity = .3;
}

window.addEventListener("scroll", function(e){
  scrollTop = document.documentElement.scrollTop;
  coverImg.style.transform = "scale("+ (1 + scrollTop/1000) +")";
  cover.style.opacity = .3 + scrollTop / 1000;

  underline.style.width = ((scrollTop/ ( origin.offsetHeight)) * 60) + '%';
  // check percentage;
  if (scrollTop > 50) {
    greeting.style.animation = "greeting 1.2s ease-out forwards";
  }

});

menu.addEventListener("click", ()=>{
  navBar.style.width = "60vw";
})

close.addEventListener("click", ()=>{
  navBar.style.width = "0";
})

greeting_btn.addEventListener("click", ()=>{
  window.scrollTo({ top: origin.offsetHeight, behavior: "smooth" });  
})

info_btn.addEventListener("click", ()=>{
  window.scrollTo({ top: origin.offsetHeight + section[1].offsetHeight, behavior: "smooth" });  
})

location_btn.addEventListener("click", ()=>{
  window.scrollTo({ top: origin.offsetHeight + section[1].offsetHeight + section[2].offsetHeight, behavior: "smooth" });  
})

photo_btn.addEventListener("click", ()=>{
  alert("coming soon!")
})