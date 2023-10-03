module.exports = {writeValWaplaas};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')


function writeValWaplaas(data, ip,tag,mws){

  // console.log("waplaas control");
  // console.log(data);

var flag = setInterval(()=>{

  const socket = new net.Socket()
  const client = new Modbus.client.TCP(socket, 1, 5000)
  const options = {
  'host' : ip,
  'port' : 502
  };
 socket.connect(options);
  socket.on('connect', function () {

       client.writeMultipleRegisters(mws,[data]).then(()=>{
       socket.end();

        // console.log(data)
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


