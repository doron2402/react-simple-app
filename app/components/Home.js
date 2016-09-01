import React from 'react';
import { Link } from 'react-router';
import { transparentBg } from '../styles';

const Home = React.createClass({
  render: function() {
    return (
      <div className='jumbotron col-sm-12 text-center' style={transparentBg}>
        <h1>Github Battle</h1>
        <p className='lead'>Text</p>
        <Link to='/playerOne'>
        	<button type='button' className='btn btn-lg btn-success'>
        	Get Started
        	</button>
        </Link>
      </div>
    )
  }
});


export default Home;