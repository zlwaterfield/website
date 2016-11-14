import React from 'react';

class Home extends React.Component {

  componentDidMount () {
    setTimeout(() => {
      $('.intro-message-top').addClass('animated fadeIn');
    }, 400)
    setTimeout(() => {
      $('.social-buttons').addClass('animated fadeInUp');
    }, 400)
  }

  render() {
    return (
      <div className="col-4 intro-message fixed">
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
          <a href="#/concerts" className="buttonIntro"><i className="fa fa-music fa-fw"></i></a>
          <a href="#/countries" className="buttonIntro"><i className="fa fa-map fa-fw"></i></a>
          <a href="https://medium.com/@zlwaterfield" target="_blank" className="buttonIntro"><i className="fa fa-rss fa-fw"></i></a>
          <div className="resume">
            <a href="resume.pdf" target="_blank" className="resumeButton" ng-click="mixpanel('Resume')"><i className="fa fa-list-alt fa-fw"></i> Resume</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

