import React from 'react';
import './Product.css';
import {Link} from 'react-router-dom';

export default function Product(props) {
    const { 
        product_name,
        product_price, 
        image_url,
        id } = props.product;

    return(
        <div className='product-container container'>
            <div className='img-container'>
                <img className='product-image' src={image_url} 
                alt="from props" />
            </div>
           <div className='product-name'>{product_name}</div>
           <div className='product-price'>{product_price}</div>
           <div className='button-container'>
               <button className='button' onClick={() => props.deleteProduct(id, props.getProducts)}>Delete</button>
               <Link to={`/add/${id}`}><button className='button' >Edit</button></Link>
               {console.log('product id', id)}
           </div>
        </div>
    )
    
}