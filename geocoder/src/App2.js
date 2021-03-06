import React, {useState} from 'react';
import "./App.css";
import axios from "axios";
import CSVReader from "react-csv-reader";
import { CSVLink } from "react-csv";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import CircularProgress from '@mui/material/CircularProgress';
import Kakao from "./Kakao";
import Coupang from "./Coupang";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};

function App() {
    let [progress, prgoressEdit] = useState(false);
    let [down, downEdit] = useState(false);
    let [crs, crsEdit] = useState(4326);
    let [data, dataEdit] = useState([]);
    let [addType, addTypeEdit] = useState("road");
    let [percent, percentEdit] = useState(0);
    let [open, setOpen] = React.useState(false);
    let handleOpen = () => setOpen(true);
    let handleClose = () => setOpen(false);
  
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
          await axios.request({
            url: url,
            method: "GET"
          }).then((res) => {
            res.header("Access-Control-Allow-Origin", "*");
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
        <div className="App">
            <Container maxWidth="sm">
                <h1 style={{"text-align" : "center"}}>?????? ?????? ????????? ver 1.1 ????</h1>
                <div className="main">
                    <div>
                        <button type="button" onClick={handleOpen}>
                            User Guide
                        </button>
                        <StyledModal
                            aria-labelledby="unstyled-modal-title"
                            aria-describedby="unstyled-modal-description"
                            open={open}
                            onClose={handleClose}
                            BackdropComponent={Backdrop}
                        >
                            <Box sx={style}>
                            <h2 id="unstyled-modal-title" style={{"color" : "black"}}>Geocoder User Guide ????</h2>
                            <p id="unstyled-modal-description" style={{"color" : "black", "textAlign" : "left"}}>
                            1. ???????????? addr ??? ?????? ??? CSV UTF-8 ???????????? ??????????????????<br />
                            2. 
                            <a
                            href="https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc"
                            target="_blank"
                            rel="noreferrer"
                            className="google-icon"
                            style={{"color" : "black", "textDecoration": "underline"}}
                            >
                            ?????? ????????????
                            </a>
                            ??? ?????? ??? ON?????? ????????? ?????????????????? <br />
                            3. ??????????????? ?????? CSV ????????? ??????????????? <br />
                            </p>
                            <Coupang />
                            </Box>
                        </StyledModal>
                    </div>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">??????</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addType}
                            label="road"
                            onChange={addrSelect}
                        >
                            <MenuItem value="road">???? ???????????????</MenuItem>
                            <MenuItem value="parcel">???? ????????????</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth className='crs_form'>
                        <InputLabel id="demo-simple-select-label">?????????</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={crs}
                            label="crs"
                            onChange={handleSelect}
                        >
                            <MenuItem value="4326">???? ????????? (EPSG:4326)</MenuItem>
                            <MenuItem value="3857">???? ???????????? (EPSG:3857)</MenuItem>
                            <MenuItem value="5180">???? TM???????????? (EPSG:5180)</MenuItem>
                            <MenuItem value="5181">???? TM???????????? (EPSG:5181)</MenuItem>
                            <MenuItem value="5182">???? TM???????????? (EPSG:5182)</MenuItem>
                            <MenuItem value="5183">???? TM???????????? (EPSG:5183)</MenuItem>
                            <MenuItem value="5179">???? UTM-K (EPSG:5179)</MenuItem>
                        </Select>
                    </FormControl>
                    <CSVReader
                        className="reader"
                        cssClass="react-csv-input"
                        onFileLoaded={handleForce}
                        parserOptions={papaparseOptions}
                    />
          {progress ? (
            <div>
              <Box sx={{ display: 'flex' }}>
                <CircularProgress color="inherit" />
              </Box>
              <div>{percent}%</div>
            </div>
          ) : (
            ""
          )}
          {down ? (

          <div>
            <button type="button" onClick={handleOpen}>
                Download
            </button>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                  <h2 id="unstyled-modal-title" style={{"color" : "black"}}>Download ???</h2>
                  <CSVLink
                          data={data}
                          headers={headers}
                          separator={","}
                          filename={"geocoding.csv"}
                          className="download"
                        >
                          <div className="download">
                            <p style={{"color" : "black"}}>Download</p>
                            <span className="material-icons" style={{"color" : "black"}}>file_download</span>
                          </div>
                  </CSVLink>
                  <Coupang />
                </Box>
            </StyledModal>
          </div>
            
          ) : (
            ""
          )}
                <Grid container>
                    <Grid item xs={8}>
                        <Link href="https://github.com/seungwoonlee90" variant="body2">
                            <span className="material-icons google-icon">home</span>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="mailto:seungwoonlee90@gmail.com" variant="body2">
                            <span className="material-icons google-icon">email</span>
                        </Link>
                    </Grid>
                </Grid>
                </div>
                <div className="footer">
                    <h4>
                        &copy; {new Date().getFullYear()}. ethanlee. all rights reserved.
                    </h4>
                    <Kakao />
                </div>
            </Container>
        </div>
    )
}

export default App;