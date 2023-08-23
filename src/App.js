import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GCS JSON Viewer</h1>
        <div>
          <input
            type="text"
            placeholder="Enter GCS URI"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={fetchData}>Fetch JSON</button>
        </div>
        {error && <div className="error">{error}</div>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </header>
    </div>
  );
}

export default App;
