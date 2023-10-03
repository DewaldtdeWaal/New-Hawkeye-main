


class alarmEmail{
  alarmName = []
  alarm=[[],[]]
  emailList=[]


  constructor(alarmName = [], alarm=[[],[]], emailList=[]){
    var now =  new Date();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();


    if(min == 0 || min == 10 || min == 20 || min == 30 || min == 40 || min == 50){

      var sendemailto=this.getEmailList(emailList)
      async function main() {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "mail.macautomation.co.za",
          port: 26,
          secure: false,
          auth: {
            user: 'dewaldt@macautomation.co.za',
            pass: "Beanstalk2022",
          },
          tls:{
            rejectUnauthorized:false
          }
        });

        let info = await transporter.sendMail({
          from: '"Dewaldt de Waal" <dewaldt@macautomation.co.za>',
          to: "dewaldt18@gmail.com",
          subject: "Hello ✔",
          text: "Hello world?",
          html: "<b>Hello world?<br>",
        });

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }

      main().catch(console.error);



    }
  }

 getEmailList(emailList=[]){

    var to = '';
    for(var i = 0; i < emailList.length; i++){
       to = emailList[i] + ',' + to;

       console.log(to);
    }

    return to


  }

}



alarmName = ["Fairview"];
alarmCondition=[[1],[1]];
emailList = ["dewaldt18@gmail.com"]




let car1 = new alarmEmail(alarmName, alarmCondition, emailList);

//This is all the people we aer sending the error report to



module.exports = {car1}
