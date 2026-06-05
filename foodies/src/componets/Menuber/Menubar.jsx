import React, { useContext, useState } from 'react'
import './Menubar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../contex/StoreContex'


const Menubar = () => {
  const [active, setActive] = useState('home');
  const { quantities,token ,setToken,setQuantities} = useContext(StoreContext);
  const uniqueItemsinCart = Object.values(quantities).filter(qty => qty > 0).length;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setQuantities({}); // Clear cart quantities on logout
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
      <Link to="/"><img src={assets.delvery} alt="Logo" height={48} width={48} className='mx-4'/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={active === 'home' ? 'nav-link fw-bold active' : 'nav-link'} to="/" onClick={() => setActive('home')}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className={active === 'explore' ? 'nav-link fw-bold active' : 'nav-link'} to="/explore" onClick={() => setActive('explore')}>Explore</Link>
        </li>
        
        <li className="nav-item">
          <Link className={active === 'contact' ? 'nav-link fw-bold active' : 'nav-link'} to="/contactus" onClick={() => setActive('contact')}>Contact Us</Link>
        </li>
      </ul>
      <div className="d-flex align-items-center gap-4">
        <div className="position-relative">
          <Link to={'/cart'}>
          <img src={assets.cart} alt="" height={28} width={28}  className='position-relative'/>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
            {uniqueItemsinCart}
          </span>
          </Link>
        </div>
        {
          !token ? (
          <>
          <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/login')}>Log In</button>
        <button className="btn btn-outline-success btn-sm" onClick={() => navigate('/register')}>Register</button>
          </>
          )
          :(
          <div className="dropdown text-end">
             <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">
            <img src={assets.profile} alt="" width={32} height={32} className='rounded-circle' />
            </a>
            <ul className='dropdown-menu text-small'>
              <li className='dropdown-item' onClick={()=> navigate('/myorders')}>Orders</li>
              <li className='dropdown-item' onClick={logout}>Logout</li>
            </ul>
          </div>
          )
        }
      
        
      </div>
    </div>
  </div>
</nav>
  )
}

export default Menubar