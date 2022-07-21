window.onload = function(){
  var section = document.getElementsByTagName("section");
  var pointBtn = document.querySelectorAll('.pointWrap li');

  var pageNum = 0;
  var totalNum = section.length;

  for( var i = 0; i < pointBtn.length; i++ ){
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

  //페이지 변경
  function pageChangeFunc(){
    for(var i=0; i<totalNum; i++){
      section[i].classList.remove("active");
      pointBtn[i].classList.remove("active");
    }
    section[pageNum].classList.add("active");
    pointBtn[pageNum].classList.add("active");
    
  }

  //페이지 로드되면 바로 실행
  pageChangeFunc();

}