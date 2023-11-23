import React, { useState, useEffect, useRef } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';  

import BurgerMenu from '../components/burgerMenu';
import Footer from '../components/footer';
import LoadingIndicator from '../components/LoadingIndicator';

const AboutComponent = () => {
  const [data, setData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

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
          setData(result.Body);
          setBackgroundImage(`https://arthurfrost.qflo.co.za/${result.Body[0].Background}`);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

    fetchData();  
  }, []);

  if (!data) {
    return <LoadingIndicator />
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ 
      backgroundImage: `url('${backgroundImage}')`,
      backgroundSize: 'cover',
      height: "100vh"
    }}>
      <div style={{ width: '80%', margin: '0 auto' }}>
        { data.length > 0 ? (
          data.map((item, index) => {
            let aboutHTML = item.About;
            aboutHTML = aboutHTML.replace(/<img[^>]*>/g, "");
            const parser = new DOMParser();
            const doc = parser.parseFromString(aboutHTML, 'text/html');
            const imgElements = doc.querySelectorAll('img');
            let imgSrc = "https://fathersheart.co.za/wp-content/uploads/2020/05/CAP7154-2.jpg";
            if (imgElements.length > 0) {
              imgSrc = imgElements[0].getAttribute("src")
            }

            return (
              <div key={index} className="card mb-3 text-center" style={{ 
                width: '500px',
                height: '60%',
                margin: '0 auto' 
              }}>
                <img src={imgSrc} className="img-fluid mx-auto d-block" style={{ 
                  maxWidth: '350px',
                  height: '100%' ,
                  paddingTop: '12px',
                  borderRadius: '9px'
                }}/>
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: '0.8rem' }}>{item.Title}</h5>
                  <p className="card-text"><small className="text-muted">{item.CreateDate}</small></p>

                  <div className="card-text" dangerouslySetInnerHTML={{ __html: aboutHTML }} />
                </div>
              </div>
            );
          })
        ) : null }
      </div>
    </div>
  );  
      <footer class="text-center mt-5 bg-light">
        <Footer />
      </footer>
};

export default AboutComponent;
