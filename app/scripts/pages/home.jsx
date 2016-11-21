import React from 'react';
import Intro from './intro.jsx';
import Slider from './slider.jsx';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category: null
    }
  }

  chooseCategory(category) {
    this.setState({
      category: category
    })
  }

  render() {
    return (
      <div className="home">
        <Intro chooseCategory={this.chooseCategory.bind(this)} category={this.state.category}/>
        <Slider category={this.state.category} />
      </div>
    );
  }
}

export default Home;

