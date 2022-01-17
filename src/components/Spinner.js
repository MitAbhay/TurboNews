import React, { Component } from "react";
import snipper from "../assets/1488.gif";

export default class Spinner extends Component {
  render() {
    return (
      <div className="">
        <img src={snipper} alt="loader"></img>
      </div>
    );
  }
}
