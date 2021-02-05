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
  handlePageChange = value => {
    this.setState({ 
        data: {
          ...this.state.data,
          currentPage: Number.parseInt(value) 
        }
     })
  }
  goToPage = () => {
    this.setState({ isLoading: true })
    news.setCurrentPage(this.state.data.currentPage)
      .then(data => {
        this.setState({ data, isLoading: false })
      })
      .catch(e => {
        console.log(e);
        alert('Something went wrong')
        this.setState({ isLoading: false })
      })

  }

  changeCategory = (category) => {
    this.setState({ isLoading : true })
    news.changeCategory(category) 
      .then(data => {
        this.setState({data, isLoading: false})
      })
      .catch(e => {
        console.log(e);
        alert('Something went wrong')
        this.setState({ isLoading: false })
      })
  }
  search = (searchTerm) => {
    this.setState({ isLoading: true })
    news.search(searchTerm)
      .then(data => {
        this.setState({ data, isLoading: false })
      })
      .catch(e => {
        console.log(e);
        alert('Something went wrong')
        this.setState({ isLoading: false })
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
            <Header
              category={category}
              changeCategory={this.changeCategory}
              search={this.search}
            /> 
            <div className="d-flex">
              <p className='text-black-50'>
                About {totalResults} result found
              </p>
              <p className='text-black-50 ml-auto'>
                {currentPage} page of {totalPage}
              </p>
            </div>
            {this.state.isLoading ? (
              <Loading />
            ): (
                <div>
                  <NewsList news={article} />
                  <Pagination
                    next={this.next}
                    prev={this.prev}
                    isPrev={isPrev}
                    isNext={isNext}
                    totalPage={totalPage}
                    currentPage={currentPage}
                    handlePageChange={this.handlePageChange}
                    goToPage={this.goToPage}
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