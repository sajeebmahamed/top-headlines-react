import axios from 'axios';
import React, { Component } from 'react';
import Header from './components/header';
import Loading from './components/loading';
import NewsList from './components/newsList';
import Pagination from './components/pagination';
import { newsCategory } from './news';
class App extends Component {
  state = {
    news: [],
    category: newsCategory.technology
  }
  changeCategory = (category) => {
    this.setState({ category })
  }
  
  componentDidMount() {
    const url = `${process.env.REACT_APP_NEWS_URL}?apiKey=${process.env.REACT_APP_NEWS_API_KEY}&category=business&pageSize=5`
    axios.get(url)
      .then(res => {
        this.setState({
          news: res.data.articles
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    console.log(this.state.news)
    return (
      <div className="container">
        <div className="row">
          <div className='col-sm-6 offset-md-3'>
            <Header category={this.state.category} changeCategory={this.changeCategory} /> 
            <div className="d-flex">
              <p className='text-black-50'>
                About {0} result found
              </p>
              <p className='text-black-50 ml-auto'>
                {1} page of {100}
              </p>
            </div>
            <NewsList news={this.state.news} />
            <Pagination />
            <Loading />
          </div>
        </div>
      </div>
    );
  }
}

export default App;