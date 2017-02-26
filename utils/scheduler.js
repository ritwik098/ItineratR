var gmaps = require('./googleMaps');
var yelp = require('./yelp');
var moment = require('moment');

function shuffleArray(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    var j = ~~(Math.random() * (arr.length - (i+1)) + i + 1);
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function daysBetween(firstDate, secondDate) {
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
}

function parseYelp(obj) {
  var res = {
    name: obj.name
  }
  return res;
}

function schedule(start, end, city, cb) {
  var wakeHour = 10;
  var sleepHour = 23.5;
  gmaps.getPointsOfInterest({ cityName: city }, function(err, body) {
    if (err)
      return cb(err);
    var places = body.results;
    places = shuffleArray(places);

    yelp.getBars({
      location: city,
      limit: (daysBetween(start, end) + 1)
    }, function(err, bars) {
      if (err)
        return cb(err);
      bars = shuffleArray(bars.businesses);

      yelp.getResturaunts({
        location: city,
        limit: (daysBetween(start, end) + 1) * 2
      }, function(err, resturaunts) {
        if (err)
          return cb(err);
        var results = [];
        resturaunts = shuffleArray(resturaunts.businesses);
        var meals = {
          lunch: 0, // 12PM - 2PM
          dinner: 0 // 7PM - 10PM
        }
        var curTime = moment(start).startOf('hour');
        while (curTime.isBefore(end)) {
          var hour = curTime.hour();
          if (hour >= 12 && hour <= 14 && !meals.lunch) {
            meals.lunch = 1;
            curTime.add(45 + ~~(Math.random()*3)*15, 'm');
            var r = parseYelp(resturaunts.pop());
            results.push(r);
          }
          else if (hour >= 18 && hour <= 21 && !meals.dinner) {
            meals.dinner = 1;
            curTime.add(45 + ~~(Math.random()*4)*15);
            var r = parseYelp(resturaunts.pop());
            results.push(r);
          }
          else if (hour >= 21) {
            var b = parseYelp(bars.pop());
            curTime.add(5, 'h');
            curTime.hour(10);
            results.push(b);
            meals.lunch = 0;
            meals.dinner = 0;
          }
          else if (hour <= 6) {
            curTime.hour(11);
          }
          else {
            var p = places.pop();
            var oldTime = curTime.toDate();
            curTime.add(90 + ~~(Math.random()*8)*15, 'm');
            var endTime = curTime.toDate();
            var place = {
              name: p.name,
              imageUrl: p.icon,
              address: p.formatted_address,
              startTime: oldTime,
              endTime: endTime
            }
            results.push(place);
          }
        }
        cb(null, results);
      });
    });
  });
}

module.exports = {
  schedule: schedule
}
