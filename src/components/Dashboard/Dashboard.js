import React, { Component } from 'react';
import axios from 'axios';
import Product from '../Product/Product';


class Dashboard extends Component{
    constructor(){
        super();
        this.state = {
            inventory: [],
        }
    }
    

    componentWillMount(){
        
            this.props.getProducts();
    }

    

    handleDelete(id){
        axios.delete('http://localhost:5000/api/products/' + id).then((response) => {
            console.log(response.data);
            this.props.getProducts();
            
        })

    }

    

    render(){
        // console.log('render', this.state)
        const products = this.state.inventory.map((product, index) => (
             
                <div key={index}>
                
                <Product handleDelete={(id) => this.handleDelete(id)}product={product}/>
                </div>
             
        ));

        return(
            <div>
                {
                    this.state.inventory[0] ? products : <h1>Loading...</h1>
                }
            </div>
        )
    }
}

export default Dashboard;