import React, { Component } from 'react';
import Header from './components/header';
import Loading from './components/loading';
import NewsList from './components/newsList';
import Pagination from './components/pagination';
import News, { newsCategory } from './news';

const news =  new News(newsCategory.technology) 
class App extends Component {
  state = {
    data: {},
    isLoading: true
  }
  componentDidMount() {
     news.getNews()
      .then(data => {
        this.setState({ data, isLoading: false })
      })
      .catch(e => {
        console.log(e);
        alert('Something went wrong')
        this.setState({ isLoading: false })
      })
  }
  next = () => {
    if(this.state.data.isNext) {
      this.setState({ isLoading: true })
    }
    news.next()
      .then(data => {
        this.setState({ data, isLoading: false })
      })
      .catch(e => {
        console.log(e);
        alert('Something went wrong')
      })
  }
  prev = () => {
    if (this.state.data.isPrev) {
      this.setState({ isLoading: true })
    }
    news.prev() 
      .then(data => {
        this.setState({ data, isLoading: false })
      })
      .catch(e => {
        console.log(e);
        alert('Something went wrong')
      })
  }

  render() {
    const {
      article,
      isPrev,
      isNext,
      category,
      totalResults,
      totalPage,
      currentPage
     } = this.state.data
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
            {this.state.isLoading ? (
              <Loading />
            ): (
                <div>
                  <NewsList news={this.state.data.article} />
                  <Pagination
                    next={this.next}
                    prev={this.prev}
                    isPrev={isPrev}
                    isNext={isNext}
                    totalPage={totalPage}
                    currentPage={currentPage}
                  />
                </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;