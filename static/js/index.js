var header = "Unsuccessful on \n ID(s): ";
const GET_NAUTH = 'https://vendor-auth-si.dsvendor-nonprod.nordstrom.com/vendor/auth/loginurl?redirect_url=http%3A%2F%2Flocalhost%3A3000';
var expiryTime, name, email, redirectNAuth = '';
var urlQuery = window.location.search;
var tokenUrl = 'https://vendor-auth-si.dsvendor-nonprod.nordstrom.com/vendor/auth/tokens';
var postTokenUrl = '&redirectUri=http%3A%2F%2Flocalhost%3A3000';
var stateHold = false, successRating = true;
var getCode = localStorage.getItem('code'), getState = localStorage.getItem('state'), getName = localStorage.getItem('name');
const LOGIN = "LOGIN", LOGIN_SUCCESS = "LOGIN_SUCCESS", LOGOUT = "LOGOUT";

function doRedrive(form) {
    //Set variables && delineate the textarea into an array and make a second array for the other expected values
    var status, array, arrayUpdate = new Array();
    array = form.elements[1].value.split(/[\n,]+/);

    if (array.length <= 60) {
        arrayUpdate = [
            form.elements[0].value,
            form.elements[2].value,
            form.elements[3].value,
            form.elements[4].value
        ];

        //Push them into the main array since we didn't know the length initially
        Array.prototype.push.apply(array, arrayUpdate);
    } else {
        //Notify user they're over limit, with suggestions, and clear the textarea
        alert("More than 60 inputs have been received. \n(Hint: Ensure you're not ending with a comma or line break)");
        document.getElementById('#resetForm').click();
    }

    $(document).ready(function ajaxForm() {
        //Disable button to avoid multiple clicks
        $('#redriveSubmit').prop('disabled', true);
        var len = array.length;
        //Iterate over the array, and hit endpoint with IDs', or list the ones that failed

        // This is previous code that didn't work due to running in parallel
        // $.each(array, function (index) {
        //     if (index < len - 4) {
        //         $.ajax({
        //             type: 'POST',
        //             url: '/redrive',
        //             data: 'environment=' + array[len - 4] + '&type=' + array[len - 3] + '&market=' + array[len - 2] +
        //             '&catalog=' + array[len - 1] + '&id=' + array[index],
        //             success: function (data, textStatus, xhr) {
        //                 alert(data.result + ' ' + array[index])
        //                 status = xhr.status
        //                 if ((data.result !== undefined && data.result.includes("SUCCESS"))){
        //                     console.log(data.result)
        //                 }else{
        //                     successRating = false
        //                     header = header.concat(' ' + array[index])
        //                 }
        //             }
        //         });
        //     }
        // });


        function getAjaxDeferred(index) {
            return function () {
                // wrap with a deferred
                var defer = $.Deferred();
                $.ajax({
                    type: 'POST',
                    url: '/redrive',
                    data: 'environment=' + array[len - 4] + '&type=' + array[len - 3] + '&market=' + array[len - 2] +
                        '&catalog=' + array[len - 1] + '&id=' + array[index],
                    success: function (data, textStatus, xhr) {
                        status = xhr.status
                        if ((data.result !== undefined && data.result.includes("SUCCESS"))) {
                            console.log(data.result)
                        } else {
                            successRating = false
                            header = header.concat(' ' + array[index])
                        }
                    },
                    error: function () {
                        alert(array[index] + ' is not an acceptable input. Please try again.')
                        location.reload()
                    }
                }).done(function () {
                        // resolve when complete always.  Even on failure we
                        // want to keep going with other requests
                        defer.resolve();
                    });
                // return a promise so that we can chain properly in the each
                return defer.promise();
            };
        }
        // this will trigger the first callback.
        var base = $.when({});
        $.each(array, function (index) {
            if (index < len - 4) {
                base = base.then(getAjaxDeferred(index));
            }else if(index == len - 1){
                base = base.done(function () {
                    if(successRating){header = "Redrive is Successful!"}

                    new Vue({
                        el: '#app',
                        data: {
                            showModal: false,
                            header: header
                        },
                        watch: {
                            showModal : function (newVal) {
                                if(newVal == false){
                                    window.location.reload()
                                }
                            }
                        }
                    })
                    $('#show-modal').click();
                })
            }
        });

    });

}

//This is previous code that did work due to running in parallel
// $(document).ajaxStop(function () {
    // if(successRating){header = "Redrive is Successful!"}
    //
    // new Vue({
    //     el: '#app',
    //     data: {
    //         showModal: false,
    //         header: header
    //     },
    //     watch: {
    //         showModal : function (newVal) {
    //             if(newVal == false){
    //                 window.location.reload()
    //             }
    //         }
    //     }
    // })
    // $('#show-modal').click();
// });

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function getToken(code, state){
    var uuid = guid();

    let config = {
        headers: {
            "accept":"application/json",
            "content-type":"application/json",
            "source":"NPS",
            "correlationId": uuid
        }
    }
    let data = {
        code:code,
        state:state
    }

    localStorage.removeItem('code');
    localStorage.removeItem('state');

    axios.post(tokenUrl + "?code=" + code + "&state=" + state + postTokenUrl, data, config).then(response => {
        localStorage.setItem('token', response.data.accessToken)
        localStorage.setItem('expiryTime', response.data.expiryTime)
        localStorage.setItem('name', response.data.userInfo.name)
        localStorage.setItem('email', response.data.userInfo.email)
        expiryTime = response.data.expiryTime
        name = response.data.userInfo.name
        email = response.data.userInfo.email
        // store.commit('SET_USER_EMAIL', email)
        // store.commit('SET_USER_NAME', name)
        // store.commit('SET_USER_EXPIRYTIME', expiryTime)
        // store.commit('SET_USER_TOKEN', localStorage.getItem('token'))
    }).catch(e => {

    })
}

//load the vue objects on window load or they won't be ready
window.onload = function () {
    const home = {template:
            '               <router-link :to="{name: \'redirect\'}" @click.native="test">\n' +
            '               <div>{{ getName }}</div>\n' +
            '               </router-link>\n'
    }
    const nAuth = {template: '<h1>Loading...</h1>'}
    const routes = [
        {path: '/', component: home},
        {path: '/index', redirect: '/'},
        {
            path: '/login',
            component: nAuth,
            name: 'redirect',
            beforeEnter: (to, from, next) => {
                if(localStorage.getItem('name') == null){
                    window.location = redirectNAuth
                }
            }
        }
    ]
    const router = new VueRouter({
        mode: 'history',
        routes
    })

    const store = new Vuex.Store({
        state: {
            isLoggedIn: !!localStorage.getItem('token'),
            user: {
                token: '',
                name: '',
                email: '',
                expiryTime: ''
            }
        },
        mutations: {
            SET_USER_EMAIL: (state, data) => state.user.email = data,
            SET_USER_NAME: (state, data) => state.user.name = data,
            SET_USER_TOKEN: (state, data) => state.user.token = data,
            SET_USER_EXPIRYTIME: (state, data) => state.user.expiryTime = data
            // [LOGIN] (state) {
            //     state.pending = true;
            // },
            // [LOGIN_SUCCESS] (state) {
            //     state.isLoggedIn = true;
            //     state.pending = false;
            // },
            // [LOGOUT](state) {
            //     state.isLoggedIn = false;
            // },
        },
        actions: {
            login({ commit }, creds) {
                commit(LOGIN); // show spinner
                return new Promise(resolve => {
                    setTimeout(() => {
                        localStorage.setItem("token", "JWT");
                        commit(LOGIN_SUCCESS);
                        resolve();
                    }, 1000);
                });
            },
            logout({ commit }) {
                localStorage.removeItem("token");
                commit(LOGOUT);
            }
        },
        getters: {
            isLoggedIn: state => {
                return state.isLoggedIn
            }
        }
    })

    router.beforeEach((to, from, next) => {
        if(!(urlQuery == "")){
            var urlParams;
            (window.onpopstate = function () {
                var match,
                    pl     = /\+/g,  // Regex for replacing addition symbol with a space
                    search = /([^&=]+)=?([^&]*)/g,
                    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
                    query  = urlQuery.substring(1);

                urlParams = {};
                while (match = search.exec(query))
                    urlParams[decode(match[1])] = decode(match[2]);

                localStorage.setItem('code', urlParams["code"]);
                localStorage.setItem('state', urlParams["state"]);
                stateHold = !stateHold;
            })();
        }

        if(stateHold){
            stateHold = !stateHold
            window.location = '/'
        }

        if(getCode !== null && getCode !== undefined && urlQuery == ''){
            getToken(getCode, getState)
        }

        next()
    })

    //New modal for the pop-up success template
    Vue.component('modal', {
        template: '#modal-template'
    })

    //Nordstrom home button that goes to myNordstrom employee site
    // var url = new Vue({
    //     el: '#myNordstrom',
    //     data: {
    //         myNordstrom: 'https://directaccess.nordstrom.com/OA_HTML/RF.jsp?function_id=31075&resp_id=-1&resp_appl_id='
    //         + '-1&security_group_id=0&lang_code=US&params=W30H8UrwbYX-4--5GLpcuw&oas=uQlml6tOFI2zXvpEhBJIsA..'
    //     }
    // });

    //Reset the text area (tied to hidden reset) if user puts too many IDs in
    new Vue({
        el: '#redriveForm',
        store,
        data: {
            id: '',
            notLoggedIn: true
        },
        methods: {
            resetForm() {
                this.id = ''
            },
            loggedIn() {
                return this.notLoggedIn
            },
            toggle: function () {
                this.notLoggedIn = !this.notLoggedIn
            },
            login() {
                this.$store.dispatch("login", {

                }).then(res => {

                })
            },
            logout() {
                this.$store.dispatch('logout');
            }
        },
        computed: {
            isLoggedIn() {
                return this.$store.getters.isLoggedIn;
            }
        }
    })

    //Navbar login behavior and action
    new Vue({
        el: '#loginLink',
        router,
        store,
        data() {
            return {
                status: 'Login',
                loading: false,
                // expiryTime: this.$store.state.user.expiryTime,
                // name: this.$store.state.user.name,
                email: email
            }
        },
        methods: {
            getNAuth(){
                loading: true
                this.status = 'Loading...'
            },
            authenticatedName() {
                this.status = name
            }
        },
        created(){
            let self = this

            axios.get(GET_NAUTH).then(response => {
                redirectNAuth = response.data
            })

            setTimeout(function(){
                if(localStorage.getItem('token') == null){
                    self.$router.push({name: 'redirect'})
                    localStorage.setItem('ticker', "true")
                }else if(localStorage.getItem('ticker')){
                    localStorage.removeItem('ticker')
                    location.reload()
                }else{
                    document.getElementById("formToggle").click()
                    document.getElementById("redriveForm").style.display = 'block';
                }
            }, 3000);
        }
    })
}
    //testing of pushing and popping values to an array with vue from front
    // new Vue({
    //     el: '#app',
    //     data: {
    //         finds: []
    //     },
    //     methods: {
    //         addFind: function () {
    //             this.finds.push({ value: 'def' });
    //         },
    //         deleteFind: function (index) {
    //             console.log(index);
    //             console.log(this.finds);
    //             this.finds.splice(index, 1);
    //         }
    //     }
    // });
