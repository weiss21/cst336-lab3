var usernameAvailable = false;


//Listeners

$("#zip").on("change", function() {
  $.ajax({
    method: "GET",
    url: "https://cst336.herokuapp.com/projects/api/cityInfoAPI.php",
    dataType: "json",
    data: {
      "zip": $("#zip").val()
    },
    success: function(result, status) {
      if (result) {
        zipFound = true;
        $("#city").html(result.city);
        $("#long").html(result.longitude);
        $("#lat").html(result.latitude);
      } else {
        // invalid zip
        $("#zipStatus").html("<span class='alert alert-danger' role='alert'>Invalid zip.</span>");
        zipFound = false;
      }
    }
  }); // ajax
}); // zip

$("#state").on("change", function() {
  $.ajax({
    method: "GET",
    url: "https://cst336.herokuapp.com/projects/api/countyListAPI.php",
    dataType: "json",
    data: {
      "state": $("#state").val()
    },
    success: function(result, status) {
      //alert(result[0].county);
      $("#county").html("<option>Select One</option>")
      for (let i = 0; i < result.length; i++) {
        $("#county").append("<option>" + result[i].county + "</option>");
      }
    }

  }); // ajax
}); // state

$("#username").on("change", function() {
  //alert($("#username").val());
  $.ajax({
    method: "GET",
    url: "https://cst336.herokuapp.com/projects/api/usernamesAPI.php",
    dataType: "json",
    data: {
      "username": $("#username").val()
    },
    success: function(result, status) {
      usernameAvailable = result.available;
      if (usernameAvailable) {
        // username is available
        $("#usernameError").html("<br><br><span class='alert alert-success' role='alert'>Username available.<span>");
        $("#usernameError").css("color", "green");
      } else {
        // username is already taken
        $("#usernameError").html("<br><br><span class='alert alert-danger' role='alert'>Username already taken.</span>");
        $("#usernameError").css("color", "red");


      }
    }
  }); // ajax
}); // username 

$("#passwordAgain").on("change", function() {
  if ($("#password").val() != $("#passwordAgain").val()) {
    isValid = false;
    // console.log("passwords don't match");
    $("#passwordAgainStatus").html("<span class='alert alert-danger' role='alert'>Passwords do not match.</span>");
  } else {
    $("#passwordAgainStatus").html("<span class='alert alert-success' role='alert'>Password OK.</span>");
  }
}); // username 

$("#signupForm").on("submit", function(event) {
  if (!isFormValid()) {
    event.preventDefault();
  }
});

//Functions

function loadStates() {
  $.ajax({
    method: "GET",
    url: "https://cst336.herokuapp.com/projects/api/state_abbrAPI.php",
    dataType: "json",
    data: {
      "usps": $("#state").val()
    },
    success: function(result, status) {
      $("#state").html("<option>Select One</option>")
      for (let i = 0; i < result.length; i++) {
        $("#state").append("<option>" + result[i].usps + "</option>");
      }
    }
  });
}

function isFormValid() {
  var isValid = true;
  if (!usernameAvailable) {
    isValid = false;
  }

  if ($("#username").val().length == 0) {
    isValid = false;
    $("#usernameError").html("Username is required");
  }

  if ($("#password").val().length < 6) {
    isValid = false;
    $("#passwordLength").html("Password has to be at least 6 characters");

  }

  if ($("#password").val() != $("#passwordAgain").val()) {
    $("#passwordAgainError").html("Password Mismatch!");
    isValid = false;

  }
  return isValid;
}