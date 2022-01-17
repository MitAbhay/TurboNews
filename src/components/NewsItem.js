import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { item, description, imageurl, url, auther, time, source } = this.props;

    return (
      <div>
        <div className="g-3">
          <div className="col">
            <span class="badge bg-danger">{source}</span>
            <div className="card">
              <img
                height="300"
                src={imageurl}
                className="card-img-top"
                alt="news_pic"
              />
              <div className="card-body h-75" style={{ height: "183px" }}>
                <h5 className="card-title">{item}</h5>
                <p className="card-text">({description}.length) > 10 ?  </p>
                <p className="card-text">
                  By {!auther ? "unknown" : auther} on{" "}
                  {new Date(time).toGMTString()}
                </p>
                <a class="btn btn-primary" href={url} role="button">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
