import React, { Component } from "react";
import "../styles/card.css";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageurl, url, time, source } = this.props;

    return (
      <div className="col-xs-12 col-sm-4">
        <span className="badge bg-danger">{source}</span>
        <div className="card" style={{backgroundColor: 'black'}}>
          <img style={{height:"15rem" , width:"26rem"}} className="img-fluid img-thumbnail" src={imageurl} alt="news_pic" />
          <div className="card-content">
            <p className="card-text text-center h5" style={{color: "#F26A4E"}}>
              {new Date(time).toGMTString()}
            </p>
            <h4 className="card-title">{title?title.substring(0,89):"TurboNews"}...</h4>
            <p className="">{`${description ? description.substring(0, 70) : 'You can read the full news on the official website by clicking the link below'}...`}</p>
          </div>
          <div className="card-read-more">
            <a href={url} className="btn btn-link btn-block">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
