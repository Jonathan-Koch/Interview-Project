// AjaxComponent.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AjaxComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://arthurfrost.qflo.co.za/php/getTimeline.php')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="container">
      {data ? (
        data.Timeline.map((item, index) => ( index < 10 &&
          <div key={index} className="card mb-3">
            {item.Image && <img src={'https://arthurfrost.qflo.co.za/' + item.Image} alt={item.Title} className="card-img-top img-fluid rounded"></img>}
            <div className="card-body">
              <h5 className="card-title">{item.Title}</h5>
              <p className="card-text"><small className="text-muted">{item.CreateDate}</small></p>
              <div className="card-text" dangerouslySetInnerHTML={{ __html: item.Description }} />
              { index < 10 && item.Audio && 
              <div className="d-flex align-items-center">
                <h6 className="mb-0" style={{marginRight: "20px"}}>Listen</h6>
                <audio controls>
                    <source src={'https://arthurfrost.qflo.co.za/' + item.Audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
              </div>
              }
              {item.Category && <span className="badge badge-pill badge-light text-dark">{item.Category}</span>}
            </div>
          </div>
        ))
      ) : null}
      <footer className="text-center mt-5">
        Created by Johnny Koch on 14 November 2023.
      </footer>
      {!data && <p className="text-center">Loading...</p>}
    </div>
  );
};

export default AjaxComponent;
