import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Nav extends Component {
  render() {
    return (
      <nav>
        <span><Link to='/'>Home</Link></span>
        <span><Link to='/shop'>Shop</Link></span>
      </nav>
    );
  }
}

export default Nav;
