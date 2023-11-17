import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const ITEMS_PER_PAGE = 10;

const AjaxComponent = () => {
  const [data, setData] = useState(null);               // declares a state variable called data, and a function to update it, called setData. The initial value of data is null.
  const [page, setPage] = useState(1);                  //declares a state variable called page, and a function to update it, called setPage. The initial value of page is 1
  const [loading, setLoading] = useState(false);       // declares a state variable called loading, and a function to update it, called setLoading. The initial value of loading is false.

  useEffect(() => {
    setLoading(true);                                   // show some sort of loading indicator on the UI.
    fetch(`https://arthurfrost.qflo.co.za/php/getTimeline.php`)
      .then(response => response.json())                //returns the response body
      .then(newData => {                               // receives the newData (the result of the previous promise) as its argument. Inside this promise, the setData function is called to update the data state.
        setData(prevData => {                         //This line updates the data state. If prevData is null or page is 1, it sets data to newData.Timeline. Otherwise, it appends newData.Timeline to the existing data.
          if (!prevData || page === 1) {
            return newData.Timeline;
          } else {
            return [...newData.Timeline];
          }
        });
        setLoading(false);                            //loading is set to false to indicate that the loading has finished.
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [page]);                                        //useEffect hook will run whenever page changes.

  const handleNext = () => {
    setData(null);
    setPage(prevPage => prevPage + 1);
  };

  const handlePrev = () => {
    setData(null);
    setPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage);
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const start = (page - 1) * ITEMS_PER_PAGE;         // added the start and end variables to calculate the start and end indices for the slice based on the current page number
  const end = start + ITEMS_PER_PAGE;

  return (
    <div className="container">
      {data && data.length > 0 ? (                  //data: This checks if data is not null, undefined, or any other falsy value. data.length > 0: This checks if the length of data is greater than 0, i.e., if data is not an empty array.
        data.slice(start, end).map((item, index) => ( // in render method, replaced data.slice(0, page * ITEMS_PER_PAGE) with data.slice(start, end). This will ensure that only the items for the current page are displayed.  
          <div key={index} className="card mb-3">
            {item.Image && <img src={'https://arthurfrost.qflo.co.za/' + item.Image} alt={item.Title} className="card-img-top img-fluid rounded"></img>}            
            <div className="card-body">
              <h5 className="card-title">{item.Title}</h5>
              <p className="card-text"><small className="text-muted">{item.CreateDate}</small></p>
              <div className="card-text" dangerouslySetInnerHTML={{ __html: item.Description }} />
              {item.Audio && 
              <>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <h6 className="mb-0" style={{marginRight: "20px"}}>Listen</h6>
                    <audio controls>
                        <source src={'https://arthurfrost.qflo.co.za/' + item.Audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                  </div>
                  <div>
                    <iframe 
                      width="560" 
                      height="315" 
                      src={"https://www.youtube.com/embed/" + item.RemoteId}
                      title="YouTube video player" 
                      frameborder="0" 
                      allow="accelerometer; 
                      autoplay; 
                      clipboard-write; 
                      encrypted-media; 
                      gyroscope; 
                      picture-in-picture; 
                      web-share" allowFullscreen>
                    </iframe>
                  </div>
                </div>
            </>            
              }
              {item.Category && <span className="badge badge-pill badge-light text-dark">{item.Category}</span>}
            </div>
          </div>
        ))
      ) : null }

      <footer className="text-center mt-5">
        Created by Johnny Koch on 14 November 2023.
      </footer>
      {!data && <p className="text-center">Loading...</p>}
      <div style={{display: "flex", justifyContent: "center"}}>
        <Button onClick={handlePrev}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default AjaxComponent;
