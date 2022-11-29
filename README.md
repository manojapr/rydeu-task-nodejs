# rydeu-task-nodejs-yash



For testing use:-
npm install

Post request with body(Price) :-
1. https://rydeu-task-nodejs-yash.herokuapp.com/api/user/price ( deployed link on heroku)
2. http://localhost:8080/api/user/price <br>
{
    "pickup": "london",
    "destination": "paris"
}
   
   
Post request with body(register) :- 
1. https://rydeu-task-nodejs-yash.herokuapp.com/api/user/register ( deployed link on heroku)
2. http://localhost:8080/api/user/register
{
    "countryCode": "NL",
    "city": "amsterdam",
    "vehicleTypes": "Economy",
    "amountAirportFees": 0.123,
    "amountPerHour": 60,
    "amountPerKM": 1.35,
    "baseAmount": 55,
    "baseKM": 10
}
