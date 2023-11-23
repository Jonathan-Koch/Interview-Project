import React, { useState, useEffect, useRef } from 'react';

import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';  
import Button from 'react-bootstrap/Button';              
import LoadingIndicator from '../components/LoadingIndicator'
import BurgerMenu from '../components/burgerMenu';
import Footer from '../components/footer';


  

const AjaxComponent = () => {
  const [data, setData] = useState(null);
  const [displayData, setDisplayData] = useState([]);
  const [page, setPage] = useState(1)
  const tilesPerPage = 2;


  useEffect(() => {
    const fetchData = async () => {
        try {
          console.log('Making API request...');
          const response = await fetch(`https://arthurfrost.qflo.co.za/php/getTimeline.php`);
          if (!response.ok) {
            throw new Error("API request failed");
          }
          const result =  await response.json();
          console.log(result)  
          setData(result.Timeline);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

    fetchData();  
  }, []);

 useEffect(() => {
  if(data){
  const startIndex = (page - 1) * tilesPerPage;
  const endIndex = startIndex + tilesPerPage;
  const dataToDisplay = data.slice(startIndex, endIndex)
  setDisplayData(dataToDisplay)
}
 }, [data, page]);

    const handleNextPage = () => {
      setPage(prevPage => prevPage + 1)
    }

    const handlePrevPage = () => {
      setPage(prevPage => (prevPage > 1 ? prevPage - 1: 1))
    } 
  
  return (
    <div className="container">
      { displayData.length > 0 ? (
        displayData.map((item, index) => (
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

      <footer class="text-center mt-5 bg-light">
        <Footer />
      </footer>
      {!data && <LoadingIndicator />}
      <div style={{display: "flex", justifyContent: "center"}}>
        <Button onClick={handlePrevPage} >Previous</Button>
        <Button onClick={handleNextPage} >Next</Button>
      </div>
    </div>
  );
};


export default AjaxComponent;