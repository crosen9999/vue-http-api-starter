<template>
  <div class="hello">
    <div id="id01" class="modal">
      <div class="modal-content animate" action="/" method="get">

        <div class="container">
          {{message}}<br><br>

          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="uname" xrequired>

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" xrequired>
            
          <button type="submit" @click="login">Login</button>
          <label>
            <input type="checkbox" checked="checked" name="remember"> Remember me
          </label>
        </div>

        <div class="container" style="background-color:#f1f1f1">
          <button type="button" @click="cancelLogin" class="cancelbtn">Cancel</button>
          <span class="psw">Forgot <a href="#">password?</a></span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

//import HelloWorld from "@/components/HelloWorld"

export default {
  name: 'Login',
  data() {
    return {
      message: "WELCOME!!! Please login."
    } 
  },
  components: {
    //HelloWorld
  },
  props: {
  },
  methods: {
    cancelLogin: function(){
      document.getElementById('id01').style.display='none'; 
      this.$router.push({
                name: 'ViewArticles',
                params: {
                  'refresh': 0
                  }
              })
    },
    login: function(e) {
      e.preventDefault
      console.log("Getting data");
      const url = "https://localhost:8001/api/login";

      fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': ""              }
            })
      .then( (response) => {
          console.log("Converting data to json");
          return response.json();
      })
      .then( (data) => {
          if (typeof(data)=="undefined") {
            console.log("Login failed")
            console.log("No data found.");
          } else
          {
              console.log("Login successful.")
              console.log(data);
              this.$store.commit('setUserJWT', "Bearer " + data);
              this.$router.push({
                name: 'ViewArticles',
                params: {
                  'refresh': 0
                  }
              })
          }
      })
      .catch( err => console.log("Error logging in: " + err));

    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}


body {font-family: Arial, Helvetica, sans-serif; text-align: left;}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #555555;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

/* Extra styles for the cancel button */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #777777;
}

/* Center the image and position the close button */
.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

/* The Modal (background) */
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  padding-top: 60px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button (x) */
.close {
  position: absolute;
  right: 25px;
  top: 0;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}

/* Add Zoom Animation */
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s
}

@-webkit-keyframes animatezoom {
  from {-webkit-transform: scale(0)} 
  to {-webkit-transform: scale(1)}
}
  
@keyframes animatezoom {
  from {transform: scale(0)} 
  to {transform: scale(1)}
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
     display: block;
     float: none;
  }
  .cancelbtn {
     width: 100%;
  }
}
</style>
