import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getPlaceQuery } from '../queries/queries';

class PlaceDetails extends Component {
    totalQuantity(data){
        var totalQuanti = 0;
        for (var i = 0; i < data.thisPlaceEntries.length; i++){
            totalQuanti += data.thisPlaceEntries[i].quantity;
        }
        return totalQuanti;
       
    }
    displayBookDetails(){
        const { place } = this.props.data;
        if(place){
            return(
                <table>
                    <h2>{ place.name }</h2>

                    <p> Total quantity at this place ={this.totalQuantity(place)}</p>
                    <p>All Purcheases/Transfers Of the Item:</p>
                    <table className="other-books">
                        
                        { place.thisPlaceEntries.map(Entrie => {
                            return <tr key={Entrie.id}><th>{ "Quantity: " + Entrie.quantity }</th> <th>{"Entry Item Name: " +Entrie.item.name }</th></tr>
                        })}
                    </table>
                </table>
            );
        } else {
            return( <div>No book selected...</div> );
        }
    }
    render(){
        return(
            <div id="book-details">
                { this.displayBookDetails() }
            </div>
        );
    }
}

export default graphql(getPlaceQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.placeId
            }
        }
    }
})(PlaceDetails);