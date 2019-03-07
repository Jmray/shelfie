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
            imageValid: false,
        }
    }
    componentDidMount() {
        if (this.props.match.params.id) {
            axios.get('http://localhost:5000/api/products/' + this.props.match.params.id).then(res => {
                console.log(res.data)
                this.setState({
                    product_name: res.data.product_name,
                    product_price: res.data.product_price,
                    image_url: res.data.image_url,
                })
            })
        }
    }

    handleNameChange(value) {
        this.setState({
            product_name: value,
        })

    }
    handlePriceChange(value) {
        this.setState({
            product_price: value,
        })

    }
    handleImageChange(value) {
        this.setState({
            image_url: value,
            imageValid: false,
        }, () => {
            this.checkImage(value);
        });
        console.log(this.state.image_url)

    }
    handleCancel() {
        this.setState({
            product_name: '',
            product_price: 0,
            image_url: '',
        })

    }
    handleSubmit(event) {
        event.preventDefault();
        let image_url = this.state.image_url ? this.state.image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOZNL0sDN-psNGkDyevAF1x5xQ5NxSID1kGjLjk7e4o5Fq8s1WbQ';
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



    render() {
        console.log(this.state);
        return (
            <div className='container form-container box'>

                <form onSubmit={event => this.handleSubmit(event)}>
                    {
                        this.state.imageValid ?
                            <img className="preview-image" src={this.state.image_url} alt="product" /> :
                            <img className="placeholder" src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOZNL0sDN-psNGkDyevAF1x5xQ5NxSID1kGjLjk7e4o5Fq8s1WbQ'} alt="Error loading" />
                    }
                    {/* <img className='preview-image' src={this.state.image_url} alt="product" /> */}
                    <label className='label' >
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
                    <label className='label'>
                        Image URL:
                        <input
                            className='input'
                            type='text'
                            placeholder='Image Url'
                            value={this.state.image_url}
                            onChange={event => this.handleImageChange(event.target.value)} />
                    </label>

                    <button className='button' type='submit'>{!this.props.match.params.id ? "Add" : "Save Changes"}</button>

                    <button className='button' type='button' onClick={() => this.handleCancel()}>cancel</button>
                </form>

            </div>
        )
    }

    checkImage() {
        const tempImg = new Image();
        
        tempImg.onload = function() {
            this.setState({
                imageValid: true,
            });
        }.bind(this);

        tempImg.onerror = function () {
            this.setState({
                imageValid: false,
            });
        }.bind(this);
        
        tempImg.src = this.state.image_url;
    }
}

export default Form;