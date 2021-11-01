import React from "react";

function Kakao() {
  let scr = document.createElement("script");
  scr.async = "true";
  scr.type = "text/javascript";
  scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
  // document.querySelector(".adfit").appendChild(scr);
  console.log(scr);

  return (
    <div className="adfit">
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit="DAN-rgk7dxo2C6UptXbe"
        data-ad-width="160"
        data-ad-height="600"
      ></ins>
    </div>
  );
}

export default Kakao;
