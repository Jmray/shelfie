import React, { Component } from 'react';
import Product from '../Product/Product';


export default function Dashboard(props){

    
        // console.log('render', this.state)
        const products = props.inventory.map((product, index) => (
             
                <div key={index}>
                
                <Product 
                    deleteProduct={props.deleteProduct}
                    product={product}
                    editProduct={props.editProduct}/>
                </div>
             
        ));

        return(
            <div>
                
                {
                    props.inventory[0] ? products : <h1>Loading...</h1>
                }
            </div>
        )
    
}

