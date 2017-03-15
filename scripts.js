$(document).ready(function(){
	
	var temp=0;
	var currentWeather;
	
	function capital(string){
		var words = string.toLowerCase().split(" ");
  
		words = words.map(function(word){
			return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
			});
  
		 return words.join(" ");
	}
	function degToCompass(num){
    var val= Math.round((num/22.5)+.5)
    var arr=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
    
    	return arr[(val%16)];
   	}
   	
   	function getD(){
	   	var d = new Date();
	   	var month = d.getMonth();
	   	var day = d.getDate();
	   	var year = d.getFullYear();
	   	var mins = d.getMinutes();
	   	var hours = d.getHours();
	   	
	   	var time = "AM";
	   	
	   	
	   	if (hours > 12){
		   	hours -= 12;
		   	time = "PM";
	   	}
	   	
	   	
	   	var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
	   	
	   	
	   	
	   	var str = months[month]+ " " + day +", " + year +"\n" + hours + ":" + mins + " " + time;
	   	console.log(day);
	   	return str;
   	}
	
	if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          var weatherURL = "https://api.darksky.net/forecast/5f3df52525bf4b8c60bd5460e7d2da19/" +lat+","+lon;
      
          
           $.ajax({
           
           url: weatherURL,
           type: 'GET',
           format: 'json',
           success: function(data){
	         
	        currentWeather = data;
            temp = Math.round(data.temp); 
            $("#weather").html(
	          
              "<h1>"+ data.name + "'s Current Weather</h1>"+
              "<p>"+ getD() + "</p>"+
              "<img src=\"http://openweathermap.org/img/w/"+ data.weather[0].icon+".png\" width=75px height = 75px>"+
              " <p id=\"temper\">" + temp+"&deg; F</p>"+
              "<p>" + capital(data.minutely.summary) + "</p>"
             );
           }//end of success
           
           });  // end of AJAX 
             
             
    });//end of function (Navigator)  
           
    };//end of navigator if
                   
    $("#toggle1").change(function(){
	   
	   if (!$(this).prop("checked")){
		   
		   temp = Math.round((temp-32) * (5/9));
		   
		   $("#temper").html(
			    temp+ "&deg; C"
		   );
		   
		   
	   }//end of if
	   
	   else if($(this).prop("checked")){
		   temp = Math.round((temp*(9/5)+32));
		   
		   $("#temper").html(
			    temp+ "&deg; F"
		   );
		   
	   }//end of else if
	   
    });//end of toggle function            
        
     $("#moreInfo").on("click",function(){
	    $("#infoWell").html(
		  "<p>Wind speed: " + currentWeather.wind.speed +" MPH @ "+ degToCompass(currentWeather.wind.deg)+"</p><br>"+
		  "<p>Humidity: " + currentWeather.main.humidity +"%</p>"
		    
	    );
     });
    
    
 
  
  
  
});//end of document ready

