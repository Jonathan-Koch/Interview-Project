import React, { useState, useEffect, useRef } from 'react';    
import 'bootstrap/dist/css/bootstrap.min.css';  
import Button from 'react-bootstrap/Button';              
import LoadingIndicator from './LoadingIndicator'

const ITEMS_PER_PAGE = 10;  

const AjaxComponent = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const cacheRef = useRef(Object.create(null));

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true)
      if (cacheRef.current[page]) {
        console.log('Data retrieved from cache:', cacheRef[page]);
        setData(cacheRef.current[page]);
        setLoading(false);
      } else {
        try {
          console.log('Making API request...');
          const response = await fetch(`https://arthurfrost.qflo.co.za/php/getTimeline.php`);
          const newData =  await response.json();

          const updatedData = (!data || page === 1) ? newData.Timeline : [...data, ...newData.Timeline];
  
          setData(updatedData);
          cacheRef.current[page] = updatedData;
          console.log('Data cached:', updatedData);
          setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            console.log("API request failed")
          } finally {
          setLoading(false);
        }
      }
    };
  
    fetchData();
    
  }, [page, data]);
      
  useEffect(() => {
    if(data) {
      cacheRef.current[page] = data;
    }
  },  [data, page])

  const handleNext = () => {
    setPage(prevPage => {
      const nextPage = prevPage + 1;
      if (cacheRef.current[nextPage]) {
        setData(cacheRef.current[nextPage])
      }
      return nextPage
    })
  };

  const handlePrev = () => {
    setPage(prevPage => {
      const nextPage = prevPage > 1 ? prevPage - 1 : prevPage;
      if (cacheRef.current[nextPage]) {
        setData(cacheRef.current[nextPage]);
      } else {
        setData(null);
      }
      return nextPage;
    });
  }

  if (loading) {
    return <LoadingIndicator />
  } 

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;


  return (
    <div className="container">
      {data && data.length > 0 ? (
        data.slice(start, end).map((item, index) => (
          <div key={index} className="card mb-3">
            {item.Image && <img src={'https://arthurfrost.qflo.co.za/' + item.Image} alt={item.Title} className="img-thumbnail card-img-top img-fluid rounded"></img>}            
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
                      width="560" height="315" src={"https://www.youtube.com/embed/" + item.RemoteId} title="YouTube video player" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" >
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
      {!data && <LoadingIndicator />}
      <div style={{display: "flex", justifyContent: "center"}}>
        <Button onClick={handlePrev}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default AjaxComponent;
