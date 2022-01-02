import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getItemQuery } from '../queries/queries';

class ItemDetails extends Component {
    displayBookDetails(){
        console.log(this.props);
        const { item } = this.props.data;
        if(item){
            return(
                <table>
                    <h2>{ item.name }</h2>

                    <p>All Purcheases Of the Item:</p>
                    <table className="other-books">
                        
                        { item.PurchaseData.map(Purchase => {
                            return <tr key={Purchase.id}><th>{ "Quantity: " + Purchase.quantity }</th> <th>{"Time Added: " +Purchase.time }</th><th>{"Date Added: "+ Purchase.date }</th> <th>{"Price Per Unit: "+ Purchase.pricePer }</th> <th>{"Bill Number: "+ Purchase.billNumber}</th> </tr>
                        })}
                    </table>
                    <p>All Entrys Of the Item:</p>
                    <table>
                    
                        { item.EntryData.map(Entry => {
                            return <tr key={Entry.id}><th>{ "Quantity: " + Entry.quantity }</th> <th>{"Time Added: " +Entry.time }</th><th>{"Date Added: "+ Entry.date }</th> <th>{"Place Sent: "+ Entry.place.name }</th> <th>{"Person Given: "+ Entry.person.name}</th> </tr>
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

export default graphql(getItemQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.itemId
            }
        }
    }
})(ItemDetails);