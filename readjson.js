// Read Synchrously
var numberOfBadRowsInInputFile = 0;
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
	try {
		jsonContent = JSON.parse(line);
	} catch (ex) {
		// Handle error if possible
		++numberOfBadRowsInInputFile;
		console.log("\n");
		console.log("**********************************************");
		console.log("**********************************************");
		console.log("**********************************************");		
		console.log("     >>>>> Encountered a BAD ROW <<<<<<       ");
		console.log("**********************************************");
		console.log("**********************************************");
		console.log("**********************************************");		
	}
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
  if (numberOfBadRowsInInputFile > 0) {
		console.log("\n\n\n***********************");
		console.log("Number of Bad Formatted Rows in JSON file:");
		console.log(">>>>>>> # " + numberOfBadRowsInInputFile + " <<<<<<<<<");
		console.log("***********************\n\n\n");
  }
});
  
console.log("\n ***END*** \n");
  
