
let root_url_api = 'https://zapetite-api.uc.r.appspot.com/';
//let root_url_api = 'http://127.0.0.1:8080/'

// check if there is data to load on init
window.onload = function() {
    loadNews();
};

function loadNews() {

    //showLoading();
    
    url_api = root_url_api + 'news';

    fetch(url_api)
    .then(function(response) {
        return response.json();
    })
    .then(function(resp) {
        
        var results = resp.data;

        console.log(results)

        divContent = document.getElementById('content-div')
        divContent.innerHTML = '';
        var htmlStr = '';

        for(var i = 0; i < results.length; i++) {
            var news = results[i];
            var link = news[0];
            var title = news[1];
            var descri = news[2];
            var img = news[3];

            htmlStr += '<div class="row">';
            htmlStr += '<div class="col-12">';
            htmlStr += '<a style="text-decoration: none" href="' + link + '">';
            htmlStr += '<div class="card mt-5" style="height: inherit">';
            htmlStr += '<div class="row no-gutters" style="height: inherit">';
            htmlStr += '<div class="col-md-4">';
            htmlStr += '<img class="card-img-top" style="height: 200px" src="'+ img + '">';
            htmlStr += '</div>';
            htmlStr += '<div class="col-md-8">';
            htmlStr += '<div class="card-body" style="text-align: left">';
            htmlStr += '<h5 class="card-title">' + title + '</h5>';
            htmlStr += '<p class="card-text" style="color: black">' + descri + '</p>';
            htmlStr += '</div></div></div></div></a></div></div>';
        }

        divContent.innerHTML = htmlStr;

        //hideLoading();
    })
    .catch(function() {
        console.log("Error on loading news");
    });
}

function getPhoneAndOpenWhats(e) {
    var request = {
        placeId: e.target.id,
        fields: ['formatted_phone_number']
    };

    var restaurantName = e.target.childNodes[1].textContent;
      
    service = new google.maps.places.PlacesService(map);
    //service.getDetails(request, callback2);
    service.getDetails(request, function(place, status) {
        callback2(place, status, restaurantName)
    }); 
}

function callback2(place, status, restaurantName) {

    var phone = place.formatted_phone_number;
    errMsg = 'Não foi possível contatar o estabelecimento. Por favor envie seu link de convite por outro canal de comunicação.';

    if (!phone) {
        alert(errMsg);
        return;
    }

    phone = phone.replaceAll('(', '').replaceAll(')', '').replaceAll('-','').replaceAll(' ','')
    
    if(phone.length != 11) {
        alert(errMsg);
        return;
    }

    phone = '55' + phone;
    
    var inviteLink = document.getElementById('box_link').value;
    var urlWhats = root_url_whats_1 + phone + root_url_whats_2 + root_msg_1 + ' ' + restaurantName + root_msg_2 + inviteLink;
    
    window.open(urlWhats, '_blank');
}

function sendToContactsWhatsApp() {
    var inviteLink = document.getElementById('box_link').value;
    var urlPath = root_url_whats_1 + root_url_whats_2 + root_msg_1 + root_msg_2 + inviteLink;
    window.open(urlPath, '_blank');
}


function showLoading() {
    spinner = document.getElementById("spinner2");
    spinner.style.display = "inline-block";
}

function hideLoading() {
    spinner = document.getElementById("spinner2");
    spinner.style.display = "none";
}

function hideLinkGenerationSection() {
    document.getElementById('div_generate_invite').style.display = "none";
}

function showLinkSection(url_link_invite) {
    document.getElementById('box_link').value = url_link_invite;
    document.getElementById('div_ready_link').style.display = "inline-block";
}