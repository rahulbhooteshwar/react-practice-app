import React, { Component } from "react";
import CatImage from './cat.png';
class Cat extends Component {
  render() {
    const style = {
      position: "absolute",
      top: this.props.mouse.y,
      left: this.props.mouse.x
    }
    return (
      <div style={style}>
        <img src={CatImage} alt="cat" height="200" width="200"/>
      </div>
    )
  }
}

export default Cat;