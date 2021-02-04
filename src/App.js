import React, { Component } from 'react';
import Header from './components/header';
import Loading from './components/loading';
import NewsList from './components/newsList';
import Pagination from './components/pagination';
import { newsCategory } from './news';

const fakeNews = [
  {
    title: 'Title',
    content: 'Content',
    url: 'https://url.com',
    urlToImage: 'https://url.com',
    publishedAt: '4-02-2021',
    source: {
      name: 'CNN'
    }
  },
  {
    title: 'Title',
    content: 'Content',
    url: 'https://url.com',
    urlToImage: 'https://url.com',
    publishedAt: '4-02-2021',
    source: {
      name: 'CNN'
    }
  }
]
class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className='col-sm-6 offset-md-3'>
            <Header category={newsCategory.business} /> 
            <div className="d-flex">
              <p className='text-black-50'>
                About {0} result found
              </p>
              <p className='text-black-50 ml-auto'>
                {1} page of {100}
              </p>
            </div>
            <NewsList news={fakeNews} />
            <Pagination />
            <Loading />
          </div>
        </div>
      </div>
    );
  }
}

export default App;