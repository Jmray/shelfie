import React, { Component } from 'react';
import Product from '../Product/Product';
import axios from 'axios';


class Dashboard extends Component{
    state = {
        inventory: [],
    }

    componentDidMount(){
        this.getProducts();
    }
    getProducts = () => {
        axios.get('http://localhost:5000/api/products')
        .then(response => {
            this.setState({
                inventory: response.data,  
            });
        })
        .catch( err => {
            console.log(err);
        }); 
    }

    deleteProduct(id, cb){
        axios.delete('http://localhost:5000/api/products/' + id).then((response) => {
            console.log(response.data);
            cb();  
        })
      }
      

        render(){
        // console.log('render', this.state)
        const products = this.state.inventory.map((product, index) => (
             
                <div className='container' key={index}>
                
                <Product 
                    getProducts={this.getProducts}
                    deleteProduct={this.deleteProduct}
                    product={product}/>
                </div>
             
        ));

        return(
            <div className='container'>
                
                {
                    this.state.inventory ? products : <h1>Loading...</h1>
                }
            </div>
        )
    }
    
}
export default Dashboard;

