import React from 'react';
import { Link } from 'react-router'

const NotFound = (props) => {
  return (
      <div className='error_404'>
        <div className='error_container'>
          <img src='images/sloth.png'/>
          <div className='error_bubble'>
            <div>
              404 page not found ...
            </div>
            <br/>
            <Link to='/' className='btn-contact'>Take me home!</Link>
          </div>
        </div>
      </div>
  );
}

export default NotFound;
