let scrollTop = 0;
let t1 = gsap.timeline({ paused:true, reversed:true});
let t2 = gsap.timeline({ paused:true, reversed:true});
let t3 = gsap.timeline({ paused:true, reversed:true});

t1.play();

window.addEventListener("scroll", (e)=>{
    scrollTop = document.documentElement.scrollTop;
    console.log(scrollTop)
        if( scrollTop > window.outerHeight / 10 ) {
            t2.play();
        } else if (scrollTop < window.outerHeight / 10) {
            t2.reverse();
        }
        if ( scrollTop > 1000) {
            t3.play();
        } else if ( scrollTop < 1200) {
            t3.reverse();
        }
    
})

t1.from(".couple",
{
    ease: "slowmo.ease(.7, .8)",
    y: "200%",
    duration: 1.5,
});

t1.to(".menu",
{
    ease: "elastic.out(1, .8)",
    opacity: 1,
    duration: 1.5,
},0.2
);

t1.to(".container h1, .container p",
{
    ease: "elastic.out(1, .8)",
    y: "-8%",
    opacity: 1,
    duration: 1.5,
},0.2
);

t2.to(".couple",
{
    ease: "ease.out",
    y: "-120%",
    duration: 2,
});

t2.to(".menu",
{
    ease: "power1.inOut",
    x: "-250%",
    opacity: 0,
    duration: 1.5,
}, 0.2);

t2.to(".container h1, .container p, .container span",
{
    ease: "power1.inOut",
    y: "500%",
    opacity: 0,
    duration: 1,
},0.2
);

t2.to(".wedding",
{
    ease: "ease.inOut",
    opacity: 1,
    duration: 3,
},0.2
);

t3.to(".wedding",
{
    ease: "ease.inOut",
    opacity: 0,
    duration: 3,
},0.2
);

t3.to(".container h6",
{
    ease: "power1.inOut",
    y: "500%",
    opacity: 0,
    duration: 1,
},0.2
);