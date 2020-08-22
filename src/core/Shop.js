import React, { useState, useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import { getCategories, getFilteredProducts } from './apiCore'
import Checkbox from './Checkbox'
import RadioBox from './RadioBox'
import { prices } from './fixedPrices'

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] },
        reset: false
    })

    
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [sortBy, setSortBy] = useState('')
    const [filteredResults, setFilteredResults] = useState([])
    const [reload, setReload] = useState(false)

    //load categories and set form data
    const init = () => {
        getCategories().then(data => {
          if (data.error) {
            setError(data.error)
          } else {
            setCategories(data.data)
          }
        })
    }

    const loadFilteredResults = (skip) => {
        const newFilter = myFilters.filters
        getFilteredProducts(skip, limit, newFilter, sortBy).then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
        
    }

    const selectChange = (e) => {
        setSortBy({sortBy: e.target.value})
        if (reload === true) {
            setSkip(0)
            setReload(false)
        }
    }
    
    const loadMore = () => {
        let toSkip = skip + limit
        getFilteredProducts(toSkip, limit, myFilters.filters, sortBy).then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setFilteredResults([ ...filteredResults, ...data.data])
                setSize(data.size)
                setSkip(toSkip)
                setReload(true)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className='btn btn-warning mb-5'>
                    Load more
                </button>
            )
        )
    }

    useEffect(() => {
        init()
        const newFilter = myFilters.filters
        loadFilteredResults(skip, limit, newFilter, sortBy)
    }, [sortBy])

    const handleFilters = (filters, filterBy) => {
        // console.log( 'SHOP',filters, filterBy);
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters
        if (filterBy === 'price') {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
        const newFilter = myFilters.filters
        
        loadFilteredResults(newFilter, sortBy)
        setMyFilters(newFilters)
        
    }

    const handlePrice = value => {
        const data = prices
        let array = []

        for(let key in data) {
            if(data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array
    }

    return (
        <Layout
            title='Shop Page'
            description='Searcch and find books of your choice'
            className='container-fluid'
        >
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                        <h4>Filter by category</h4>
                        <ul>
                            <Checkbox 
                                categories={categories}
                                handleFilters={filters =>
                                    handleFilters(filters, 'category')
                                } 
                            />
                        </ul>
                        <h4>Filter by price range</h4>
                        <div>
                            <ul className='list-unstyled'>
                                <RadioBox 
                                    prices={prices}
                                    handleFilters={filters =>
                                        handleFilters(filters, 'price')
                                    } 
                                />
                            </ul>
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-9 col-lg-9 col-xl-9'>
                        <h2 className='mb-4'>Products</h2>
                        <div className='row'>
                            <div className='col-sm-5 col-md-3 col-xl-2 col-lg-3 mt-5 mb-4'>
                                <select onChange={e => selectChange(e)} value={sortBy} className='form-control'>
                                    <option value='_idOrderByasc'>SortBy</option>
                                    <option value='priceOrderByasc'>Price ↓</option>
                                    <option value='priceOrderBydesc'>Price ↑</option>
                                    <option value='soldOrderBydesc'>Sold</option>
                                    <option value='updatedAtOrderByasc'>SortByNew</option>
                                    <option value='quantityOrderByasc'>Quantity ↓</option>
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            {filteredResults.map((product, i) => (
                                <div key={i} className='col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-3'>
                                    <Card product={product} />
                                </div>
                            ))}
                        </div>
                        <hr />
                        {loadMoreButton()}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Shop;