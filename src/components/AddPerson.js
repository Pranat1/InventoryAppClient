
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery, addPersonMutation } from '../queries/queries';
import {flowRight as compose} from 'lodash';

class AddPerson extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
        };
    }

    submitForm(e){
    
        e.preventDefault();
        this.props.addPersonMutation(
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
                    Add Person
                    </h2>
                <div className="field">
                    <label>Name:</label>
                    <input className="form-control" type="text" onChange={ (e) => this.setState({ name: e.target.value }) }/>
                </div>
                <button>+</button>

            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" })
    ,graphql(addPersonMutation, { name: "addPersonMutation" })
)(AddPerson);