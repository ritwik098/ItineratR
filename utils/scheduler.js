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

function parseYelp(obj, st, et) {
  if (obj == undefined)
    return null;
  var res = {
    name: obj.name,
    address: obj.location.display_address.join(', '),
    startTime: st,
    endTime: et,
    imageUrl: obj.image_url,
    rating: obj.rating,
    phone: obj.phone
  }
  return res;
}

function mToDate(m) {
  //return new Date(m.utcOffset('-6').format('YYYY-MM-DD HH:mm'));
  var res = moment(m);
  res.subtract(6, 'h');
  return res.toDate();
}

function schedule(start, end, city, cb) {
  var wakeHour = 10;
  var sleepHour = 23.5;
  var kph = 65;
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
        var prev = null;
        while (curTime.isBefore(end)) {
          var hour = curTime.hour();
          if (hour >= 12 && hour <= 14 && !meals.lunch) {
            meals.lunch = 1;
            var st = mToDate(curTime);
            curTime.add(45 + ~~(Math.random()*3)*15, 'm');
            var et = mToDate(curTime);
            var r = parseYelp(resturaunts.pop(), st, et);
            curTime.add(30, 'm');
            if (r)
              results.push(r);
          }
          else if (hour >= 18 && hour <= 21 && !meals.dinner) {
            meals.dinner = 1;
            var st = mToDate(curTime);
            curTime.add(45 + ~~(Math.random()*4)*15, 'm');
            var et = mToDate(curTime);
            var r = parseYelp(resturaunts.pop(), st, et);
            curTime.add(30, 'm');
            if (r)
              results.push(r);
          }
          else if (hour >= 21) {
            var st = mToDate(curTime);
            var et = moment(curTime)
            et.add(45 + ~~(Math.random()*3)*15, 'm')
            et = mToDate(et);
            var b = parseYelp(bars.pop(), st, et);
            curTime.add(5, 'h');
            curTime.hour(10);
            if (b)
              results.push(b);
            meals.lunch = 0;
            meals.dinner = 0;
          }
          else if (hour <= 6) {
            curTime.hour(11);
          }
          else {
            var p = places.pop();
            var oldTime = mToDate(curTime);
            curTime.add(90 + ~~(Math.random()*8)*15, 'm');
            var endTime = mToDate(curTime);
            curTime.add(30, 'm');
            if (p) {
              var place = {
                name: p.name,
                imageUrl: p.icon,
                address: p.formatted_address,
                startTime: oldTime,
                endTime: endTime,
                rating: p.rating,
                photo_reference: p.photo_reference
              }
              results.push(place);
            }
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
