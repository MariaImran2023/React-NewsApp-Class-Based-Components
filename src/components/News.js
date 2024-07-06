import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    mode: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired
  }

  cap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.cap(this.props.category)} - News Monkey`;
  }

  async componentDidMount() {
    this.updateNews(); 
  }

  updateNews = async () => {
    this.props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b46b5bb1c7f0473f905715a4208bc037&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });
    try {
      let data = await fetch(url);
      this.props.setProgress(30);
      let parsedData = await data.json();
      this.props.setProgress(50);
      console.log(parsedData)

      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false
      });

      this.props.setProgress(100);
    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({ loading: false });
      this.props.setProgress(100);
    }
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 },
    async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b46b5bb1c7f0473f905715a4208bc037&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults
      });
      
    });
  };

  render() {
    const { mode } = this.props;

    return (
      <div className='ss pb-3' style={{ backgroundColor: mode === 'light' ? 'white' : 'black', color: mode === 'light' ? 'black' : 'white' }}>
        <div className='container mt-0 mb-3 pt-2'>
          <h1 className='h1c pt-3 pb-1 text-center'>News Monkey - Top Headlines</h1>
          <h2 className='h1c pb-3 text-center'>{this.cap(this.props.category)}</h2>

          {this.state.loading && <Spinner />} {/* Display spinner when loading is true */}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length < this.state.totalResults}
            loader={<Spinner />}>
            <div className="container">
              <div className="row">
                {this.state.articles.map((element, index) => (
                  <div className="col-md-4 mb-3 d-flex justify-content-center" key={index}>
                    <Newsitem title={element.title ? element.title.slice(0, 71) : ''} description={element.description ? element.description.slice(0, 72) : ''} imageUrl={element.urlToImage} newsUrl={element.url} mode={mode} author={element.author} date={element.publishedAt} source={element.source.name}/>
                  </div>
                ))}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default News;
