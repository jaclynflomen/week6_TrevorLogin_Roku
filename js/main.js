// (() => {
// //components will go here
// const HomePageComponent = {
//     template: "<h2>You're on the home page</h2>" 
//     };

// const UsersPageComponent = {
//     prope: ['id'],
//     template: "#userList",

//     data: function() {
//         return {
//             users: []
//         }
//     },

//     created: function() {
//         console.log('user component created');

//         this.fetchUserData(this.id);
//     },

//     methods: {
//         fetchUserData(user) {
//             // debugger;

//             let url = `./includes/index.php?user=${user}`;

//             fetch(url)
//                 .then(res => res.json())
//                 .then(data => this.users = data)
//             .catch(function(error){
//                 console.error(error);
//             });
//         }
//     }
//  };

// const ContactPageComponent = {
//     template: "<h2>You're on the contact page</h2>"
// };

// const ErrorPageComponent = {
//     template: "<h2>Page not found! Please try again.</h2>"
// };

//Week 4 work:

//components here
import LoginComponent from './components/LoginComponent.js'; //this is like doing a php include
import UserComponent from './components/UserComponents.js';
import UserHomeComponent from './components/UserHomeComponent.js';

const routes = [
    { path: '/', redirect: {name: 'login'}},
    { path: '/login', name: 'login', component: LoginComponent },
    { path: '/users', name: 'users', component: UserComponent },
    { path: '/userhome', name: 'home', component: UserHomeComponent, props: true}
    
    // { path: '/contact', name: 'contact', component: ContactPageComponent},
    // { path: '/*', name: 'error', component: ErrorPageComponent }
];

const router = new VueRouter ({
    routes
});

const vm = new Vue ({
    // el: '#app',

    data: {
        message: "Sup from vue!",
        authenticated : false,
        administrator: false,
        
        mockAccount : {
            username: "jrf",
            password: "123"
        },

        user: [],
        currentUser: {}
    },

    created: function(){
        console.log('parent is live');
    },

    methods: {
        logParent(message) {
            console.log("from the parent", message);
        },

        logMainMsg(message){
            console.log('called from inside a child, lives in the parent', message);
        },

        setAuthenticated(status){
            this.authenticated = status;
        },

        logout(){
            this.$router.push({ path: "/login"} ); //the order here matters //login path has to fire first
            this.authenticated = false; //and then turn off the authentication
        },

        setCurrentUser(user) {
            //stub
            console.log('hit setCurrentUser');
        }
    },

    // components: { //register components here
    //     'HomePageComponent': HomePageComponent, 
    //     'UsersPageComponent': UsersPageComponent
    // },

    router: router
}).$mount("#app");

//make the router check all of the routes and bounce back if we're not authenticated
router.beforeEach((to, from, next) => {
    console.log("router guard fired!");

    if (vm.authenticated == false) {
        next("/login");
    }else{
        next();
    }
});

// })();