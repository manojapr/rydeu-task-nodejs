# rydeu-task-nodejs-yash



For testing use:-
npm install

Post request with body(Price) :-
1. https://rydeu-task-nodejs-yash.herokuapp.com/api/user/price ( deployed link on heroku)
2. http://localhost:8080/api/user/price <br>
{
    "pickup": "london", <br>
    "destination": "paris"
}
   
   
Post request with body(register) :- 
1. https://rydeu-task-nodejs-yash.herokuapp.com/api/user/register ( deployed link on heroku)
2. http://localhost:8080/api/user/register <br>
{
    "countryCode": "NL", <br>
    "city": "amsterdam", <br>
    "vehicleTypes": "Economy", <br>
    "amountAirportFees": 0.123, <br>
    "amountPerHour": 60, <br>
    "amountPerKM": 1.35, <br>
    "baseAmount": 55, <br>
    "baseKM": 10 <br>
}
