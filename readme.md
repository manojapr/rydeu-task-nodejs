# Introduction:-  
### As I have not used the GeoMatric Api in this project hence i've take taken some dummy data.
### Defined cities are :-
### Bihar,Delhi,Boston have taken  only three cities to work on as an sample
### Where as Boston Does not come under the Flag Cities.
# Functions:-
### - Api will only return the Boolean value wheather to ask for email or not from the customer to display the price. _where True means to ask for email and False means not to ask for email_.
### - Api will return _too Far_ if the price is more than 5000,istead of Kms i've used price as a parameter to check the distance.
### - Api will return true if city is not in the Flag Cities
### - if Price is below 1000 then email is not required it will return false.
### - For any confusion contact me on vibhupandey.vp@gmail.com

# For testing use:-
```javascript
npm install
```
## Post request with body:-
### localhost:5000/price
```json
{
    "pickUp": "Bihar",
    "drop": "Delhi"
}
```
