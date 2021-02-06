import React, { Component, createRef } from 'react';
import { newsCategory } from '../news/index';
class Header extends Component {
    state = {
        searchTerm: ''
    }
    searchRef = createRef()
    handleChange = e => {
        this.setState({
            searchTerm: e.target.value
        })
    }
    handleKeyPress = e => {
        if(e.key === 'Enter') {
            this.props.search(this.state.searchTerm)
        }
    }
    componentDidMount() {
        this.searchRef.current.focus()
    }
    render() {
        const { category, changeCategory } = this.props
        return (
            <div className='my-4'>
                <h1 className='mb-4' style={{fontWeight: '300'}}>
                    Top News Headlines
                </h1>
                <input
                    ref={this.searchRef}
                    type="search"
                    className='form-control'
                    placeholder='Type anything & press enter to search'
                    value={this.state.searchTerm}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                />
                <div className='my-4'>
                    { newsCategory && 
                        Object.keys(newsCategory).map((item) => {
                            if(category === newsCategory[item]) {
                                return (
                                    <button className='btn btn-sm btn-warning mr-2 mb-2'
                                        onClick={() => changeCategory(newsCategory[item])}
                                    >
                                        { `#${newsCategory[item]}` }
                                    </button>
                                )
                            }
                            return (
                                <button className='btn btn-sm btn-light mr-2 mb-2'
                                    onClick={() => changeCategory(newsCategory[item])}
                                >
                                    { `#${newsCategory[item]}` }
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Header;