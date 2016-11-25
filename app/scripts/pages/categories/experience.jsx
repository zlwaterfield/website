import React from 'react';

var jobs = [1,2]

export default class Experience extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      total: jobs.length
    }
  }

  arrowClick (type) {
    console.log(type, this.state.active)
    var cur = `.card.job${this.state.active}`
    var next = `.card.job${this.state.active + 1}`
    var prev = `.card.job${this.state.active - 1}`
    if (type === 'next' && this.state.active < this.state.total) {
      $(cur).addClass('fly-out');
      $(next).addClass('fly-in');
      this.setState({
        active: this.state.active + 1
      })
    }
  }

  render() {
    return (
      <div className="experience-container" id="experience">
        { jobs.map((job, i) => {
          return (
            <div key={i} className={'card job' + i}>
              <div className='header'>
                <i className="card-btn btn-close"></i>
                <i className="card-btn btn-minimize"></i>
                <i className="card-btn btn-open"></i>
              </div>
              <div className='body'>
                <div className='arrow next' onClick={this.arrowClick.bind(this, 'next')}></div>
              </div>
            </div>
          )
        })

        }
      </div>
    );
  }
}
