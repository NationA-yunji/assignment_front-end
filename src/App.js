import React, { useEffect, useState } from 'react';
import './App.css';

const ROOT_URL = process.env.REACT_APP_ROOT;

function App() {
  const [dynamoData, setDynamoData] = useState([]);
  const [signedUrlData, setSignedUrlData] = useState([]);


  useEffect(() => {
    // 서버 측 API 엔드포인트로 요청 보내기

    // DynamoDB 데이터 요청
    fetch(`${ROOT_URL}/api/get-data`)
      .then((response) => response.json())
      .then((data) => setDynamoData(data))
      .catch((error) => console.error('DynamoDB 데이터를 가져오지 못했습니다.', error));

    // 서명된 url 요청
    fetch(`${ROOT_URL}/api/get-signed-url`) 
    .then(response => response.json())
    .then(data => setSignedUrlData(data))
    .catch(error => {
        console.error('서명된 URL을 가져오지 못했습니다.', error);
    });
  
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Music List 🎧
        </p>
      </header>
      <ul>
        {dynamoData.map((item) => (
          <li key={item.Artist}>{item.Artist} - {item.SongTitle}</li>
        ))}
      </ul>
      {signedUrlData && (
        <div style={{paddingTop: '60px', color: 'lavender', display: 'flex', alignItems: 'center'}}>
          Signed URL: <img style={{width: '60px', height: '60px'}} src={signedUrlData}></img>
        </div>
      )}
    </div>
  );
}

export default App;
