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
                <div>
                    <h2 className ="red-text text-center">{ place.name }</h2>

                    <h4 className="red-text text-center"> Total quantity at this place ={this.totalQuantity(place)}</h4>
                    <h3 className="red-text text-center">All Purcheases/Transfers Of the Item:</h3>
                    <table className="other-books table table-dark">
                    <thead><tr><th>Quantity</th> <th>Item Name</th></tr></thead>

                        { place.thisPlaceEntries.map(Entrie => {
                            return <tr key={Entrie.id}><th>{ Entrie.quantity +" "+ Entrie.item.unit}</th> <th>{Entrie.item.name }</th></tr>
                        })}
                    </table>
                </div>
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
