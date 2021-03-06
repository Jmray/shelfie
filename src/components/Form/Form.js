import React, { Component } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.css'
import './Form.css';



class Form extends Component {

    constructor() {
        super();

        this.state = {
            image_url: '',
            product_name: '',
            product_price: 0,
            enabled: true,
        }
    }
    componentDidMount() {

        if (this.props.match.params.id) {
            axios.get('http://localhost:5000/api/products/' + this.props.match.params.id).then(res => {
                const {
                    product_name,
                    product_price,
                    image_url,
                } = res.data;
                this.setState({
                    product_name,
                    product_price,
                    image_url,
                });
            })
        }
    }

    handleNameChange(value) {
        this.setState({
            product_name: value,
        });
    }
    handlePriceChange(value) {
        this.setState({
            product_price: value,
        });
    }
    handleImageChange(value) {
        this.setState({
            image_url: value,
        });
    }
    handleCancel() {
        this.setState({
            product_name: '',
            product_price: 0,
            image_url: '',
            enabled: false
        });

    }
    handleSubmit(event) {
        event.preventDefault();
        let image_url = this.state.image_url ? this.state.image_url 
        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOZNL0sDN-psNGkDyevAF1x5xQ5NxSID1kGjLjk7e4o5Fq8s1WbQ';

        let { product_name, product_price } = this.state;

        let requestPromise;

        if (this.props.match.params.id) {
            requestPromise = axios.put('http://localhost:5000/api/products/' + this.props.match.params.id, {
                product_name,
                product_price,
                image_url,
            });
        } else {
            requestPromise = axios.post('http://localhost:5000/api/products', {
                product_name,
                product_price,
                image_url,
            });
        }

        requestPromise
            .then((res) => {
                this.props.history.push('/');
            }).catch(err => {
                console.error(err);
            });


    }

    checkIfEnabled = (event) => {
        event.preventDefault()
        alert('add button has been disabled')
    }


    render() {
        return (
            <div className='container form-container box'>

                <form onSubmit={event => {
                    this.state.enabled ? this.handleSubmit(event) 
                    : this.checkIfEnabled(event)
                    }}>
                    <img 
                        className='preview-image' 
                        src={this.state.image_url} 
                        alt="product"  
                        onError={() => {
                            this.setState({image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOZNL0sDN-psNGkDyevAF1x5xQ5NxSID1kGjLjk7e4o5Fq8s1WbQ'})
                            }}/>
                    <label className='label'>
                        Image URL:
                        <input
                            className='input'
                            type='text'
                            placeholder='Image Url'
                            // value={this.state.image_url}
                            onChange={event => this.handleImageChange(event.target.value)} 
                            onFocus={() => {
                                this.setState({
                                    enabled: false,
                                })
                            }}
                            onBlur={() => {
                                setTimeout(() => {
                                    this.setState({
                                        enabled: true
                                    })
                                    
                                }, 1500);
                            }}/>
                    </label>
                    <label className='label'>
                        Product Name:
                        <input
                            className='input'
                            type='text'
                            placeholder='Name'
                            value={this.state.product_name}
                            onChange={event => this.handleNameChange(event.target.value)} />
                    </label>
                    <label className='label'>
                        Product Price:
                        <input
                            className='input'
                            type='number'
                            placeholder='Price'
                            value={this.state.product_price}
                            onChange={event => this.handlePriceChange(event.target.value)} />
                    </label>

                    <button 
                        className='button' 
                        type='submit'>
                            {
                                !this.props.match.params.id ? "Add" 
                                : "Save Changes"
                            }
                    </button>

                    <button 
                        className='button' 
                        type='button' 
                        onClick={() => this.handleCancel()}>
                        cancel
                    </button>
                </form>

            </div>
        )
    }
}

export default Form;