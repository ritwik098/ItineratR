var request = require('request');
var azureKey = require('../config/config.js').azureKey;

function predictCities(user, cb) {
  var url = "https://ussouthcentral.services.azureml.net/workspaces/595c9b3f9b72441cacb5d135399f6856/services/8355b9ebb4dd4e84bf0382448e7ec31f/execute?api-version=2.0&format=swagger"
  var payload = {
    "Inputs": {
      "input1": [
        {
          "Age": user.age,
          "Group Size": user.groupSize,
          "Location": ""
        }
      ]
    },
    "GlobalParameters": {}
  };

  request({
    url: url,
    auth: {
      'bearer': azureKey
    },
    method: 'POST',
    body: payload,
    json: true
  }, function(err, res, body) {
    cb(err, body);
  });
}

module.exports = {
  predictCities: predictCities
}