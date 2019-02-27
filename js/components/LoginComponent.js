export default {
    template: `
    <div class="jumbotron roku-jumbotron">
            <h1 class="display-4">Welcome to Flashback!</h1>
            <p class="lead">Before revisiting your favourite movies, tv shows or music from yesteryear, please log in with a valid username and password.</p>
            <hr class="my-4">
            <form>
                <div class="form-row align-items-center">
                    <div class="col-sm-3 my-1">
                        <label class="sr-only" for="inlineFormInputName">Name</label>
                        <input v-model="input.username" type="text" class="form-control" id="inlineFormInputName" placeholder="username" required>
                    </div>

                    <div class="col-sm-3 my-1">
                        <label class="sr-only" for="inlineFormPassword">Name</label>
                        <input v-model="input.password" type="password" class="form-control" id="inlineFormPassword" placeholder="password" required>
                    </div>

                    <div class="col-auto my-1">
                        <button v-on:click.prevent="login()" type="submit" class="btn btn-primary">Go!</button>
                    </div>
                </div>
            </form>            
        </div>
    `,

    data() {
        return {
            input : {
                username: "",
                password: ""
            }
        }
    },

    methods: {
        login(){
            console.log("trying to log in");

            //check against our mock account creds
            if(this.input.username !="" && this.input.password !="") { //if its not empty

                // create some form data to do a POST request
                let formData = new FormData(); //serializing everything in the input field (password, etc.)

                formData.append("username", this.input.username);
                formData.append("password", this.input.password); 


                //do a fetch here and check creds on the back end
                let url = `./admin/admin_login.php`; //pan's file

                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                    .then(res => res.json())
                    .then(data => {
                        if (typeof data !== "object") {
                            //if te php file returns a failure, try again
                            console.log("authentication failed, try again");
                            //pop a toast message / notification here
                            return;
                        }else{
                            //if the back-end authentication works, then go to the users page
                            this.$emit("authenticated", true);
                            this.$router.replace({name: "users"});
                        }
                    })
                .catch(function(error){
                    console.error(error);
                });
            } else {
                console.log('Username and Password cannot be blank');
            }
        }
    }
}