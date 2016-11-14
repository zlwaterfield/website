import React from 'react';
import { Link } from 'react-router'

import data from '../data/concerts';

class Concerts extends React.Component {

  componentWillMount () {
    this.getTotal()
  }

  getTotal() {
    let count = 0;
    data.map(function(concert) {
      if (concert.indexOf(' x') > -1) {
        count = count + +concert.substr(concert.indexOf(' x') + 2)
      } else {
        count++
      }
    })
    this.state = {
      total: count
    }
  };

  render() {
    return (
      <div className="concerts">
        <div className="back_button"><Link to='/' className='btn-contact'>Home</Link></div>
        <p className="message">Here is a list of concerts i have attended <br/>(bound to have missed a couple).</p>
        <p className="number">Currently totalling { this.state.total }</p>
        { data.map(function(concert, i) {
            return (
              <div className="concert" key={i}>{ concert }</div>
            )
          })
        }
      </div>
    );
  }
}

export default Concerts;
