import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  constructor() {
    super();
    // console.log("I am a constructor");

    this.state = {
      Articles: [],
      TotalResults: [],
      loading: true,
      page: 1,
    };
  }

  async componentDidMount() {
    this.props.setprogress(20);

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pagesize=${this.props.pagesize}`;
    let data = await fetch(url);

    this.props.setprogress(50);

    let parseddata = await data.json();

    // console.log(parseddata);
    this.props.setprogress(75);

    this.setState({
      Articles: parseddata.articles,
      TotalResults: parseddata.totalResults,
    });

    this.props.setprogress(100);
  }

  // getprevious = async () => {
  //     this.setState({
  //         loading: true
  //     })
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=88dfb75d66df4af1aad438eff4e3ef19&page=1&pagesize=${this.props.pagesize}&page=${this.state.page - 1}`;

  //     let data = await fetch(url);

  //     let parseddata = await data.json();

  //     console.log(parseddata);

  //     this.setState({
  //         articles: parseddata.articles,
  //         page: this.state.page - 1,
  //         loading: false
  //     })

  // }

  // getnext = async () => {
  //     if (this.state.page > Math.ceil(this.state.totalresults / this.props.pagesize)) {

  //     }
  //     else {
  //         this.setState({
  //             loading: true
  //         })
  //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=88dfb75d66df4af1aad438eff4e3ef19&pagesize=${this.props.pagesize}&page=${this.state.page + 1}`;
  //         let data = await fetch(url);

  //         let parseddata = await data.json();

  //         console.log(parseddata);

  //         this.setState({
  //             articles: parseddata.articles,
  //             page: this.state.page + 1,
  //             loading: false
  //         })
  //     }
  // }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      Articles: this.state.Articles.concat(parsedData.articles),
      TotalResults: parsedData.totalResults,
    });
    console.log(this.state.TotalResults);
    console.log(this.state.Articles);
  };

  render() {
    return (
      <>
        <h1 className="display-4 text-white" style={{ paddingTop: "72px" }}>
          TurboNews
        </h1>
        {/* {this.state.loading && <Spinner />}  */}
        <InfiniteScroll
          dataLength={this.state.Articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.Articles.length !== this.state.TotalResults}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: "center" , color: "white" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div>
            <section className="wrapper">
              <div className="container-fostrap">
                <div className="content">
                  <div className="container">
                    <div className="row">
                      {this.state.Articles.map((element) => {
                        return (
                          <NewsItem
                            key={element.url}
                            source={element.source.name}
                            auther={element.auther}
                            time={element.publishedAt}
                            title={element.title}
                            description={element.description}
                            imageurl={
                              element.urlToImage
                                ? element.urlToImage
                                : "https://images.cointelegraph.com/images/1200_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMDkvNDViODE0MmEtZDlkYi00OGY1LWI1N2UtMmRjYzRmNDM3OTBhLmpwZw==.jpg"
                            }
                            url={element.url}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} onClick={this.getprevious} type="button" className="btn btn-dark">Previous</button>
                    <button disabled={this.state.page > Math.ceil(this.state.totalresults / this.props.pagesize)} onClick={this.getnext} type="button" className="btn btn-dark">Next</button>
                </div> */}
        </InfiniteScroll>
      </>
    );
  }
}
