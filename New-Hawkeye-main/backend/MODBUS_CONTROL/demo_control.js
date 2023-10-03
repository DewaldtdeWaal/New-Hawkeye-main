module.exports = {writeVal};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')


function writeVal(data1, ip,tag,mws){

var flag = setInterval(()=>{

  const socket = new net.Socket()
  const client = new Modbus.client.TCP(socket, 1, 5000)
  const options = {
  'host' : ip,
  'port' : 502
  };
 socket.connect(options);
  socket.on('connect', function () {

       client.writeMultipleRegisters(109,[data1]).then(()=>{
       socket.end();


        gvar[tag]=1

        clearInterval(flag)
       })
       .catch(function() {

                  console.error(
                    require("util").inspect(arguments, {
                      depth: null
                    })
                  );

                });
    });

    socket.on("error", function(){});


},10000)


  }

