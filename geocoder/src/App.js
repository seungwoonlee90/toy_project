import React, { useState } from "react";
import "./App.css";
import CSVReader from "react-csv-reader";
import axios from "axios";
import { CSVLink } from "react-csv";
import Coupang from "./Coupang";

function App() {
  let [progress, prgoressEdit] = useState(false);
  let [down, downEdit] = useState(false);
  let [crs, crsEdit] = useState(4326);
  let [data, dataEdit] = useState([]);
  let [addType, addTypeEdit] = useState("road");
  let [percent, percentEdit] = useState(0);

  const handleForce = async (data, fileInfo) => {
    if (fileInfo) {
      prgoressEdit(true);
    }
    let newArray = [];
    for (let i = 0; i < data.length; i++) {
      let address = data[i].addr;
      let Key = process.env.REACT_APP_API_KEY;
      percentEdit(Math.ceil((i / data.length) * 100));
      let url = `http://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:${crs}&address=${address}&refine=true&simple=false&format=json&type=${addType}&key=${Key}`;

      try {
        await axios.get(url).then((res) => {
          let xcoord = res.data.response.result.point.x;
          let ycoord = res.data.response.result.point.y;
          newArray.push({ address, xcoord, ycoord });
        });
      } catch {
        let xcoord = "";
        let ycoord = "";
        newArray.push({ address, xcoord, ycoord });
      }
    }
    dataEdit(newArray);
    prgoressEdit(false);
    downEdit(true);
  };

  const headers = [
    { label: "addr", key: "address" },
    { label: "x", key: "xcoord" },
    { label: "y", key: "ycoord" },
  ];

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace("/W/g", "_"),
  };

  const handleSelect = (e) => {
    crsEdit(e.target.value);
  };

  const addrSelect = (e) => {
    addTypeEdit(e.target.value);
  };

  return (
    <>
      <div className="App">
        <div className="wrapper">
          <div className="header">
            <h4>주소 좌표 변환기 ver 1.0 📍</h4>
            <div className="desc">
              브이월드(vworld)에서 제공하는 geocoder api를 이용하여 <br />
              <select className="options" onChange={addrSelect}>
                <option value="road"> 📍 도로명주소</option>
                <option value="PARCEL"> 📍 지번주소</option>
              </select>
              를
              <select className="options" onChange={handleSelect}>
                <option value="4326"> 🌏 위경도 (EPSG:4326)</option>
                <option value="3857"> 🌏 구글지도 (EPSG:3857)</option>
                <option value="5180">🌏 TM서부원점 (EPSG:5180)</option>
                <option value="5181">🌏 TM중부원점 (EPSG:5181)</option>
                <option value="5182">🌏 TM제주원점 (EPSG:5182)</option>
                <option value="5183">🌏 TM동부원점 (EPSG:5183)</option>
                <option value="5179">🌏 UTM-K (EPSG:5179)</option>
              </select>
              좌표계로 변환해줍니다&nbsp;✨
              <br />
              <p>컬럼명을 addr 로 설정후 csv 파일로 올려주세요</p>
            </div>
          </div>
          <CSVReader
            className="reader"
            cssClass="react-csv-input"
            onFileLoaded={handleForce}
            parserOptions={papaparseOptions}
            inputStyle={{ width: "180px" }}
          />
          {progress ? (
            <div>
              <span className="material-icons progress">loop</span>
              <div>{percent}%</div>
            </div>
          ) : (
            ""
          )}
          {down ? (
            <CSVLink
              data={data}
              headers={headers}
              separator={","}
              filename={"geocoding.csv"}
              className="download"
            >
              <div className="download">
                <p>Download</p>
                <span className="material-icons">file_download</span>
              </div>
            </CSVLink>
          ) : (
            ""
          )}
          <p className="footer">
            &copy; {new Date().getFullYear()}. ethanlee. all rights reserved.
            <br />
            if you have any questions, please let me know! <br />
            <a
              href="https://github.com/seungwoonlee90"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-icons footer-icon">home</span>
            </a>
            <a href="mailto:superman@test.com">
              <span className="material-icons footer-icon">email</span>
            </a>
          </p>
        </div>
        <ins
          className="kakao_ad_area"
          style={{ display: "none" }}
          data-ad-unit="DAN-rgk7dxo2C6UptXbe"
          data-ad-width="160"
          data-ad-height="600"
        ></ins>
        <script
          type="text/javascript"
          src="//t1.daumcdn.net/kas/static/ba.min.js"
          async
        ></script>
      </div>
      <Coupang />
    </>
  );
}

export default App;
