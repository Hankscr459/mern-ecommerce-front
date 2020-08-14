import React, { useState, useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import { getCategories, getFilteredProducts } from './apiCore'
import Checkbox from './Checkbox'
import RadioBox from './RadioBox'
import { prices } from './fixedPrices'

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])

    //load categories and set form data
    const init = () => {
        getCategories().then(data => {
          if (data.error) {
            setError(data.error)
          } else {
            setCategories(data.data)
          }
        });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters)
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
    }
    
    const loadMore = () => {
        let toSkip = skip + limit
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setFilteredResults([ ...filteredResults, ...data.data])
                setSize(data.size)
                setSkip(toSkip)
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
        init();
        loadFilteredResults(skip, limit, myFilters.filters)
    }, [])

    const handleFilters = (filters, filterBy) => {
        // console.log( 'SHOP',filters, filterBy);
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters
        if (filterBy === 'price') {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
        loadFilteredResults(myFilters.filters)
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
            <div className='row justify-content-center'>
                <div className='col-sm-10 col-md-3 col-lg-3'>
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
                <div className='col-sm-10 col-md-9'>
                    <h2 className='mb-4'>Products</h2>
                    <div className='row'>
                        {filteredResults.map((product, i) => (
                            <div key={i} className='col-sm-12 col-md-5 col-lg-4 col-xl-3 mb-3'>
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
}

export default Shop;