import React from 'react';
import { Link } from 'react-router'

import data from '../data/countries';

class Countries extends React.Component {

  componentWillMount () {
    this.getTotal()
  }

  getTotal() {
    let count = 0;
    data.map(function() {
        count++
    })
    this.state = {
      total: count
    }
  };

  render() {
    return (
      <div className="countries">
        <div className="back_button"><Link to='/' className='btn-contact'>Home</Link></div>
        <p className="message">Here is a list of countries i have been to.</p>
        <p className="number">Currently totalling { this.state.total }</p>
        { data.map(function(countries, i) {
            return (
              <div className="country" key={i}>{ countries }</div>
            )
          })
        }
      </div>
    );
  }
}

export default Countries;
