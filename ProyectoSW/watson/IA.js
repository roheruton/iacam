

////base 64
//var fs= require("fs");
var base64ToFile = require('base64-to-file');

const VisualRecognitionV4 = require('ibm-watson/visual-recognition/v4');
const { IamAuthenticator } = require('ibm-watson/auth');
var fs = require('fs');
//const { resolve } = require('path');
const visualRecognition = new VisualRecognitionV4(
    {
    version: '2020-02-05'//5/2/2020 
    ,authenticator: new IamAuthenticator({//clave de la cuenta del grupo// apikey: 'J_FLM2BXQaO8vUl8uKcqvNW2ODtuPPpphJiJ-Mw_zdQu', carlos: 'mPmyhzibcxVZ-RqeXfu42QCr7VxLlJJdak9iO4KPJMej'//clave de mi cuenta :iHIqyXI9luwM7EJqiirESJqv2Qwaqe7giBa9mHmsS0bs
    apikey: 'mPmyhzibcxVZ-RqeXfu42QCr7VxLlJJdak9iO4KPJMej'
    })
    ,url:'https://api.us-south.visual-recognition.watson.cloud.ibm.com/instances/1e1619c4-a6ab-4adb-a7ca-b4a18bad6fe2' //'https://gateway.watsonplatform.net/visual-recognition/api','https://api.us-south.visual-recognition.watson.cloud.ibm.com/instances/98b82d5e-0534-40f7-b23e-7da3fea938c8'//'https://api.us-south.visual-recognition.watson.cloud.ibm.com/instances/6bbda3b3-d572-45e1-8c54-22d6ed9e52c2' 
    ,disableSslVerification: true
    });

    


class IaWatson{
constructor(){}

consultar2(imagen){
  console.log("Dentro del consultar")
  return new Promise((resolve , reject )=>
  { 
    const params = 
    {imagesFile: 
      [{  data: fs.createWriteStream(imagen+".png")
          ,contentType: 'image/png'          
      }] //mio:'d43688e9-955f-44c7-aec8-8def5194e636'// carlos: armasdefuego:'7dbe7129-f941-46ff-9f80-64363cf7c146', armas:'77a128b5-c9e2-4bdf-9c38-4019f1fc12f3'
      ,collectionIds: ['77a128b5-c9e2-4bdf-9c38-4019f1fc12f3']
      ,features: ['objects']
      ,threshold: 0.40
    }; console.log(params);
  visualRecognition.analyze(params).then(respuestawatson=>
    {//console.log(respuestawatson.headers);
      resolve({
                watson:respuestawatson.result
                ,ruta:imagen.split('js/')[1]
              });
    }).catch(err => {
    console.log('error: en visualRecognition.analyze(params) ProyectoSW IA.js')
    console.log('error:', err);
});   
  })
}

consultar3(imagen){
  console.log("dentro del consultar "+ imagen )
  return new Promise((resolve , reject )=>
  { 
    base64ToFile.convert(
      imagen
      ,imagen
      ,['jpg','jpeg','png']
      ,     
    function (filePath) {
      const params = {
        imagesFile: [
          {
            data: fs.createReadStream(filePath+".png"),
            contentType: 'image/png',
          }
        ],//mio:'d43688e9-955f-44c7-aec8-8def5194e636'// carlos: armasdefuego:'7dbe7129-f941-46ff-9f80-64363cf7c146', armas:'77a128b5-c9e2-4bdf-9c38-4019f1fc12f3'
        collectionIds: ['77a128b5-c9e2-4bdf-9c38-4019f1fc12f3'],
        features: ['objects'],
        threshold: 0.40
      };console.log(params);
      visualRecognition.analyze(params)
      .then(respuestawatson=>{
        resolve({watson:respuestawatson.result
                ,ruta:filePath.split('js/')[1]});
      })
      
   });   
  })
}

consultar(imagen){
  console.log("Dentro del consultar: "+imagen)
  return new Promise((resolve , reject )=>
  { //var rutaimagen = "C:/Users/rsuarezl/Desktop/SW/GroupProj/sw1/iacam/resources/imagenes/1.jpeg"
    
  const params = 
    { imagesFile: [
      { data: fs.createReadStream("./1.jpg"),
        contentType: 'image/jpeg',
      }
    ]   //mio:'d43688e9-955f-44c7-aec8-8def5194e636'// carlos: armasdefuego:'7dbe7129-f941-46ff-9f80-64363cf7c146', armas:'77a128b5-c9e2-4bdf-9c38-4019f1fc12f3'
      ,collectionIds: ['77a128b5-c9e2-4bdf-9c38-4019f1fc12f3']
      ,features: ['objects']
      ,threshold: 0.40
    }; //console.log(params);
  visualRecognition.analyze(params).then(respuestawatson=>
    {console.log("Dentro del analyze");
      console.log("RESPUESTAWATSON:");
      console.log(JSON.stringify(respuestawatson.result, null, 2));
      resolve({
                watson:respuestawatson.result
                ,ruta:imagen.split('js/')[1]
              });
    }).catch(err => {
    console.log('error: en visualRecognition.analyze(params) ProyectoSW IA.js')
    console.log('error:', err);
});   console.log("Fuera del analyze")
  })
}



}

module.exports = IaWatson;
