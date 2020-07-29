import React, { Component } from "react";

class Mouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: undefined,
      y: undefined
    }
  }
  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }
  render() {
    return (
      <div onMouseMove={this.handleMouseMove} style={{ height: '100vh', width: '100vw' }}>
        {this.props.render({ x: this.state.x, y: this.state.y })}
      </div >
    );
  }
}

export default Mouse;