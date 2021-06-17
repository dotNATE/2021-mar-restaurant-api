### Collection Structure
##### Collection structure for restaurant.dishes


| Property      | Value     | Type     |
| :------------- | :----------: | :----------: |
| _id |  Unique menu item id, auto-generated  | String |
| name   | Name of dish | String |
| description   | Description of the dish | String |
| price   | Amount of money the dish costs | Decimal128 |
| dishType | The course type of the dish (starters, mains, desserts, refreshments) | String |

##### Collection structure for orders

| Property      | Value     | Type     |
| :------------- | :----------: | :----------: |
| _id |  Unique order id, auto-generated  | String |
| name   | Name of customer | String |
| deliveryAddress   | Address of customer where order needs to be delivered | String |
| email   | Customers email | String |
| isOrderSubmitted | Has the customer submitted final order | Bool |
| timePlaced   | Time order was submitted by customer | Date |
| orderItems   | Holds object of each menu item id and quantity that customer has ordered | Array |


## API Calls

### GET

#### Getting items on the menu

Returns a JSON string of dishes (option for all dishes, and dishes by type). No authentication required.

// return all dishes of all types (dishType)
`GET /dishes`

// return all starters
`GET /dishes/starters`

// return all mains
`GET /dishes/mains`

// return all desserts
`GET /dishes/desserts`

// return all refreshments
`GET /dishes/refreshments`

##### Sample Call
```javascript
fetch('http://localhost:3000/dishes')
    .then (res => res.json())
    .then ((data) => {
    //do stuff with your data
    })
})
```

##### Success Response
```json
{
    "success": true,
    "message": "Requested dishes retrieved successfully.",
    "status": 200,
    "data": [{dish}, {dish}, {dish}]
}
```

##### Error Response
```json
{
    "success": false,
    "message": "The resources requested do not exist at the desired location.",
    "status": 404
}
```

#### Retrieving final order

`GET /orders/:id`

##### Sample Call

```javascript
fetch('http://localhost:3000/orders/:id')
    .then (res => res.json())
    .then ((data) => {
        //do stuff with your data
    })
})
```

##### Success Response

```json
{
    "success": true,
    "message": "Final order successfully recieved",
    "status": 200,
    "data":
    [
      {
        "menuItemId": "",
        "quantity": "1"
      }
    ]
}
```

##### Error Response

```json
{
    "success": false,
    "message": "The resources requested do not exist at the desired location.",
    "status": 404
}
```

### POST: 

#### Creating a new order

`POST /orders`

This endpoint allows you to create a new order.


##### Data Params
```json
{
    "name": "Ashley Coles",
    "firstLineOfAddress": "1 Widcombe Crescent",
    "postcode": "BA2 6AH",
    "email": "deliciousFood@food.com"
}
```

##### Sample Call

```javascript
fetch('http://localhost:3000/orders', {
        "method": "POST",
        "body": JSON.stringify(/* your data goes here */),
        "headers": {
            "content-type": "application/JSON"
        }
        .then (res => res.json())
        .then ((data) => {
            //do stuff with your data
        })
})
```    

##### Success Response
    
```json
{
    "success": true,
    "message": "Order created",
    "status": 200,
    "data": 
        [
            {
                "_id": "60c73afb0b5f5c23d4a61688",
                "name": "Ashley Coles",
                "firstLineOfAddress": "Melksham",
                "postcode": "BA2 6AH",
                "email": "deliciousFood@food.com"
            }
        ]
}
```

##### Error Responses

If the validator fails

```json
{
    "success": false,
    "message": "Validator failed",
    "status": 404
}
```

If the request fails to connect to the database


```json
{
    "success": false,
    "message": "Database request failed",
    "status": 404
}		
```

### PUT

#### Adding items to an order

// add an item, with any quantity, to an existing order `PUT /orders/addToOrder`

##### Data Params
	
```json
{
    "orderId": "60c73afb0b5f5c23d4a61688"
    "orderItems": 
        [
          {
            "menuItemId": "60c73afb0b5234f3d4a61688",
            "quantity": 4
          }
        ]
}
```
	
##### Sample Call
	
```javascript
fetch('http://localhost:3000/orders/addToOrder', {
    "method": "PUT",
    "body": JSON.stringify(/* your data goes here */),
    "headers": {
            "content-type": "application/JSON"
        }
    .then(res => res.json())
    .then((data) => {
        //do stuff with your data
    })
})
```
##### Success Response

```json
{
    "success": true,
    "message": "Dish successfully added to order",
    "status": 200
}
```
##### Error Response

```json
{
    "success": false,
    "message": "Dish not found so cannot add to order",
    "status": 404
}
```


### Edit quantities of dishes in orders

`PUT /orders/editQuantity`

##### Data Params

`orderId:` needs to be a string that represents a MongoDB ObjectID

`menuItemId:` needs to be a string that represents a MongoDB ObjectID

`quantity:` this is the number of items that have been selected
<br>(NOTE: this will replace the current quantity or any items with the same ID)

```json
{
  "orderId": "60c73afb0b5f5c23d4a61688",
  "menuItemId": "60c739e10b5f5c23d4a61684",
  "quantity": 7
}
```

##### Sample Call

```javascript
fetch('http://localhost:3000/orders/editQuantity', {
    "method": "PUT",
    "body": JSON.stringify(/* your data goes here */),
    "headers": {  
        "content-type": "application/JSON"
    }
    .then (res => res.json())
    .then ((data) => {
      //do stuff with your data
    })
})
```

##### Success Response

```json
{
    "success": true,
    "message": "Quantity updated successfully",
    "status": 200
}
```

##### Error Response
	
If the DB fails to update the dish quantity:
	
```json
{
    "success": false,
    "message": "Something went wrong with the database - please try again later",
    "status": 400
}
```
	
If the dish ID is incorrect:
	
```json
{
    "success": false,
    "message": "Dish not found - please check menuItemId",
    "status": 404
}
```


#### Removing an item (in any quantity) from an order

`PUT /orders/removeDish`

This endpoint allows you to remove an item entirely from an order.

##### Data Params

```json
{
   "_id": "60c73afb0b5f5c23d4a61688"
   "orderItems": [
     {
       "menuItemId": "60c73afb0b5f5c23d4a61689"
     }
   ]
}
```

##### Sample Call

```javascript
fetch('http://localhost:3000/orders/removeDish', {
    "method": PUT,
    "body": JSON.stringify(/* your data goes here */),
    "headers": {  
        "content-type": "application/JSON"
    }
    .then (res => res.json())
    .then ((data) => {
        //do stuff with your data
    })
 })
 ```

##### Success Response
```json
{
    "success": true,
    "message": "Dish successfully deleted from order",
    "status": 200,
}
```

##### Error Response
	
```json
{
    "success": false,
    "message": "Item not found so cannot be deleted from order",
    "status": 404
}
```

### Submit final order

`PUT /orders/submitOrder`

This endpoint will send your order to the restaurant and cannot be taken back. 

##### Data Params

```json
{
   "_id": "60c73afb0b5f5c23d4a61688"
}
```


##### Sample Call

```javascript
fetch('http://localhost:3000/orders', {
    "method": PUT,
    "body": JSON.stringify(/* your data goes here */),
    "headers": {  
        "content-type": "application/JSON"
    }
    .then (res => res.json())
    .then ((data) => {
        //do stuff with your data
    })
})
```

##### Success Response
```json
{
    "success": true,
    "message": "Order submitted",
    "status": 200,
    "data": [
                {
                    "_id": "60c73afb0b5f5c23d4a61688",
                    "name": "Ashley Coles",
                    "deliveryAddress": "BA2 6AH",
                    "email": "deliciousFood@food.com",
                    "isOrderSubmitted": true,
                    "timePlaced": "2000-01-01T00:00:00.000+00:00"
                    "orderItems": [{},{}]
                }
            ],
    "deliveryTime": "2000-01-01T00:00:00.000+00:00"
}
```

*this success response may change 

##### Error Response

```json
{
    "success": false,
    "message": "The resource/s requested does not exist at the desired location.",
    "status": 404
}
```
