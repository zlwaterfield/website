import React from 'react';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category: null
    }
  }

  componentDidMount () {
    setTimeout(() => {
      $('.intro-message-top').addClass('animated fadeIn');
    }, 400)
  }

  render() {
    return (
      <div className="col-4 intro-message fixed">
        <div className="intro-message-top">
          <h1>Zach Waterfield</h1>
          <h2>CTO and Co-founder <a href="https://www.padpiper.com" target="_blank">PadPiper</a>.</h2>
          <h4>
            <span>I write down some thoughts <a href="https://medium.com/@zlwaterfield" target="_blank">here</a>. </span>
            <span>I show off some code <a href="https://github.com/zlwaterfield" target="_blank">here</a>. </span>
            <span>I ski, mountain bike, and hike. </span>
            <span>I travel and work remotely (<a href="https://www.hackerparadise.org/" target="_blank">Hacker Paradise</a> alum). </span>
            <span>Previously at <a href="https://universe.com" target="_blank">Universe</a>, <a href="https://farmlogs.com" target="_blank">Farmlogs</a>, and <a href="https://www.jonnyonit.com/" target="_blank">JonnyOnIt</a>. </span>
            <span>Shoot me an <a href="mailto:zlwaterfield@gmail.com">email</a> or <a href="https://www.linkedin.com/in/zlwaterfield/" target="_blank">connect</a> with me </span>
          </h4>
        </div>
      </div>
    );
  }
}

export default Home;
