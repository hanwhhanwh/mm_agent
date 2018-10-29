const net = require("net");
const ethminer = require("../lib/ethminer_api");

console.log("123456789 = " + ethminer.toCommaString("123456789"));

ethminer.callMinerGetStat1();