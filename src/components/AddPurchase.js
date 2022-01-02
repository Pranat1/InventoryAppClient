
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery, addPurchaseMutation } from '../queries/queries';
import { flowRight as compose } from 'lodash';

class AddPurchase extends Component {
    constructor(props){
        super(props);
        this.state = {
            quantity: 0,
            itemId: 0, 
            date: '',
            time: '',
            pricePer: 0,
            billNumber: 0
        };
    }

    displayItem(){
        var data = this.props.getAuthorsQuery;
        //var data = this.props.data;
        if(data.loading){
            return( <option disabled>Loading authors</option> );
        } else {
            return data.items.map(item => {
                return( <option key={ item.id
                } value={item.id
                }>{ item.name }</option> );
            });
        }
    }
    

    submitForm(e){
        e.preventDefault();
        this.props.addPurchaseMutation(
            {
                variables:{
                    quantity: this.state.quantity,
                    itemId: this.state.itemId,
                    date: this.state.date,
                    time: this.state.time,
                    pricePer: this.state.pricePer,
                    billNumber: this.state.pricePer
                }
            }
        );
    }

    render(){
        return(
            <form id="add-book" onSubmit={ this.submitForm.bind(this)}>
                <h2>
                    Add Purchase/Transfer
                </h2>
                <div className="field">
                    <label>Bill Number:</label>
                    <input type="text" onChange={ (e) => this.setState({ billNumber: e.target.value }) }/>
                </div>
                <div className="field">
                    <label>Price:</label>
                    <input type="text" onChange={ (e) => this.setState({ pricePer: parseInt(e.target.value) }) }/>
                </div>
                <div className="field">
                    <label>Date:</label>
                    <input type="text" onChange={ (e) => this.setState({ date: e.target.value }) }/>
                </div>
                <div className="field">
                    <label>Time:</label>
                    <input type="text" onChange={ (e) => this.setState({ time: e.target.value }) }/>
                </div>
                <div className="field">
                    <label>Item Quantity:</label>
                    <input type="text" onChange={ (e) => this.setState({ quantity: parseInt(e.target.value) }) }/>
                </div>
                <div className="field">
                    <label>Item:</label>
                    <select onChange={ (e) => this.setState({ itemId: e.target.value }) } >
                        <option>Select item</option>
                        { this.displayItem() }
                    </select>
                </div>
                <button>+</button>

            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" })
    ,graphql(addPurchaseMutation, { name: "addPurchaseMutation" })
)(AddPurchase);