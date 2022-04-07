let scrollTop = 0;
let h1;
let coverImg;
let cover;
let menu = document.querySelector(".menu");
let greeting = document.querySelector("#greeting");
let underline = document.querySelector(".underline");
let section = document.querySelectorAll("section")[1];
let section_height = section.offsetHeight;

window.onload = function(){
  coverImg = document.getElementsByClassName("coverImg")[0];
  cover = document.getElementsByClassName("cover")[0];
  cover.style.opacity = .3;
}

window.addEventListener("scroll", function(e){
  scrollTop = document.documentElement.scrollTop;
  coverImg.style.transform = "scale("+ (1 + scrollTop/1000) +")";
  cover.style.opacity = .3 + scrollTop / 1000;

  // check percentage;
  if (scrollTop > 50) {
    underline.style.width = (scrollTop/ (scrollTop + section_height)) * 100 + '%';
    greeting.style.animation = "greeting 1.2s ease-out forwards";
  }

});

menu.addEventListener("click", ()=>{
  alert('coming soon!')
})