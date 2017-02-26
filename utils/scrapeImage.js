var request = require('request');
var cheerio = require('cheerio');

function scrapeImage(cityName,cb){
	var name = '';
	for(var i=0 ;i<cityName.length;i++){
       	if(cityName[i] == ' ')
       		name += '-';
       	else
       		name += cityName[i];
    }
	request('https://www.pexels.com/search/'+name, function (error, response, html) {
      if(error){
        console.log(error);
      }
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        //console.log($.html());
        //console.log("page loaded");
        
        var contents = $('article').children().first().children('img').attr('src');
        //console.log(contents);
        var url = '';
        for(var i=0 ;i<contents.length;i++){
        	if(contents[i] == '?')
        		break;
        	url += contents[i];
        }
        console.log(url);
        cb(error,{url : url});
    
      }
    });
}

module.exports = {
	scrapeImage : scrapeImage
}