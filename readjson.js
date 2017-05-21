// Read Synchrously
var fs = require("fs");
console.log("\n ***START*** \n");
//READ JSON File
var content = fs.readFileSync("singlelines.json");
//PRINT file contents read
console.log("\n All content read from file: \n" + content);
//PARSE file into JSON object
var jsonContent = JSON.parse(content);
//PRINT whole JSON Object
console.log("\n Whole JSON Object, Printed using stringify() \n\n" + JSON.stringify(jsonContent));

//PRINT explicit name/value pair
console.log("\n First JSON name/value Pair: \n");
console.log("User Name: " + jsonContent[0].username);
console.log("Email: " + jsonContent[0].email);
console.log("Password: " + jsonContent[0].password);

//PRINT All name/value Pairs, using a for loop
console.log("\n All JSON name/value Pairs via for loop!! \n");
for(var i=0; i < jsonContent.length; ++i) {
	console.log("\nJSON Object # " + i);
	console.log("User Name: " + jsonContent[i].username);
	console.log("Email: " + jsonContent[i].email);
	console.log("Password: " + jsonContent[i].password);
}

/*
//JSONStream approach
console.log("\n JSONStream Approach!!! \n");
//var fs = require('fs'),
var JSONStream = require('JSONStream');
var es = require('event-stream');

var getStream = function () {
    var jsonData = 'singlelines.json',
        stream = fs.createReadStream(jsonData, {encoding: 'utf8'}),
        parser = JSONStream.parse('*');
        return stream.pipe(parser);
};
getStream()
  .pipe(es.mapSync(function (data) {
    console.log(data);
  }));
*/

//Read JSON File ONE LINE AT A TIME
console.log("\n ONE LINE AT A TIME for JSON file parsing!!! \n");
//var fs = require('fs');
var readline = require('readline');
//var stream = require('stream');

var instream = fs.createReadStream('products-short.json');
//var outstream = new stream();
var rl = readline.createInterface({
	input: instream,
	terminal: false
});

rl.on('line', function(line) {
	console.log("\n ***PRINTING ANOTHER LINE*** \n");
	console.log("this is a line => " + line);
	if (line.charAt(0) === "[") {
		line = line.substr(1, line.length);
		}
	if (line.charAt(line.length-1) === ",") {
		line = line.substr(0, ((line.length)-1));
		}
	if (line.charAt(line.length-1) === "]") {
		line = line.substr(0, ((line.length)-1));
		}
	console.log("\nthis is a ***PRUNED*** line => " + line);
	//Parse line into a JSON object
	jsonContent = JSON.parse(line);
	console.log("\nsku: " + jsonContent.sku +"\n" + "name: " + jsonContent.price + "\n");
	console.log("\nCategory Info: \n");
	var consoleMessage = '';
	for(var i=0; i < jsonContent.category.length; ++i) {
		//console.log(" >>> " + jsonContent.category[i].id + " : " + jsonContent.category[i].name);
		//console.log(" >>> " + jsonContent.category[i].name);		
		consoleMessage += " >>> ";
		consoleMessage += jsonContent.category[i].name;		
	}
	console.log(consoleMessage);
//	console.log("\nThis is a line from a JSON Object: \n" + jsonContent[0]);
//	console.log("User Name: " + jsonContent.username);
//	console.log("Email: " + jsonContent.email);
//	console.log("Password: " + jsonContent.password);
});

rl.on('close', function() {
  console.log("\n ***FINISHED*** \n");
});
  
console.log("\n ***END*** \n");
  
/*
//Process one JSON element at a time
var JSONStream = require('JSONStream');
var  es = require('event-stream');
var fileStream = fs.createReadStream('./', {encoding: 'utf8'});
        fileStream.pipe(JSONStream.parse('singlelines.json')).pipe(es.through(function (data) {
            console.log('printing one customer object read from file ::');
            console.log(data);
            //this.pause();
            //processOneCustomer(data, this);
            return data;
        },function end () {
            console.log('stream reading ended');
            this.emit('end');
          }));

//    function processOneCustomer(data,es) {
//		console.log("The data: " + data);
//     //DataModel.save(function(err,dataModel){
//     es.resume();
//    }
*/
