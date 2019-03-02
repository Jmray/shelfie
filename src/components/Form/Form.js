import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component{
    state = {
        image_url: '',
        product_name: '',
        product_price: 0,
    }
    handleNameChange(value){
        this.setState({
            product_name: value,
        })
        
    }
    handlePriceChange(value){
        this.setState({
            product_price: value,
        })
        
    }
    handleImageChange(value){
        this.setState({
            image_url: value,
        })
        
    }
    handleSubmit(event, getProducts){
        event.preventDefault();

        const { product_name, product_price, image_url } = this.state;

        axios.post('http://localhost:5000/api/products',{
            product_name,
            product_price,
            image_url,
        }).then((res) => {

            console.log(res);
        }).catch(err => {
            console.error(err);
        });
        this.setState({
            product_name: '',
            product_price: 0,
            image_url: '',
        })
        getProducts();
        
        

    }



    render(){
        return(
            <div>
                <form onSubmit={event => this.handleSubmit(event, this.props.getProducts())}>
                    <label>
                        Product Name:
                        <input
                            type='text'
                            placeholder='Name'
                            value={this.state.product_name}
                            onChange={event => this.handleNameChange(event.target.value)}/>
                    </label>
                    <label>
                    Product Price:
                        <input
                            type='number'
                            placeholder='Price'
                            value={this.state.product_price}
                            onChange={event => this.handlePriceChange(event.target.value)}/>
                    </label>
                    <label>
                        Image URL:
                        <input 
                            type='text' 
                            placeholder='Image Url'
                            value={this.state.image_url} 
                            onChange={event => this.handleImageChange(event.target.value)}/>
                    </label>
                    <button type='submit'>Add</button>
                </form>
            </div>
        )
    }
}

export default Form;