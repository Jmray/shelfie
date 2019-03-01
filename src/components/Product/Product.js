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
               <button onClick={() => props.handleDelete(props.product.id)}>Delete</button>
           </div>
        </div>
    )
    
}