import React, { useState } from "react";
import "./App.css";
import CSVReader from "react-csv-reader";
import axios from "axios";
import { CSVLink } from "react-csv";

function App() {
  let [progress, prgoressEdit] = useState(false);
  let [down, downEdit] = useState(false);
  let [crs, crsEdit] = useState(4326);
  let [data, dataEdit] = useState([]);

  const handleForce = async (data, fileInfo) => {
    if (fileInfo) {
      prgoressEdit(true);
    }
    let newArray = [];
    for (let i = 0; i < data.length; i++) {
      let address = data[i].addr;
      let Key = "EBB1ED94-DE92-302B-9402-D87472CEFCA1";
      let url = `http://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:${crs}&address=${address}&refine=true&simple=false&format=json&type=road&key=${Key}`;

      await axios.get(url).then((res) => {
        let xcoord = res.data.response.result.point.x;
        let ycoord = res.data.response.result.point.y;
        newArray.push({ address, xcoord, ycoord });
      });
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

  return (
    <div className="App">
      <div className="wrapper">
        <div className="header">
          <h4>도로명주소 좌표 변환기 ver 1.0 📍</h4>
          <div className="desc">
            브이월드(vworld)에서 제공하는 geocoder api를 이용하여 <br />
            도로명주소를
            <select className="options" onChange={handleSelect}>
              <option value="4326"> 🌏 위경도 (EPSG:4326)</option>
              <option value="5181">🌏 TM중부원점 (EPSG:5181)</option>
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
        {progress ? <span className="material-icons progress">loop</span> : ""}
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
              <span class="material-icons">file_download</span>
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
    </div>
  );
}

export default App;
