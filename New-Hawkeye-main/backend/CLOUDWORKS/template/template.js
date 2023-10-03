//Serves as a basic template for all future sites.

module.exports = {function_readval };
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
const fun = require('./cloudworksfunctions')


//Get IP address from Daniel
var ip = ''
var regStart = 0;
//Amount of Memorywords you have
var regNum = 22;
var connected = 0;
var init = 0
var error = 0
var poll = 0;
var pollEnd = 1;

var timeout = 2000;

//Input function Name

function function_readval(){
  error =0;
  const socket = new net.Socket()
  const Function_CLIENT = new Modbus.client.TCP(socket, 2, timeout)


  const options = {
  'host' : ip,
  'port' : 502
  };
  if(connected == 0 ){

  socket.connect(options);
  console.log("connecting")
  }









    socket.on("connect", function() {
      connected = 1;

      console.log("connected")
      if (init == 0){
      readval1()
      init = 1;
    }




 function readval1(){

  if(poll == 0){
    Function_CLIENT
    .readInputRegisters(regStart,regNum)
    .then(function(resp) {
       gvar.ps_storms_array = (resp.response._body.values);


    })

  }

  if(error == 1){

    init=0
    error= 0;
    connected = 0;
      setTimeout( function_readval, 10000)


   }else
   {
    poll++;
    if(poll ==  pollEnd)
    {
      poll = 0;
    }
    setTimeout(readval1, 10000);
  }
  }
})

socket.on("error", function(){

console.log("Error 2")
  init=0
  error= 0;
  connected = 0;

    setTimeout(function_readval, 10000)








});


}
