var usernameAvailable = false;


//Listeners

$("#zip").on("change", function() {
  $('#zipError').html("");

  $.ajax({
    method: "GET",
    url: "https://cst336.herokuapp.com/projects/api/cityInfoAPI.php",
    dataType: "json",
    data: {
      "zip": $("#zip").val()
    },
    success: function(result, status) {
      if (result) {
        $('#city').html(result.city);
        $('#latitude').html(result.latitude);
        $('#longitude').html(result.longitude);
      } else {
        $('#zipError').html("Zip code not found.");

        $('#city').html('');
        $('#latitude').html('');
        $('#longitude').html('');
      }
    },
    error: function() {
      $('#zipError').html("Zip code not found.");
      $('#zipError').addClass("error");
      $("#zipError").removeClass("success");

      $('#city').html('');
      $('#latitude').html('');
      $('#longitude').html('');
    }
  }); // ajax
});


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
        $("#usernameError").html("<br><span class='alert success' role='alert'>Username available.<span>");
        $("#usernameError").css("color", "green");
      } else {
        // username is already taken
        $("#usernameError").html("<br><span class='alert error' role='alert'>Username already taken.</span>");
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
    $("#passwordAgainStatus").css("color", "red");
  } else {
    $("#passwordAgainStatus").html("<span class='alert alert-success' role='alert'>Password OK.</span>");
    $("#usernameError").css("color", "green");
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
    $("#usernameError").css("color", "red");
  }

  if ($("#password").val().length < 6) {
    isValid = false;
    $("#passwordLength").html("Password has to be at least 6 characters");
    $("#passwordLength").css("color", "red");
  }

  if ($("#password").val() != $("#passwordAgain").val()) {
    $("#passwordAgainError").html("Password Mismatch!");
    $("#passwordAgainError").css("color", "red");
    isValid = false;

  }
  return isValid;
}