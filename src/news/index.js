import axios from '../utils/axios';
export const newsCategory = {
    technology: 'technology',
    science: 'science',
    business: 'business',
    entertainment: 'entertainment',
    general: 'general',
    health: 'health',
    sports: 'sports'
}
const MAX_ITEM_PER_PAGE = 10;

export default class News {
    constructor(category) {
        this._category = category
        this._searchItem = ''
        this._pageSize = MAX_ITEM_PER_PAGE
        this._currentPage = 1
        this._totalPage = 1
    }
    async getNews() {
        try {
            const {data} = await axios.get(this._getUrl())
            this._totalPage = Math.ceil(data.totalResults / this._pageSize)
            return {
                article: data.articles,
                isNext: this._isNext(),
                isPrev: this._isPrev(),
                totalPage: this._totalPage,
                currentPage: this._currentPage,
                category: this._category,
                totalResults: data.totalResults
            }
        } catch (e) {
            throw new Error(e)
        }
    }

    next() {
        if(this._isNext()) {
            this._currentPage++
            return this.getNews()
        } 
        return false
    }

    prev() {
        if(this._isPrev()) {
            this._currentPage--
            return this.getNews()
        }
        return false
    }

    setCurrentPage(pageNumber) {
        if(pageNumber < 1 && pageNumber > this._totalPage) {
            throw new Error('Invalid page number')
        }
        this._currentPage = pageNumber
        return this.getNews()
    }

    changeCategory(category) {
        this._category = category
        this._currentPage = 1
        return this.getNews()
    }

    search(term) {
        this._searchItem = term
        return this.getNews()
    }

    _getUrl() {
        let url = '/?'
        if(this._category) url += `category=${this._category}` 
        if(this._searchItem) url += `&q=${this._searchItem}`
        if(this._pageSize) url += `&pageSize=${this._pageSize}`
        if(this._currentPage) url += `&page=${this._currentPage}`

        return url
    }

    _isNext() {
        return this._currentPage < this._totalPage
    }
    _isPrev() {
        return this._currentPage > 1
    }
}