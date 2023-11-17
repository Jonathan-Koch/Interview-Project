import React from "react";

const Button = ({onClick, children}) => (
    <button onClick={onClick}>
        {children}
    </button>
);

export default Button;


// It seems like you’re trying to implement pagination in your React component. The handleNext and handlePrev functions are designed to update the page state variable, which should trigger a re-render of your component with the new page data.

//However, if the buttons are not working as expected, it could be due to one of the following reasons:

//The server does not support pagination through a page query parameter in the URL.
//The server is not returning new data when the page number changes.
//There’s an error in the handleNext or handlePrev functions.
//To debug this, you can add a console.log statement in your useEffect hook to log the current page number and the data received from the server:
//Page loads and not error on buttons but not going to next page.
//Buttons are center but not moving to next page (Page Pagination?)




  
  

  