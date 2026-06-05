import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <div className="header p-5 mb-4 bg-light rounded-3 mt-1">
        <div className="container-fluid py-5">
            <h2 className='display-5 fw-bold'>Order Your Grocery here</h2>
            <p className="col-md-8 fs-4">Discover the best food and drinks in Surat</p>
            <Link to="/explore" className='btn btn-primary'>Explore</Link>
        </div>
    </div>
  )
}

export default Header