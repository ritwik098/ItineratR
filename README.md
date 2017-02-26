# Itineratr

ItineratR is an itinerary creation website that helps people of all ages find, plan, and enjoy their vacations. Simply enter your origin, age, budget, departure date, and return date and Itineratr will give you a variety of popular vacations and itineraries for you to choose from. These itineraries are either generated for you based on the information you provide, or are submitted by other users who are local planners in the areas you might want to vacation in. The goal of our project is to make planning vacations with fixed budget fast, easy, and enjoyable.
 - Users input budget, where they are travelling from, travelling party size, etc...
 - User details are processed through a machine learning (random forest) classifier to recommend travel destinations
 - Various APIs, including Amadeus, Google Places, and Yelp, are leveraged to gather details about flight, hotels, food, etc.
 - Users can create itineraries for their local areas to share with others

## Getting Started

To deploy this project on your own machine, you need a few dependencies installed. First, this is a Node.js project so you need [Node.js](https://nodejs.org/en/) installed.

You also need to acquire API keys from the following services, then place them in the config/config.js file.
 - [Amadeus API](https://sandbox.amadeus.com/api-catalog)
 - [Google Place API](https://developers.google.com/places/ios-api/start)
 - [Yelp API](https://www.yelp.com/developers/documentation/v2/overview)
 - [SITA AIRPORT API](https://www.developer.aero/Airport-API/API-Overview)

To enable the recommender system, a [Microsoft Azure](https://azure.microsoft.com/en-us/downloads/) api key needs to be placed in config.js

For the database, we are using [MongoDB](https://docs.mongodb.com/manual/installation/). Make sure this is installed on your machine and that the `mongod` process is running

Once all the above dependencies have been met, run the following to start the server on port 3000

```sh
$ npm install
$ npm start
```

navigate to [localhost:3000](localhost:3000) to test out the website

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Built With

 - [Node.js](https://nodejs.org/en/)
 - [Microsoft Azure](https://azure.microsoft.com/en-us/downloads/)
 - [AngularJS](https://docs.angularjs.org/misc/started)
 - [MongoDB](https://docs.mongodb.com/manual/installation/)
 - [Amadeus API](https://sandbox.amadeus.com/api-catalog)
 - [Google Maps API](https://developers.google.com/api-client-library/python/start/installation)
 - [Google Place API](https://developers.google.com/places/ios-api/start)
 - [Yelp API](https://www.yelp.com/developers/documentation/v2/overview)
 - [SITA AIRPORT API](https://www.developer.aero/Airport-API/API-Overview)

## Running the tests
Make sure [mocha](https://mochajs.org/) is installed on your machine. You can install with
```sh
$ npm install -g mocha
```

Once mocha is installed, just run `mocha` in the root directory of the project to execute all of the tests

## Deployment

For live deployment, make sure that the appropriate environmental variables are set for Node.js live production. In particular, check that `NODE_ENV` and `PORT` are set on your machine.

For a live MongoDB database, make sure the connection string in config.js is set with the proper credentials and that the Mongo user has enough permissions to read and write from the database.

Depending on your cloud hosting service they may ask for a command to start the server, the command for this project is simply

```sh
node bin/www
```

## Contributing

Please read [CONTRIBUTING.md](https://github.com/ritwik098/HackIllinois2017/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **[JJ Xu](https://github.com/jc3m)**
* **[Ritwik Bhardwaj](https://github.com/ritwik098)**
* **[Nisarg Kolhe](https://github.com/nisargkolhe)**
* **[Sabharsh Singh Sidhu](https://github.com/sabharsh)**
* **[Rahul Surti](https://github.com/rahulsurti97)**
* **[Noah Lebovic](https://github.com/xvobl)**
* **[Nick Horcher](https://github.com/nhorcher)**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* We would like to thank the Hack Illinois staff for a great hackathon and inspiring the creation of many open-source projects like this one.
* A special thank you to the mentors for all their help
