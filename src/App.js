import React, { Component } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.css';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import routes from './routes';

class App extends Component {
  constructor(){
    super();

    this.state = {
      inventory: [],
      canEdit: false,
      editID: null,
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
handleEdit(id, doneEdit){
  
  if(doneEdit){
    this.setState({
      canEdit: false,
      editID: null,
    })
  }else{
    this.setState({
      canEdit: true,
      editID: id,
    });
    console.log(id)
  } 
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
              deleteProduct={(id) => this.handleDelete(id)}
              editProduct={(id) => this.handleEdit(id)}/> : 'inventory'
          }
          <Form 
            getProducts={() => this.getProducts}
            editID={this.state.editID}
            canEdit={this.state.canEdit}
            finishEdit={(id, finishEdit) => this.handleEdit(id, finishEdit)}/>  
        </div>  
      </div>
    );
  }
}

export default App;
