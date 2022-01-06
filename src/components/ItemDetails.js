import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getItemQuery } from '../queries/queries';

class ItemDetails extends Component {
    totalQuantity(data){
        var totalQuanti = 0;
        for (var i = 0; i < data.PurchaseData.length; i++){
            totalQuanti += data.PurchaseData[i].quantity;
        }
    
        return totalQuanti;
    }
    totalDispached(data){
        var totalQuanti = 0;
        for (var i = 0; i < data.EntryData.length; i++){
            totalQuanti += data.EntryData[i].quantity;
        }
    
        return totalQuanti;
    }
       
    displayBookDetails(){
        console.log(this.props);
        const { item } = this.props.data;
        if(item){
            return(
                

                <div >
                    <h2  className ="red-text text-center">{ item.name }</h2>
                    <h4 className ="red-text text-center">Total Purchase/Transfers Received:{this.totalQuantity(item)}</h4>
                    <h4 className ="red-text text-center">Total Dispatch:{this.totalDispached(item)}</h4>
                    <h4 className ="red-text text-center">Current Balance:{this.totalQuantity(item) - this.totalDispached(item)}</h4>
                    <h3 className ="red-text text-center">All Purchases/Transfers Received Of the Item:</h3>
                    <table className="other-books table table-dark">
                    <thead><tr>
                        <th>Quantity {item.unit}</th>
                         <th>Time</th><th>Date</th>
                          <th>Price Per Unit</th>
                          <th>Bill Number</th> 
                          </tr></thead>

                        { item.PurchaseData.map(Purchase => {
                            return <tr key={Purchase.id}><th>{  Purchase.quantity }</th> <th>{Purchase.time }</th><th >{Purchase.date }</th> <th>{ Purchase.pricePer }</th> <th >{Purchase.billNumber}</th> </tr>
                        })}
                    </table>
                    <h3 className ="red-text text-center">All Dispatches:</h3>
                    <table className="other-books table table-dark">
                        <thead><tr>
                            <th>Quantity {item.unit}</th> 
                            <th>Time</th><th>Date</th> 
                            <th>Place Sent</th> 
                            <th>Person Given</th> 
                            </tr></thead>
                        { item.EntryData.map(Entry => {
                            return <tr key={Entry.id}><th>{ Entry.quantity }</th> <th>{Entry.time }</th><th>{Entry.date }</th> <th>{Entry.place.name }</th> <th>{ Entry.person.name}</th> </tr>
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

export default graphql(getItemQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.itemId
            }
        }
    }
})(ItemDetails);