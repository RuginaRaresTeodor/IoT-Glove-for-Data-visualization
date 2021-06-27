#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include "MPU9250.h"
MPU9250 mpu;
 
// Replace with your network credentials
const char* ssid = "HUAWEI-pAUs";
const char* password = "G5DD84Q3";
ESP8266WebServer server(80);   //instantiate server at port 80 (http port)
 
String page = "";
String text = "";
String data;
String x;
static unsigned int last_time = 0;
void setup(void){
 pinMode(A0, INPUT);
 delay(1000);
 Serial.begin(115200);
 Wire.begin();
 if (!mpu.setup(0x68)) {  // change to your own address
        while (1) {
            Serial.println("MPU connection failed. Please check your connection with `connection_check` example.");
            delay(5000);
        }
    }
 WiFi.begin(ssid, password); //begin WiFi connection
 Serial.println("");
 
 // Wait for connection
 while (WiFi.status() != WL_CONNECTED) {
 delay(500);
 Serial.print(".");
}
 
 Serial.println("");
 Serial.print("Connected to ");
 Serial.println(ssid);
 Serial.print("IP address: ");
 Serial.println(WiFi.localIP());
 
 server.on("/data.txt", [](){
   text = (String)data;
   server.sendHeader("Access-Control-Allow-Origin", "*");
   server.send(200, "text/html", text);
 });
 
 
 server.on("/", [](){
   page = "<h1>Sensor to Node MCU Web Server</h1><h1 id=\"dt\">Data:</h1> <h1 id=\"data\">""</h1>\r\n";
   page += "<script>\r\n";
   page += "var x = setInterval(function() {loadData(\"data.txt\",updateData)}, 100);\r\n";
   page += "function loadData(url, callback){\r\n";
   page += "var xhttp = new XMLHttpRequest();\r\n";
   page += "xhttp.onreadystatechange = function(){\r\n";
   page += " if(this.readyState == 4 && this.status == 200){\r\n";
   page += " callback.apply(xhttp);\r\n";
   page += " }\r\n";
   page += "};\r\n";
   page += "xhttp.open(\"GET\", url, true);\r\n";
   page += "xhttp.send();\r\n";
   page += "}\r\n";
   page += "function updateData(){\r\n";
   page += " document.getElementById(\"data\").innerHTML = this.responseText;\r\n";
   page += "}\r\n";
   page += "</script>\r\n";
   server.sendHeader("Access-Control-Allow-Origin", "*");
   server.send(200, "text/html", page);
});
 
 server.begin();
 server.sendHeader("Access-Control-Allow-Origin", "*");
 Serial.println("Web server started!");
}
 
void loop(void){
  if (mpu.update()) {
        
       if(mpu.getPitch() <-40){
       Serial.println("aici");
       
       if(!data.endsWith("n")){
       data+="n";}
        }
        if(mpu.getRoll() >60)
        {if(!data.endsWith("r")){
       data+="r";}
          }
          if(mpu.getRoll() <-60)
        {if(!data.endsWith("p")){
       data+="p";}
          }
    } 
if(millis() - last_time >1000 )
{ 
  int result = readAnalogKey();

 if( result > 0 )
  {data += String(result);
  x = data;
  }
  last_time = millis();
}
 server.handleClient();
}
int readAnalogKey(){
      int temp = analogRead(A0);
      if(temp>820)
          {
          Serial.println(temp);
            return 1;
           }
      if(temp<280)
          {
            if(temp>20){
            Serial.println(temp);}
            return 0;
          
           }     
      if(temp<380 && temp > 290)
          {Serial.println(temp);
            return 5;
          
           }
      if(temp<500 && temp>410)
          {Serial.println(temp);
            return 4;
          
           }
      if(temp<650 && temp > 560)
          {Serial.println(temp);
            return 3;
          
           }
      if(temp<780 && temp>700)
          {Serial.println(temp);
            return 2;
          
           }
  }
