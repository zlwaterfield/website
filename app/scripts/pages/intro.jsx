import React from 'react';

export default class Intro extends React.Component {

  componentDidMount () {
    setTimeout(() => {
      $('.intro-message-top').addClass('animated fadeIn');
    }, 400)
    setTimeout(() => {
      $('.social-buttons').addClass('animated fadeInUp');
    }, 400)
    setTimeout(() => {
      $('.category-box-row').addClass('animated fadeInUp');
    }, 400)
  }

  chooseCategory(category) {
    this.props.chooseCategory(category)
  }

  render() {
    return (
      <div className={"col-4 intro-message fixed" + (this.props.category ? " show-box" : " hide-box")}>
        { this.props.category ?
          <div className='exit-box' onClick={this.chooseCategory.bind(this, null)}>
            <i className="fa fa-times fa-fw fa-3x"></i>
          </div>
        : null }
        <div className="overlay"></div>
        <div className="intro-message-top">
          <div className="logo-container">
            <img className="logo-item" src="images/portrait.png" />
          </div>
          <div className="title">
            <h1>Zach Waterfield</h1>
            <h2>Full Stack Developer | Universe</h2>
            <h2>Computer Engineering | University of Waterloo</h2>
          </div>
        </div>
        <div className="social-buttons">
          <a href="https://github.com/zlwaterfield" target="_blank" className="buttonIntro"><i className="fa fa-github fa-fw"></i></a>
          <a href="https://www.flickr.com/photos/zachwaterfield/" target="_blank" className="buttonIntro"><i className="fa fa-flickr fa-fw"></i></a>
          <a href="http://www.linkedin.com/in/zlwaterfield" target="_blank" className="buttonIntro"><i className="fa fa-linkedin fa-fw"></i></a>
          <a href="https://medium.com/@zlwaterfield" target="_blank" className="buttonIntro"><i className="fa fa-medium fa-fw"></i></a>
          <div className="resume">
            <a href="resume.pdf" target="_blank" className="resumeButton" ng-click="mixpanel('Resume')"><i className="fa fa-list fa-fw"></i> Resume</a>
          </div>
        </div>
        <div className='row category-box-row'>
          <div className='shake-slow shake category-box' onClick={this.chooseCategory.bind(this, 'Experience')}>
            Experience<br />
            <i className="fa fa-building-o fa-fw fa-3x"></i>
          </div>
          <div className='shake-slow shake category-box' onClick={this.chooseCategory.bind(this, 'Projects')}>
            Projects<br />
            <i className="fa fa-code fa-fw fa-3x"></i>
          </div>
          <div className='shake-slow shake category-box' onClick={this.chooseCategory.bind(this, 'Interests')}>
            Interests<br />
            <i className="fa fa-snowflake-o fa-fw fa-3x"></i>
          </div>
        </div>
      </div>
    );
  }
}

