/*-- variable --*/
var mNum = [0,128,192,224,240,248,252,254,255];
var option = {};
var ipAddress = "";
var subnet = 0;
var subnetMask = "";
var ipAddressPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ ;
var ipSplit = {};
var ipInt = {};
var ipBin = {};
var subnetMaskSplit = {};
var subnetMaskBin = {};
var integerId = 0;
var ipClass = "";

/*-- dom sentinal --*/
domready();

function domready(){
    getNetworkClass();
    calculateResult();  
}

/*--- ui helper ---*/

function calculateResult() {
    document.getElementById("calculate-button").onclick = function() {
        if(getData()){
            setIpAddress();
            setTotalHostsAndUsableHosts();
            setBinarySubnetMask();
            setIntegerId();
            setBinaryID();
            setHexID();
            setCIDRNotation();
            setShort();
            setSubnetMask();
            setWildCardMask();
            setIpClass();
            setIpType();
            loadPossibleSubnet();
        }
    };
}

function generateSubnetFromNetWorkClass(networkClass){
    var s =[0,0,0,0];    
    for (var j = 0; j < s.length; j++){
        for(var i = 1; i <= 8; i++){
            s[j] = mNum[i];
            var cidr = (j*8) + i;
            option[cidr] = s[0].toString() + "." + s[1].toString() + "." + s[2].toString() + "." + s[3].toString() + "/" + cidr.toString();           
        }
    }
}

function addToSubnet(networkClass){    
    removeOldOption();    
    var stop = 1;
    if(networkClass === "A"){
        stop = 8;
    }
    else if(networkClass === "B"){
        stop = 16;
    }
    else if(networkClass === "C"){
        stop = 24;
    }
    else if(networkClass === "any"){
        stop = 1;
    }
    for (var i = 32; i >= stop; i--){
        var opt = document.createElement("option");
        opt.name = "select-cidr";
        opt.value = i;
        var textNode = document.createTextNode(option[i]);
        opt.appendChild(textNode);
        document.getElementById("choose-subnet-id").appendChild(opt);
    }
}

/*-- getter --*/
   
function getData() {
    if(getSubnet() && getIp()){
        splitIp();
        splitSubnet();
        if(ipSplit !== {} && subnetMaskSplit !== {}){
            getIpClass();
            return true;
        }        
    }    
    return false;
}

function getNetworkClass(){
    var rad = document.getElementsByName("networkclass");
    for(var i = 0; i < rad.length; i++) {
        rad[i].onclick = function() {    
            generateSubnetFromNetWorkClass(this.value); 
            addToSubnet(this.value);                    
        };
    }
}

function getIp() {
    var node = document.getElementById("get-ipaddress-id");    
    if(checkValidateIPaddress()){
        ipAddress = node.value;
        return true;
    }
    return false;
}

function getSubnet() {
    var node = document.getElementById("choose-subnet-id");
    if(node.value === "none"){
        alert("You have to select a subnet!"); 
        return false;
    }
    else {
        subnet = parseInt(node.value);
        subnetMask = option[subnet];
    }
    return true;
}

function splitIp(){
    if(ipAddress !== ""){
        var ipArray = ipAddress.split(".");
        for(var i = 0; i < ipArray.length; i++){
            ipSplit[i+1] = parseInt(ipArray[i]);
            ipBin[i+1] = padbinary((+ipSplit[i+1]).toString(2), 8);       
        }
        integerId = parseInt((ipBin[1] + ipBin[2] + ipBin[3] + ipBin[4]), 2);
    }
}

function splitSubnet() {
    if(subnetMask !== ""){
        var subnetArray = subnetMask.split(".");
        for (var i = 0; i < subnetArray.length; i++){
            subnetMaskSplit[i+1] = parseInt(subnetArray[i]);
            subnetMaskBin[i+1] = padbinary((+subnetMaskSplit[i+1]).toString(2), 8);
        }
    }
}

function getIpClass() {
    if(ipSplit[1] >= mNum[0] && ipSplit[1] < mNum[1]){
        ipClass = "A"
    }
    else if(ipSplit[1] >= mNum[1] && ipSplit[1] < mNum[2]){
        ipClass = "B"
    }
    else if(ipSplit[1] >= mNum[2] && ipSplit[1] < mNum[3]){
        ipClass = "C"
    }
    else if(ipSplit[1] >= mNum[3] && ipSplit[1] < mNum[4]){
        ipClass = "D"
    }
    else if(ipSplit[1] >= mNum[4] && ipSplit[1] < mNum[8]){
        ipClass = "E"
    }
    else {
        ipClass = "none"
    }
}

/*------ setter ----*/

function setIpAddress(){
    document.getElementById("set-ip-address").innerHTML = ipAddress;
}

function setBinaryID() {
    document.getElementById("set-binary-id").innerHTML = "0b" + (ipBin[1] + ipBin[2] + ipBin[3] + ipBin[4]);
}

function setIntegerId() {
    document.getElementById("set-integer-id").innerHTML = integerId.toString();
}

function setHexID() {
    document.getElementById("set-hex-id").innerHTML = "0x" + parseInt((ipBin[1] + ipBin[2] + ipBin[3] + ipBin[4]), 2).toString(16);
}

function setCIDRNotation() {
    document.getElementById("set-cidr-notation").innerHTML = "/" + subnet.toString();
}

function setShort() {
    document.getElementById("set-short").innerHTML = ipAddress.toString() + "/" + subnet.toString();
}

function setSubnetMask(){
    document.getElementById("set-subnet-mask").innerHTML = (subnetMask.split("/"))[0];
}

function setBinarySubnetMask(){    
    document.getElementById("set-binary-subnet-mask").innerHTML = subnetMaskBin[1] + "." + subnetMaskBin[2] + "." + subnetMaskBin[3] + "." + subnetMaskBin[4];
}

function setWildCardMask(){
    document.getElementById("set-wildcard-mask").innerHTML = (255-subnetMaskSplit[1]).toString() + "." + (255-subnetMaskSplit[2]).toString() + "." + (255-subnetMaskSplit[3]).toString() + "." + (255-subnetMaskSplit[4]).toString();
}

function setIpClass(){    
    document.getElementById("set-ip-class").innerHTML = ipClass;
}

function setIpType(){
    var ipType;
    if(ipSplit[1] === 10 || (ipSplit[1] === 172 && ipSplit[2] >= 16 && ipSplit[2] <= 31) || (ipSplit[1] === 192 && ipSplit[2] === 168) ){
        ipType = "Private"
    }
    else {
        ipType = "Public"
    }
    document.getElementById("set-ip-type").innerHTML = ipType;
}

function setSubnetRangeInResult(net, range, broadcast) {
    document.getElementById("set-network-address").innerHTML = net;
    document.getElementById("set-usable-host").innerHTML = range;
    document.getElementById("set-broadcast-address").innerHTML = broadcast;
}

function setTotalHostsAndUsableHosts(){
    if(subnet <= 32 && subnet > 0){
        var total = parseInt(Math.pow(2, (32-subnet)));
        document.getElementById("set-total-hosts").innerHTML = total.toString();
        if(total <= 2){
            var usable = 0;
        }
        else{
            var usable = total - 2;
        }
        document.getElementById("set-num-of-usable-hosts").innerHTML = usable.toString();     
    }
}

/*---- table geterator ----*/

function loadPossibleSubnet() {
    var container = document.getElementById("possible-subnet-container");
    var possibleSubnetHeader = document.createElement("h1");    
    while (container.childElementCount > 0) {
        container.removeChild(container.lastChild);
    }
    possibleSubnetHeader.className ="text-center";
    container.appendChild(possibleSubnetHeader);
    possibleSubnetHeader.innerHTML = "All Possible /" + subnet.toString() + " Network";
    
    var possibleSubnetTable = document.createElement("table");
    container = document.getElementById("possible-subnet-table");
    while (container.childElementCount > 0) {
        container.removeChild(container.lastChild);
    }
    possibleSubnetTable.className = "table table-striped table-bordered table-sm";
    var thead = document.createElement("thead");
    var tbody;
    
    // add thead here
    thead.innerHTML = "<tr><th>Network Address</th><th>Usable Host Range</th><th>Broadcast Address</th></tr>"
    
    // add tbody here
    var tbody = genSubnetTable();
    
    possibleSubnetTable.appendChild(thead);
    possibleSubnetTable.appendChild(tbody);
    container.appendChild(possibleSubnetTable);
}


function genSubnetTable() {
    var start = 0;
    var stop = 0;
    var step = 0;
    var tbodyNode = document.createElement("tbody");    
    
    if (subnet >= 1 && subnet < 8){
        start = parseInt(("00000000" + "00000000" + "00000000" + "00000000"), 2);
        stop = parseInt(("11111111" + "11111111" + "11111111" + "11111111"), 2);
    }
    else if (subnet >= 8 && subnet < 16){
        start = parseInt((ipBin[1] + "00000000" + "00000000" + "00000000"), 2);
        stop = parseInt((ipBin[1] + "11111111" + "11111111" + "11111111"), 2);
    }
    else if (subnet >= 16 && subnet < 24){
        start = parseInt((ipBin[1] + ipBin[2] + "00000000" + "00000000"), 2);
        stop = parseInt((ipBin[1] + ipBin[2] + "11111111" + "11111111"), 2);
    }
    else if (subnet >= 24 && subnet <= 32){
        start = parseInt((ipBin[1] + ipBin[2] + ipBin[3] + "00000000"), 2);
        stop = parseInt((ipBin[1] + ipBin[2] + ipBin[3] + "11111111"), 2);
    }
    
    step = parseInt(Math.pow(2, 32 - subnet));
    
    var netAddress = 0;
    var broadcast = 0;
    var range1 = 0;
    var range2 = 0;
    var netAddressIpformat = "";
    var broadcastIpformat = "";
    var range1BinIpformat = "";
    var range2BinIpformat = "";
    
    for (var i = start; i <= stop; i += step) {
        netAddress = i;
        broadcast = i + step - 1;
        range1 = netAddress + 1;
        range2 = broadcast - 1;
        netAddressIpformat = binToIpFormat(padbinary((+netAddress).toString(2), 32));
        broadcastIpformat = binToIpFormat(padbinary((+broadcast).toString(2), 32));
        range1BinIpformat = binToIpFormat(padbinary((+range1).toString(2), 32));
        range2BinIpformat = binToIpFormat(padbinary((+range2).toString(2), 32));
        if( integerId >= netAddress && integerId <= broadcast){
            
            setSubnetRangeInResult(netAddressIpformat, range1BinIpformat + " - " + range2BinIpformat, broadcastIpformat);
        }
        var trNode = document.createElement("tr");
        trNode.innerHTML = "<td>" + netAddressIpformat + "</td><td>" + range1BinIpformat + " - " + range2BinIpformat +"</td><td>" + broadcastIpformat + "</td>";
        tbodyNode.appendChild(trNode);
    }
    
    return tbodyNode;
}

/*--- helper ---*/

function binToIpFormat(bin) {
    var ip1 = parseInt((bin.substring(0, 8)), 2).toString();
    var ip2 = parseInt((bin.substring(8, 16)), 2).toString();
    var ip3 = parseInt((bin.substring(16, 24)), 2).toString();
    var ip4 = parseInt((bin.substring(24, 32)), 2).toString();
    return ip1 + "." + ip2 + "." + ip3 + "." + ip4;
}

function padbinary(bin, size) {
    while (bin.length < size) {
        bin = "0" + bin;
    }
    return bin;
}

function checkValidateIPaddress(){  
    var node = document.getElementById("get-ipaddress-id");
    if(ipAddressPattern.test(node.value)){
        return true;        
    }
    alert("Prese check your Ip Address!"); 
    return false;
}

function removeOldOption() {
    var node = document.getElementById("choose-subnet-id");
    while (node.childElementCount > 1) {
        node.removeChild(node.lastChild);
    }
}