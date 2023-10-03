//Serves as a basic template for all future sites.

module.exports = {readVal_test };
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
const fun = require('./modbusfunctions')


//Get IP address from Daniel
var ip = gvar.mbusIP +'.28';
var regStart = 103;
//Amount of Memorywords you have
var regNum = 22;
var connected = 0;
var init = 0
var error = 0
var num = 1;

var timeout = 3000;

//Input function Name

function readVal_test(){
  error =0;
  const socket = new net.Socket()
  const client = new Modbus.client.TCP(socket, 1, timeout)
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
        client
          .readHoldingRegisters(regStart,regNum)
          .then(function(resp) {
            var val = (resp.response._body.values);




    /////////////////////////////////////////////Input code

            gvar.oli_lvl = (val[0]/10).toFixed(1);
            gvar.oli_ut=Date().slice(4,Date().length-41);

            num = num + 1







             })
             .catch(function() {
              console.error(
                require("util").inspect(arguments, {
                  depth: null
                })
              );

              error = 1



              console.log("Error")

            });
           if(error == 1){

            init=0
            error= 0;
            connected = 0;
              setTimeout( readVal_test, 10000)


           }else
           {
            setTimeout(readval1, 10000);
          }
          }
      })

      socket.on("error", function(){

        console.log("Error 2")
          init=0
          error= 0;
          connected = 0;

            setTimeout( readVal_test, 10000)








    });


  }




//Make sure this matches the method Name






