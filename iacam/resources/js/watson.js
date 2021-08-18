
var request = new XMLHttpRequest();
const imagen = document.querySelector('#imagen');
//var dirimg = './resources/imagenes/1.jpg'  
//var xhttp = new XMLHttpRequest();
  //          xhttp.onreadystatechange = function() {
    //            if (this.readyState == 4 && this.status == 200) {
                    // Typical action to be performed when the document is ready:
                    //console.log(xhttp.responseText)
                    //document.getElementById("name").innerHTML = '';
        //        }   
      //      };

      function sendmsg(){

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                console.log(xhttp.responseText)
                //document.getElementById("name").innerHTML = '';
            }   
        };
        xhttp.open("GET", 'http://localhost:8080/cgi-bin/webpy.py', true);
        xhttp.send();
    }

 function obtener(){

 //xhttp.open('GET', 'http://localhost:3000/iacam/resources/js'+
  //'/webpy.py', true);
    //        xhttp.send();
     //request.open('POST', 'http://localhost:4202/droid');
     request.open('GET', "http://localhost:3000/iacam/resources/js/webpy.py", true);
     request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
     request.onload = function() {
      console.log(this.response)
       var data = JSON.parse(this.response);
       let dtt = JSON.parse(this.response)
      //console.log(data.ruta)
      //console.log(data.watson.images[0].objects.collections[0].objects[0].objects) 
       var img = data.ruta;
      //var img = data.images[0].source.filename;
       imagen.innerHTML = ` <img id="picture" class="picture"  width="450" height="400" src="/resources/imagenes/1.jpg">`//./resources/imagenes/${img}
       //imagen.innerHTML = ` <img id="picture" class="picture"  width="300" height="250"  src="<?php echo site_url('${img}');?>" >`
       
      
       if (request.status >= 200 && request.status < 400) {
        //let jsonSpecificValue = (dtt.watson.images[0].objects.collections[0].objects && 
         // dtt.watson.images[0].objects.collections[0].objects.length > 0) ? dtt.watson.images[0].objects.collections[0].objects[0].value || false : false;

       // console.log(jsonSpecificValue);
        
         // if (!jsonSpecificValue) {
            var name =    data.watson.images[0].objects.collections[0].objects[0].object
            var dim = data.watson.images[0].objects.collections[0].objects[0].location;
            /**
             * {"watson":
             * {"images":[
             * {"source":{"type":"file","filename":"image-38368ca3031a9d3f03617e99845c93e360baaeb4.jpeg"},
             * "dimensions":{"height":480,"width":640},
             * "objects":
             * {"collections":[
             * {"collection_id":"d43688e9-955f-44c7-aec8-8def5194e636",
             * "objects":[
             * {"object":"arma_blanca",
             * "location":{"left":125,"top":100,"width":242,"height":245},
             * "score":0.974114}]}]}}]},
             * "ruta":"/home/roheru/Royer/Disk/U.A.G.R.M./SOFTWARE_I/4taVuelta/GitHub/sw1/ProyectoSW/ProyectoSW/imagenes/image-38368ca3031a9d3f03617e99845c93e360baaeb4.jpeg"}
             */
            
            var dimImg = data.watson.images[0].dimensions;
            var scaleH =  (dim.height * 400 ) / dimImg.height;
            var scaleW = (dim.width * 450) / dimImg.width;
            var scaleT = (dim.top * 450) / dimImg.width;
            var scaleL = (dim.left * 400) / dimImg.height;
            imagen.innerHTML += `
           
    
            <div style="position: absolute;
            border: 2px solid #FFF;
            position: absolute;
            left :      ${scaleL}px;
            top :      ${scaleT}px;
            width:    ${scaleW}px;
            height :  ${scaleH}px;"> ${name}
            </div>`;
        //  }else{
           // console.log('no hay resultados')
//}
       } else {
         console.log('error: No se pudieron obtener los resultados.')
       }
     }
     request.send()
   //request.send(JSON.stringify({}))


}

    //obtener()




function capturarInfinito() {
  setTimeout(() => {
    //sendmsg()  
    obtener();
       //goPython()
      capturarInfinito()
      
  }, 9000)
}

capturarInfinito()
//obtener();7