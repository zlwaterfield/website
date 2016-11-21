import React from 'react';
import Intro from './intro.jsx';
import Interests from './categories/interests.jsx';

export default class Slider extends React.Component {

  render() {
    if (this.props.category === 'Interests') {
      return (
        <div className={"slider" + (this.props.category ? " show-box" : " hide-box")}>
          <Interests />
        </div>
      );
    } else if (this.props.category) {
      return (
        <div className={"slider" + (this.props.category ? " show-box" : " hide-box")}>
          <h2>{this.props.category} is</h2>
          <h1>UNDER CONSTRUCTION</h1>
        </div>
      );
    } else {
      return (
        <div className={"slider" + (this.props.category ? " show-box" : " hide-box")}></div>
      );
    }
  }
}
