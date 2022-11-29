Rydeu.com Nodejs Coding Challenge

Goal Your goal is to build a Nodejs API that Sends pickup and destination address via rest api to check price of ride between those address. Api ask user if they need to share email to check price for a ride from A to B. We will provide guidelines and feature requests below, but ultimately the design and functionality of your app is up to you. Keep in mind design and code quality is more important than final product usability.

Instructions ** How to Submit your challenge** Follow these instructions to submit your challenge.

Setup your Development Environment (Nodejs - Getting Started guide) Clone the Challenge Repository Create a dedicated branch Write your Code Commit your Changes Fork the Challenge Repository Issue a Pull Request

Please read through the rest of the requirements and additional info before working on your app.

If you are still having problems please email hr@rydeu.com.

You can use third party libraries, but the more code you write yourself, the better.

You have 3 days to submit your code, however we want to be respectful of your time and do not expect you to work for more than 3 hours on this challenge.

When you are finished please submit a .zip file with your entire project (node_modules included) to hr@rydeu.com.

Basic Requirements
Send pickup and destination address via rest api to check price of ride between those address with email as mandatory or option requirement from customer.
Build a pricing module and a rest api which return the status if customer need to fill email to check price.

⦁ build schema as per the snapshot. Pricing is based on the city. ⦁ Build rest api to determine user email requirement based on 3 logics. a. If distance is more than 30 km b. City flag is on (if the city is not flagged we will always ask email) c. Price if less than €50 ⦁ Use google geocoding api for distance matrices. User your own account or just use a mock endpoint to return some data(distance data in km or meter) ⦁ Api should return proper error code when payload is incorrect. (For distance more than 1000 km, response should be Too far to offer ride.) ⦁ Response should be only boolean [True, False] ( True: Email needed False: Email not needed)

cites: [Berlin, London, Paris, Barcelona, Amsterdam] Cities for which Email not needed: [Lodon, Paris]

country	city	vehicle types	Amount Airport fees	Amount Per hour	Amount Per KM	Base Amount	Base KM
GB	London	Economy	5	60	2	35	15
GB	London	Comfort	8	65	3	45	15
GB	London	Minivan	10	70	5	55	15
Bonus Features and Testing These features are absolutely not required, however if you finish your project early and wish to continue here are some ideas: a. add unit testing b. input test validation for address.
What will we evaluate? Code quality Usage of patterns Language skills Project structure
