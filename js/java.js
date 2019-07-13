
//Listeners

     $("#zip").on("change", function(){
     $.ajax({
      method: "GET",
      url: "https://cst336.herokuapp.com/projects/api/cityInfoAPI.php",
      dataType: "json",
      data:  {"zip" : $("#zip").val() },
      success: function(result, status){
        if(result){
          zipFound = true;
          $("#city").html(result.city);
          $("#long").html(result.longitude);
          $("#lat").html(result.latitude);
        }
        else{
          // invalid zip
            $("#zipStatus").html("<span class='alert alert-danger' role='alert'>Invalid zip.</span>");
            zipFound = false;
         }    
         }
     }); // ajax
    }); // zip
        
        $.ajax({
       method: "GET",
      url: "https://cst336.herokuapp.com/projects/api/countyListAPI.php",
      dataType: "json",
      data:  {"state" : $("#state").val() },
      success: function(result, status){
     //alert(result[0].county);
        result.forEach(function(i){
              $("#county").append("<option>" + i.county + "</option>");      
        });
    }
    }); //county

    $("#username").on("change", function() {
      //alert($("#username").val());
      $.ajax({
        method: "GET",
        url: "https://cst336.herokuapp.com/projects/api/usernamesAPI.php",
        dataType: "json",
        data: {"username": $("#username").val() },
        success: function(result, status) {
          usernameAvailable = result.available;
          if(usernameAvailable){
            // username is available
            $("#usernameError").html("<span class='alert alert-success' role='alert'>Username available.<span>");           
          }
          else{
            // username is already taken
            $("#usernameError").html("<span class='alert alert-danger' role='alert'>Username already taken.</span>");
           
            
          }
        }
      }); // ajax
    }); // username 

$("#passwordAgain").on("change", function() {
      if($("#password").val() != $("#passwordAgain").val()){
          isValid = false;
        // console.log("passwords don't match");
          $("#passwordAgainStatus").html("<span class='alert alert-danger' role='alert'>Passwords do not match.</span>");
      }else{
         $("#passwordAgainStatus").html("<span class='alert alert-success' role='alert'>Password OK.</span>");
       }
    }); // username 
    
    $("#signupForm").on("submit", function(event){
      if(!isFormValid())
        {
          event.preventDefault();
        }
      console.log(isValid);
    });

