
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery, addItemMutation } from '../queries/queries';
import {flowRight as compose} from 'lodash';

class AddItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            unit: ''
        };
    }

    submitForm(e){
    
        e.preventDefault();
        this.props.addItemMutation(
            {
                variables:{
                    name: this.state.name,
                    unit: this.state.unit

                }
            }
        );
    }

    render(){
        return(
            <form id="add-book" onSubmit={ this.submitForm.bind(this)}>
                <h2>
                    Add Item
                    </h2>
                <div className="field">
                    <label>Name:</label>
                    <input className="form-control" type="text" onChange={ (e) => this.setState({ name: e.target.value }) }/>
                </div>
                <div className="field">
                    <label>Unit:</label>
                    <input className="form-control" type="text" onChange={ (e) => this.setState({ unit: e.target.value }) }/>
                </div>
                <button>+</button>

            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" })
    ,graphql(addItemMutation, { name: "addItemMutation" })
)(AddItem);