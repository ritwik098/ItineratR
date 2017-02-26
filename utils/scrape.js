var request = require('request');
var cheerio = require('cheerio');
var database = require('./iata.js').iataDatabase;

//for(var k = 65 ; k<=90;k++){    
    request('https://en.wikipedia.org/wiki/List_of_airports_by_IATA_code:_D', function (error, response, html) {
      if(error){
        console.log(error);
      }
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        //console.log($.html());
        //console.log("page loaded");
        //var contents = $('#mw-content-text').children('table').eq(0).find('tbody').first().children('tr');
        var contents = $('#mw-content-text').children('table').eq(0).children('tr');
        //console.log($(contents).html());
        $(contents).each(function(i,elem){
            //console.log($(this).html());
        	if(!($(this).hasClass('sortbottom')) && i!=0){
        		//console.log($(this).children('td').eq(0).text()+"  ,  "+$(this).children('td').eq(3).children('a').eq(0).text()+"  ,  "+$(this).children('td').eq(3).children('a').eq(1).text());
                var json = {
                    code : $(this).children('td').eq(0).text(),
                    city : $(this).children('td').eq(3).children('a').eq(0).text(),
                    country : $(this).children('td').eq(3).children('a').eq(1).text()
                }
                console.log(json);
                console.log(',');
        	}
        });

      }
    });
//}