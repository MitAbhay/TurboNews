import React, { Component } from "react";
import "../styles/card.css";

export default class NewsItem extends Component {
  render() {
    let { item, description, imageurl, url, time, source } = this.props;

    return (
      <div className="col-xs-12 col-sm-4">
        <span className="badge bg-danger">{source}</span>
        <div className="card">
          <img height="300" width="413" src={imageurl} alt="news_pic" />
          <div className="card-content">
            <h4 className="card-title">{item}</h4>
            <p className="card-text text-center h5">
              {new Date(time).toGMTString()}
            </p>
            <p className="">{`${description.substring(0, 70)}...`}</p>
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
