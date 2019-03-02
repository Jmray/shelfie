import React, { Component } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.css'


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
    handleCancel(){
        this.setState({
            product_name: '',
            product_price: 0,
            image_url: '',
        })

    }
    handleSubmit(event, getProducts){
        event.preventDefault();
        
        let { product_name, product_price, image_url } = this.state;
        

        if(this.props.canEdit){
            axios.put('http://localhost:5000/api/products/' + this.props.editID,{
            product_name,
            product_price,
            image_url,
            }).then((res) => {
                this.props.finishEdit(null, true);
                this.setState({
                    product_name: '',
                    product_price: 0,
                    image_url: '',
                });
                getProducts();
                console.log(res);
            }).catch(err => {
                console.error(err);
            });

        }else{
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
    }



    render(){
        return(
            <div className='box'>
                <form className='container' onSubmit={event => this.handleSubmit(event, this.props.getProducts())}>
                    <img src={this.state.image_url} height='200' width='200'/>
                    <label className='label'>
                        Product Name:
                        <input
                            className='input'
                            type='text'
                            placeholder='Name'
                            value={this.state.product_name}
                            onChange={event => this.handleNameChange(event.target.value)}/>
                    </label>
                    <label className='label'>
                    Product Price:
                        <input
                            className='input'
                            type='number'
                            placeholder='Price'
                            value={this.state.product_price}
                            onChange={event => this.handlePriceChange(event.target.value)}/>
                    </label>
                    <label className='label'>
                        Image URL:
                        <input 
                            className='input'
                            type='text' 
                            placeholder='Image Url'
                            value={this.state.image_url} 
                            onChange={event => this.handleImageChange(event.target.value)}/>
                    </label>
                    <button type='submit'>{this.props.canEdit === false ? "Add" : "Save Changes"}</button>
                    
                </form>
                <button  onClick={(cb) => this.handleCancel(this.props.finishEdit(null, true))}>cancel</button>
            </div>
        )
    }
}

export default Form;