import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();

    this.state = {
      inventory: [],
    }
  }
  getProducts = () => {
    axios.get('http://localhost:5000/api/products')
    .then(response => {
        this.setState({
            inventory: response.data,
        });
        // console.log('mounting' + this.state.inventory)
    })
    .catch( err => {
        console.log(err);
    });
}
  
  render() {
    return (
      <div className="App">
        <div className='main-container'>
          <Header/>
          <Dashboard getProducts={() => this.getProducts()}/>
          <Form getProducts={() => this.getProducts}/>  
        </div>  
      </div>
    );
  }
}

export default App;
