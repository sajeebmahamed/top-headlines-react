import React, { Component } from 'react';
import Header from './components/header';
import { newsCategory } from './news';
class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className='col-sm-6 offset-md-3'>
            <Header category={newsCategory.business} /> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;