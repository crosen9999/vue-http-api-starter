<template>
  <div class="hello" style="text-align: center">
    Hello from ViewA
    <br /><br >

      <button @click="action">action</button>

        <router-link :to="{name: 'ViewA1'}" style="margin-right: 30px"> 
          Go to View A1
        </router-link>
        <router-view></router-view>
   </div>
</template>

<script>
//import HelloWorld from "@/components/HelloWorld"

export default {
  name: 'ViewA',
  data() {
    return {
      content: ''
    } 
  },
  components: {
    //HelloWorld
  },
  props: {
  },
  mounted() {

  },
  methods : {
    action: function(e) {
        e.preventDefault
        console.log("creating account");
        const url = "https://localhost:8001/api/createuser";

        fetch(
            url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                        UserName: this.UserName,
                        Password: this.Password
                        })
            }
        )
        .then( (response) => {
            console.log(response);
            return response.json();
        })            
        .then( (data) => {
            console.log(data);

        // if (data.token=="-1") {
            //     console.log("Login error");
            //     this.message = "Error, please try again";
            // } else
            // {
            //     this.message = "Login successful!"
            //     console.log("Login success.  New bearer = " + data);
                // this.$store.commit('setUserJWT', "Bearer " + data);
                // this.$router.push({
                //             name: 'ViewArticles',
                //             params: {
                //                 }
                // })
            // }
        })
        .catch( err => console.log("Error retrieving data: " + err));
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
</style>
