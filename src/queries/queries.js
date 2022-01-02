import { gql } from 'apollo-boost';


const getBooksQuery = gql`{
    items{
        name
        unit
        id
        PurchaseData{
            quantity
            pricePer
            billNumber
            date 
            time
            id
        }

        EntryData{
            quantity
            place{
                name
            }
            person{
                name
            }
            date
            time
            id
        }
    }
    places{
        name
        id
        thisPlaceEntries{
            item{
                name
            }
            quantity
        }
    }
    
    }
    `

const getAuthorsQuery = gql`{
    places{
        name
        id
    }
    items{
        name
        id
    }
    persons{
        name
        id
    }
    }
`

const addBookMutation = gql`
    mutation AddBook($quantity: Int!, $placeId: ID!, $itemId: ID!, $personId: ID!, $date: String!, $time: String!){
        addEntry(quantity: $quantity, placeId: $placeId, itemId: $itemId, personId: $personId, date: $date,time: $time){
            quantity
            item{
                name
            }

        }
    }
`;

const addPurchaseMutation = gql`
    mutation AddPurchase($quantity: Int!, $itemId: ID!, $date: String!, $time: String!, $pricePer: Int!, $billNumber: Int! ){
        addPurchase(quantity: $quantity, itemId: $itemId, date: $date,time: $time, pricePer: $pricePer, billNumber: $billNumber){
            quantity
            item{
                unit
            }

        }
    }
`;

const addItemMutation = gql`
    mutation AddItem($unit: String!, $name: String!){
        addItem(unit: $unit, name: $name){
            unit
            name
        }
    }
`;

const addPersonMutation = gql`
    mutation AddPerson($name: String!){
        addPerson( name: $name){
            name
        }
    }
`;

const addPlaceMutation = gql`
    mutation AddPlace($name: String!){
        addPlace( name: $name){
            name
        }
    }
`;


const getItemQuery = gql`
    query GetItem($id: ID){
        item(id: $id) {
            id
            name
            PurchaseData{
                quantity
                pricePer
                billNumber
                date 
                time
                id
            }
    
            EntryData{
                quantity
                place{
                    name
                }
                person{
                    name
                }
                date
                time
                id
            }
        }
    }
`;


const getPlaceQuery = gql`
    query GetItem($id: ID){
        place(id: $id) {
            name
            id
            thisPlaceEntries{
                item{
                    name
                }
                quantity
            }
    }
}
`;


export {getAuthorsQuery, getBooksQuery, addBookMutation, addPurchaseMutation, addItemMutation, addPersonMutation, addPlaceMutation, getItemQuery,getPlaceQuery}