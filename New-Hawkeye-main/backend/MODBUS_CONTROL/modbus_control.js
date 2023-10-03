module.exports = {writeVal};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')


function writeVal(data1,data2, ip,tag,mws){

var flag = setInterval(()=>{

  const socket = new net.Socket()
  const client = new Modbus.client.TCP(socket, 1, 5000)
  const options = {
  'host' : ip,
  'port' : 502
  };
 socket.connect(options);
  socket.on('connect', function () {

       client.writeMultipleRegisters(mws,[data1,data2]).then(()=>{
       socket.end();

        // console.log(data1)
        // console.log(data2)
        gvar[tag]=1
        // console.log("Succesfull")
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


