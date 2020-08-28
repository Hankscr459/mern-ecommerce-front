import React, {useState} from 'react'
import { withRouter } from 'react-router-dom'
import '../css/search.css'

const Search = (props) => {
    const [query, setQuery] = useState('')

    const handleChange = (e) => {
        const search = e.target.value
        setQuery(search)
        // console.log(search)
    }

    const location = {
        pathname: '/products/find',
        search: `?search=${query}`,
        state: `${query}`
    }

    const onSubmit = (e) => {
        e.preventDefault()
        props.history.push(location)
    }

    return (
      <div className="App">
        <svg xmlns="http://www.w3.org/2000/svg" style={{'display': 'none'}}>
            <symbol xmlns="http://www.w3.org/2000/svg" id="sbx-icon-search-16" viewBox="0 0 40 40">
                <path d="M24.44 30.41c-2.396 1.387-5.178 2.18-8.145 2.18C7.295 32.59 0 25.294 0 16.295 0 7.295 7.296 0 16.295 0c9 0 16.295 7.295 16.295 16.295 0 2.967-.793 5.75-2.18 8.145l8.29 8.29c1.65 1.648 1.646 4.325 0 5.97-1.648 1.65-4.317 1.654-5.97 0l-8.29-8.29zm-8.145.55c8.1 0 14.666-6.566 14.666-14.665 0-8.1-6.565-14.666-14.665-14.666-8.1 0-14.665 6.565-14.665 14.665 0 8.1 6.566 14.665 14.665 14.665zm0-4.888c5.4 0 9.777-4.377 9.777-9.777 0-5.4-4.377-9.777-9.777-9.777-5.4 0-9.777 4.377-9.777 9.777 0 5.4 4.377 9.777 9.777 9.777zm0-1.63c4.5 0 8.148-3.647 8.148-8.147s-3.648-8.148-8.148-8.148-8.147 3.648-8.147 8.148 3.647 8.147 8.147 8.147zm9.723 5.268l3.693-3.692 7.986 7.985c1.02 1.02 1.02 2.678.003 3.696-1.02 1.02-2.67 1.023-3.697-.005l-7.985-7.985z"
                fillRule="evenodd" />
            </symbol>
            <symbol xmlns="http://www.w3.org/2000/svg" id="sbx-icon-clear-5" viewBox="0 0 20 20">
                <path d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10zm1.35-10.123l3.567 3.568-1.225 1.226-3.57-3.568-3.567 3.57-1.226-1.227 3.568-3.568-3.57-3.57 1.227-1.224 3.568 3.568 3.57-3.567 1.224 1.225-3.568 3.57zM10 18.272c4.568 0 8.272-3.704 8.272-8.272S14.568 1.728 10 1.728 1.728 5.432 1.728 10 5.432 18.272 10 18.272z"
                fillRule="evenodd" />
            </symbol>
        </svg>

            <form className="searchbox sbx-custom" onSubmit={onSubmit}>
                <div role="search" className="sbx-custom__wrapper">
                    <input 
                        type="search"  
                        placeholder="Search product" 
                        autoComplete="off" 
                        required="required" 
                        className="sbx-custom__input" 
                        value={query}
                        onChange={handleChange}
                    />
                    <button type="submit" title="Submit your search query." className="sbx-custom__submit">
                    <svg role="img" aria-label="Search">
                        <use xlinkHref="#sbx-icon-search-16"></use>
                    </svg>
                    </button>
                    <button type="reset" title="Clear the search query." className="sbx-custom__reset">
                        <svg role="img" aria-label="Reset">
                            <use xlinkHref="#sbx-icon-clear-5"></use>
                        </svg>
                    </button>
                </div>
            </form>
      </div>
    );
  }

export default withRouter(Search);