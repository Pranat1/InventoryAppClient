import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getBooksQuery} from '../queries/queries'

import ItemDetails from './ItemDetails';
import PlaceDetails from './PlaceDetails';

class BookList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            selected1: null
        }
        this.inputLinkClicked = (
              <div>Load On Click</div>
          )
        
      }
    handleAddSecondInput(item) {
        this.setState({selected: item.id})
        //this.inputLinkClicked = item.PurchaseData.map((Purchase) => 
         //   <li key={Purchase.id}>{Purchase.pricePer}</li>
        //  )

    }

    calculateStock(obj1, obj2){
        let quantityToReturn1 = 0;
        let quantityToReturn2 = 0;
        for(let i = 0; i < obj1.length; i++){
            quantityToReturn1 += obj1[i].quantity;
        }
        for(let i = 0; i < obj2.length; i++){
            quantityToReturn2 += obj2[i].quantity;
        }
        return (quantityToReturn1 - quantityToReturn2).toString();
    }
    displayBooks(){
        var data = this.props.data;
        if(data.loading){
            return( <div>Loading data...</div> );
        } else {
            return data.items.map(item => {
                return(
                    <button key={ item.id } class = "btn-default btn btn-block btn-primary"onClick={ (e) => this.setState({ selected: item.id }) }>{ item.name + ": " + this.calculateStock(item.PurchaseData, item.EntryData) }</button>
                );
            })
        }
    }
    displayPlacers(){
        var data = this.props.data;
        if(data.loading){
            return( <div>Loading data...</div> );
        } else {
            return data.places.map(place => {
                return(
                    <button  key={ place.id } class = "btn-default btn btn-block btn-primary" onClick={ (e) => this.setState({ selected1: place.id }) }>{ place.name }</button>
                );
            })
        }
    }
    render(){
        
        console.log(this.props);
        return(
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                <ul id="book-list">
                    {this.displayPlacers()}
                </ul>
                <ul>
                    <ItemDetails itemId = {this.state.selected}/>
                    <hr></hr>
                    <PlaceDetails placeId = {this.state.selected1}/>
                </ul>
                
            </div>
        );
    }

}

export default graphql(getBooksQuery)(BookList);