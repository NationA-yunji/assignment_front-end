import React, { useEffect, useState } from 'react';
import './App.css';

const ROOT = process.env.REACT_APP_ROOT;

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 서버 측 API 엔드포인트로 요청 보내기
    fetch(`${ROOT}/api/getData`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Music List 🎧
        </p>
      </header>
      <ul>
        {data.map((item) => (
          <li key={item.Artist}>{item.Artist} - {item.SongTitle}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
