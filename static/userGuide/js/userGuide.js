//load the vue objects on window load or they won't be ready
window.onload = function () {
    //Nordstrom home button that goes to myNordstrom employee site
    var url = new Vue({
        el: '#myNordstrom',
        data: {
            myNordstrom: 'https://directaccess.nordstrom.com/OA_HTML/RF.jsp?function_id=31075&resp_id=-1&resp_appl_id='
            + '-1&security_group_id=0&lang_code=US&params=W30H8UrwbYX-4--5GLpcuw&oas=uQlml6tOFI2zXvpEhBJIsA..'
        }
    });
}