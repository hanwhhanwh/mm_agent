const net = require("net");

let client = net.createConnection(33303, 'localhost', () => {
	//if the following response call does not permit to make the difference
	//between claymore and ethminer
	//a change can be done : claymore does not wait for \n whereas ethminer does
	client.write('{"id":0,"jsonrpc":"2.0","method":"miner_getstat1"}\n');
});


client.on('data', (data) => {
	try {
		var regexp = /\B(?=(\d{3})+(?!\d))/g;
		console.log("RPC Data = " + data);
		const json = JSON.parse(data.toString());
		console.log("Ethminer Version = " + json.result[0]);
		// console.log("Running Time = " + parseInt(json.result[1], 10).toString(),replace(regexp, ",") + ' min');
		// console.log("Total Hash = " + parseInt(json.result[2].split(';')[0], 10).toString().replace(regexp, ",") + ' KH');
		console.log("Running Time = " + json.result[1].replace(regexp, ",") + ' min');
		console.log("Total Hash = " + json.result[2].split(';')[0].replace(regexp, ",") + ' KH');
		console.log("Test = " + toCommaString(123456789));
		console.log("Test = " + toCommaStringF(123456789.1234567));
    	//console.dir (json);
	}catch(e) {
		console.log(e.stack);
	}

	client.destroy(); // kill client after server's response
});


client.on('error', (error) => {
});


client.on('close', () => {
});


function toCommaString( number ) {
	var regexp = /\B(?=(\d{3})+(?!\d))/g;
	return number.toString().replace( regexp, ',' );
}


function toCommaStringF( number ) {
	var number_string = number.toString();
	var number_parts = number_string.split('.');
	var regexp = /\B(?=(\d{3})+(?!\d))/g;
	if (number_parts.length > 1) {
		return number_parts[0].replace( regexp, ',' ) + '.' + number_parts[1];
	}
	else {
		return number_string.replace( regexp, ',' );
	}
}
