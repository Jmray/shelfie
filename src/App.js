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
  componentDidMount(){
    this.getProducts()
    
   
  }
  
  getProducts = () => {
    axios.get('http://localhost:5000/api/products')
    .then(response => {
        this.setState({
            inventory: response.data,
            
        });
        console.log('Got products')
    })
    .catch( err => {
        console.log(err);
    });
    
}
handleDelete(id){
  axios.delete('http://localhost:5000/api/products/' + id).then((response) => {
      console.log(response.data);
      this.getProducts();

      
  })

}


  
  render() {
    return (
      <div className="App">
        <div className='main-container'>
          <Header/>
          { 
            this.state.inventory[0] ? 
            <Dashboard 
            inventory={this.state.inventory} 
            getProducts={() => this.getProducts()}
            deleteProduct={(id) => this.handleDelete(id)}/> : 'inventory'
          }
          <Form getProducts={() => this.getProducts}/>  
        </div>  
      </div>
    );
  }
}

export default App;
