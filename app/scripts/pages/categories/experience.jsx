import React from 'react'
import SnowFlakes from './SnowFlakes.jsx'
import jobs from '../../data/jobs'

export default class Experience extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      active: 0,
      total: jobs.length
    }
  }

  arrowClick (type) {
    if (type === 'next' && this.state.active < this.state.total) {
      var cur = `.card.job${this.state.active}`
      $(cur).addClass('fly-out')
      for (var j = 0;  j < jobs.length - this.state.active; j++) {
        var now = $(`.card.job${this.state.active + j}`)
        now.css({
          zIndex: +now.css("z-index") + 1,
          transform: `scale(${1-(j-1)*0.03}) translate3d(0, -${(j-1)*25}px, 0)`
        })
      }
      this.setState({
        active: this.state.active + 1
      })
    // } else if (type === 'prev' && this.state.active > -1) {
    //   var cur = `.card.job${this.state.active - 1}`
    //   $(cur).removeClass('fly-out')
    //   for (var j = 0;  j < jobs.length - this.state.active; j++) {
    //     var now = $(`.card.job${this.state.active + j}`)
    //     now.css({
    //       zIndex: +now.css("z-index") - 1,
    //       transform: `scale(${1-(j)*0.03}) translate3d(0, -${(j)*25}px, 0)`
    //     })
    //   }
    //   this.setState({
    //     active: this.state.active - 1
    //   })
    }
  }

  getInitialLocation (i) {
    return {
      zIndex: jobs.length - i,
      transform: `scale(${1-i*0.03}) translate3d(0, -${i*25}px, 0)`
    }
  }

  reset () {
    jobs.map((jobs, i) => {
      var cur = `.card.job${i}`
      $(cur).removeClass('fly-out')
      $(cur).css(this.getInitialLocation(i))
    })
    this.setState({
      active: 0
    })
  }

  render() {
    return (
      <div className="experience-container" id="experience">
        { jobs.map((job, i) => {
          const style = this.getInitialLocation(i)
          return (
            <div key={i} className={'card job' + i} style={style}>
              <div className='card-header'>
                <i className="card-btn btn-close"></i>
                <i className="card-btn btn-minimize"></i>
                <i className="card-btn btn-open"></i>
              </div>
              <div className='card-body'>
                <h2>{job.role}</h2>
                <h3>{job.company}</h3>
                <h3>{job.location} | {job.dates}</h3>
                <div className='card-footer next' onClick={this.arrowClick.bind(this, 'next')}>
                  <h4>Next</h4>
                </div>
              </div>
            </div>
          )
        })
        }
        <div className='hidden-message'>
          <p>Like what you see?</p>
          <p>Shoot me an email at zlwaterfield@gmail.com</p>
        </div>
        <SnowFlakes />
        <button className='reset' onClick={this.reset.bind(this)}>Reset</button>
      </div>
    )
  }
}

                  // <span className='arrow next' onClick={this.arrowClick.bind(this, 'next')}></span>
