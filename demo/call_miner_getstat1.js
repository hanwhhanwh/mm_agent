const net = require("net");

let client = net.createConnection(33302, 'localhost', () => {
	//if the following response call does not permit to make the difference
	//between claymore and ethminer
	//a change can be done : claymore does not wait for \n whereas ethminer does
	client.write('{"id":0,"jsonrpc":"2.0","method":"miner_getstat1"}\n');
});


client.on('data', (data) => {
	try {
		var regexp = /\B(?=(\d{3})+(?!\d))/g;
		//console.log("RPC Data = " + data);
		const json = JSON.parse(data.toString());
		console.log("Ethminer Version = " + json.result[0]);
		console.log("Running Time = " + toCommaString(json.result[1]) + ' min');
		console.log("Total Hash = " + toCommaString(json.result[2].split(';')[0]) + ' KH');
		console.log("GPUs Hash = " + json.result[3]);
		console.log("GPUs Temp:Fan = " + json.result[6]);
		console.log("Pool Info = " + json.result[7]);
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
