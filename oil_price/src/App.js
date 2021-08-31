import React from 'react';
import './App.css';

function App() {
  let scrollTop = 0;
  let bar;

  window.onload = function() {
      bar = document.getElementsByClassName("percentage")[0];
  }

  window.addEventListener("scroll" , function(event) {

      scrollTop = document.documentElement.scrollTop;
      let percent = Math.ceil((scrollTop / (document.body.scrollHeight - window.outerHeight)) * 100);

      bar.style.height = percent + "%"
  });

  return (
    <div className="App">
      <h1>hi</h1>
      <div className="progressbar">
        <span className="percentage"></span>
      </div>
    </div>
  );
}

export default App;
