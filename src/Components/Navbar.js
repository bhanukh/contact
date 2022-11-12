import React from 'react'
import{ Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark py-2'>
           <div className="container-fluid">
           <Link to="/" className='navbar-brand ml-5'> React-Contact-App</Link>
           </div>
        </nav>
    </div>
  )
}

export default Navbar