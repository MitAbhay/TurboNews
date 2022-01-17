import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  constructor() {
    super();
    console.log("I am a constructor");

    this.state = {
      articles: [],
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

    console.log(parseddata);
    this.props.setprogress(75);

    this.setState({
      articles: parseddata.articles,
      totalresults: parseddata.totalresults,
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
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h1>TurboNews</h1>
        {/* {this.state.loading && <Spinner />}  */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={
            this.state.articles.length !== this.state.articles.totalResults
          }
          loader={<Spinner />}
        >
          <div>
            <div className="row row-cols-3">
              {this.state.articles.map((element) => {
                return (
                  <div className="col g-2 " key={element.url}>
                    <NewsItem
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
                  </div>
                );
              })}
            </div>
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
