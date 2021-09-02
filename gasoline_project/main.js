window.onload = function() {
    let section = document.getElementsByTagName("section");
    let pointBtn = document.querySelectorAll('.pointWrap li');
    let pageNum = 0;
    let totalNum = section.length;

    for( let i = 0; i < pointBtn.length; i++ ){
        (function(idx) {
            pointBtn[idx].onclick = function() {
                pageNum = idx;
                pageChangeFunc();

                window.scrollTo({
                  top: section[pageNum].offsetTop,
                  behavior: 'smooth',
                })
            }
        })(i);
        
    }

    window.addEventListener("scroll", function(event){
    let scroll = this.scrollY;

    for(let i=0; i<totalNum; i++){
        if(scroll > section[i].offsetTop - window.outerHeight/1.5  && scroll < section[i].offsetTop - window.outerHeight/1.5 + section[i].offsetHeight){
        pageNum = i;
        break;
        }
    }
    pageChangeFunc();
    });

    function pageChangeFunc(){
    for(let i=0; i<totalNum; i++){
        section[i].classList.remove("active");
        pointBtn[i].classList.remove("active");
    }
    section[pageNum].classList.add("active");
    pointBtn[pageNum].classList.add("active");
    
    }
    pageChangeFunc();

    window.scrollTo({
        top: section[0].offsetTop,
        behavior: 'smooth',
    })
}

let start = document.querySelector('button');

start.addEventListener('click', function(event){
    event.preventDefault();
    const apiKey = document.querySelector('input').value;
    api_call(apiKey);
})


//CORS error
function api_call(apiKey) {
    let url = `http://www.opinet.co.kr/api/lowTop10.do?out=json&code=${apiKey}&prodcd=B027&area=1703&cnt=10`

    axios.request({
        method: 'GET',
        url: url,
        withCredentials: false,
        headers: {'Access-Control-Allow-Origin' : '*'},
        type: 'json'
    })
    .then(function(res) {
        console.log(res.data)
    })
}