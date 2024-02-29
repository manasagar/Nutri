import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/photoinfo.css';

export const PhotoInfo = () => {
  const [file, setFile] = useState('');
  const [error,setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('file', file);
    console.log(data);
    try {
      const response = await axios.post("/api/upload/", data);
      console.log(response.data);
    } catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <div>
      <form encType='multipart/form-data' onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="file">Upload File:</label>
          <input
            className="form-control-file"
            type="file"
            id="file"
            accept=".jpg"
            onChange={handleFileChange}
          />
          <button
            type="submit"
            className="btn"
          >
            Upload
          </button>
          {error && <Error />}
        </div>
      </form>
    </div>
  );
}

