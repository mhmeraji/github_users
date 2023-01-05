
// Fetches all the required html elements 
// from the document object and set their 
// innerHTML value to a proper one
function renderHTML(result, infoObject, username) {
    let userAlertObject = document.getElementById('userAlerts')
    let infoNameObj = document.getElementById('infoName')
    let infoBioObj = document.getElementById('infoBio')
    let infoLocObj = document.getElementById('infoLocation')
    let infoBlogObj = document.getElementById('infoBlog')
    let infoLanObj = document.getElementById('infoLanguage')
    let infoPicObj = document.getElementById('infoPicture')
    if (result == "found") {
        userAlertObject.innerHTML = "<p>Here Is Your Information For " + username + "</p>"
        infoPicObj.innerHTML = "<img src=" + infoObject.pic + " id=\"infoAvatar\"></img>"
        infoNameObj.innerHTML = "<p>" + infoObject.name + "</p>"
        infoBioObj.innerHTML = "<p>" + infoObject.bio + "</p>"
        infoLocObj.innerHTML = "<p>" + infoObject.loc + "</p>"
        infoBlogObj.innerHTML = "<p>" + infoObject.blog + "</p>"
        // infoLanObj.innerHTML = "<p>" + infoObject.lan + "</p>"
        
    } else if (result == "notFound") {
        userAlertObject.innerHTML = "<p>User " + username + " Not Found</p>"
        infoPicObj.innerHTML = "<img src=\"assets/qmark.png\" id=\"infoAvatar\"></img>"
        infoNameObj.innerHTML = "<p>Name</p>"
        infoBioObj.innerHTML = "<p>BIO</p>"
        infoLocObj.innerHTML = "<p>Location</p>"
        infoBlogObj.innerHTML = "<p>blog</p>"
        infoLanObj.innerHTML = "<p>My Favoriate Programming Language Is</p>"

    } else if (result == "networkIssue") {
        userAlertObject.innerHTML = "<p>There Is Probably A Network Issue!</p>"
        infoPicObj.innerHTML = "<img src=\"assets/qmark.png\" id=\"infoAvatar\"></img>"
        infoNameObj.innerHTML = "<p>Name</p>"
        infoBioObj.innerHTML = "<p>BIO</p>"
        infoLocObj.innerHTML = "<p>Location</p>"
        infoBlogObj.innerHTML = "<p>blog</p>"
        infoLanObj.innerHTML = "<p>My Favoriate Programming Language Is</p>"
    } else {
        alert("Unkown User Exception");
    }
    
}

// WIP : Function for fetching the user's favoriate language
function getLang(username) {
    // https://api.github.com/users/username/repos
}

// Retreiving the data from github and creating an
// infoObject if possible
// Not that this function update the localStorage 
// And calls the rendering function
function getFromGitHub(username) {
    const Http = new XMLHttpRequest();
    const url='https://api.github.com/users/' + username;
    Http.open("GET", url);
    Http.send();
    console.log("HTTP call On URL : " + url)
    Http.onreadystatechange = (e) => {
        response = Http.responseText
        console.log("Response Is " + response)
        if (response == "") {
            renderHTML("networkIssue", null, username)
        } else if (JSON.parse(response).message == "Not Found") {
            renderHTML("notFound", null, username)
            localStorage.setItem(username, JSON.stringify({result: "notFound", info: "null"}))
        } else {
            response = JSON.parse(response)
            infoObject = {}
            infoObject.pic = response.avatar_url
            infoObject.name = response.name
            infoObject.bio = response.bio
            infoObject.loc = response.location
            infoObject.blog = response.blog
            renderHTML("found", infoObject, username)
            localStorage.setItem(username, JSON.stringify({result: "found", info: infoObject}));
        }
      }
}

// Function which is the onClick of submit button
// this function gets the username from the text box 
// and checks the localStorage for the information about 
// username, if nil passes the username to proper functions in order
// to fetch the required data through http calls.
function getUsername() {
    let inputObject = document.getElementById('submitFormTextBox')
    username = inputObject.value
    preStored = JSON.parse(localStorage.getItem(username))
    if (preStored == null) {
        getFromGitHub(username)
    } else {
        console.log("Retreived From Storage = " + preStored.result, preStored.info.name)
        renderHTML(preStored.result, preStored.info, username)
    }
};