import React, { useEffect, useState, Fragment } from 'react'
import Product from './Product/Product'
import axios from 'axios'
import Pagination from './Pagination'
import { Link } from 'react-router-dom'
const ProductList = () => {
  const pageSize = 6
  const [lower, setLower] = useState(0)
  const [upper, setUpper] = useState(0)
  const [page, setPage] = useState(1)

  const [products, setProducts] = useState()
  const fetchProducts = async () => {
    const { data } = await axios.get(`${process.env.PUBLIC_URL}/mock-products.json`)
    setProducts(data)
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  useEffect(() => {
    if (products) {
      setLower((page - 1) * pageSize + 1)
      setUpper((page) * pageSize)
    }
  }, [products, page])
  return (
    <Fragment>
      {products ? <Pagination {...{ page, setPage, pageSize, total: products.length }} /> : ''}
      <div className="row">
        {
          products && products.slice(lower - 1, upper).map((product) => {
            return <div className="col-12 col-md-4" key={product.id}>
              <Product {...product} />
            </div>
          })
        }
      </div>
      <div className="mt-5">
        <Link to="cart" className="text-white float-right btn btn-success">Continue <strong>&gt;&gt;</strong></Link>
      </div>
    </Fragment >
  )
}

export default ProductList
