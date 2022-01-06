import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery, addBookMutation } from '../queries/queries';
import {flowRight as compose} from 'lodash';

class AddBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            quantity: 0,
            placeId: 0,
            itemId: 0, 
            personId: 0,
            date: '',
            time: ''
        };
    }
    displayPlaces(){
        var data = this.props.getAuthorsQuery;
        //var data = this.props.data;
        if(data.loading){
            return( <option disabled>Loading places</option> );
        } else {
            return data.places.map(place => {
                return( <option key={ place.id
                } value={place.id
                }>{ place.name }</option> );
            });
        }
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
    displayPerson(){
        var data = this.props.getAuthorsQuery;
        //var data = this.props.data;
        if(data.loading){
            return( <option disabled>Loading authors</option> );
        } else {
            return data.persons.map(person => {
                return( <option key={ person.id
                } value={ person.id
                }>{ person.name }</option> );
            });
        }
    }

    submitForm(e){
    
        e.preventDefault();
        this.props.addBookMutation(
            {
                variables:{
                    quantity: this.state.quantity,
                    placeId: this.state.placeId,
                    itemId: this.state.itemId,
                    personId: this.state.personId,
                    date: this.state.date,
                    time: this.state.time
                }
            }
        );
    }

    render(){
        return(
            <form id="add-book" onSubmit={ this.submitForm.bind(this)}>
                <h2>
                    Add Dispatch
                    </h2>
                <div className="field">
                    <label>Date:</label>
                    <input className="form-control"  type="text" onChange={ (e) => this.setState({ date: e.target.value }) }/>
                </div>
                <div className="field">
                    <label>Time:</label>
                    <input className="form-control" type="text" onChange={ (e) => this.setState({ time: e.target.value }) }/>
                </div>
                <div className="field">
                    <label>Item Quantity:</label>
                    <input className="form-control" type="text" onChange={ (e) => this.setState({ quantity: parseInt(e.target.value) }) }/>
                </div>
                <div className="field">
                    <label>Item:</label>
                    <select onChange={ (e) => this.setState({ itemId: e.target.value }) } >
                        <option>Select item</option>
                        { this.displayItem() }
                    </select>
                </div>
                <div className="field">
                    <label>Place:</label>
                    <select onChange={ (e) => this.setState({ placeId: e.target.value }) } >
                        <option>Select place</option>
                        { this.displayPlaces() }
                    </select>
                </div>
                <div className="field">
                    <label>Person:</label>
                    <select onChange={ (e) => this.setState({ personId: e.target.value }) } >
                        <option>Select person</option>
                        { this.displayPerson() }
                    </select>
                </div>
                <button>+</button>

            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" })
    ,graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);