import React from 'react';
import './Product.css';

export default function Product(props) {
    
    return(
        <div className='product-container'>
           <img className='product-image' src={props.product.image_url} 
           alt="from props" />
           {props.product.product_name}
           {props.product.product_price}
           <div>
               <button onClick={() => props.deleteProduct(props.product.id)}>Delete</button>
               <button onClick={() => props.editProduct(props.product.id)}>Edit</button>
               {console.log('product id', props.product.id)}
           </div>
        </div>
    )
    
}