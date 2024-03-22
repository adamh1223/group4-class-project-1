//Modal Script Begins
var modal = document.getElementById("modal_body");
var mainContent = document.getElementById("container");
var headerContent = document.getElementById("header_content");
var modalButton = document.getElementById("modal_button");

// Open the modal on page load
window.onload = function displayModal() {
    modal.style.display = "block";
    mainContent.style.filter = "blur(4px)";
    headerContent.style.filter = "blur(4px)";    
};

// Close the modal on button click
modalButton.onclick = function closeModal() {
    modal.style.display = "none";
    mainContent.style.filter = "blur(0px)";
    headerContent.style.filter = "blur(0px)";
};
//Modal Script Ends


//NPS API call on search form submit function
document.getElementById("search_form").addEventListener("submit", function(event) {
    event.preventDefault();

    //Pull state ID value from the search form
    var stateSelected = document.getElementById("state_selector").value;

    //Variable for NPS API link with API key
    var npsUrl = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateSelected + "&limit=3&api_key=eFGyiFska6BcchqM5KEZhffuQaP0g9KYYikMaaqO";

    //Fetch method to retrieve state park data from NPS API
    fetch(npsUrl)
    
    //.then function for API response
    .then(function(response) {

        if (response.ok) {response.json()
            .then(function(data) {
            npsDisplay(data);
            console.log(data);
        });
    
        } else {alert("Error: " + response.statusText);
    }
})

    //.catch error and alert for no reponse from NPS server
    .catch(function(error) {alert("Error reaching NPS server.");
});
});


//Display NPS API data on the page
function npsDisplay(data) {
    var parkInfoContainer = document.getElementById("NPS_results");
    parkInfoContainer.innerHTML = "";

            //Loop through the API data
            for(var i=0; i<data.length; i++) {
            var parkUrl = data.data[i].url;
            var parkName = data.data[i].fullName;

            var parkNameUrl = document.createElement("a");
            var parkActivities = document.createElement("p");

            parkNameUrl.setAttribute("href", parkUrl);
            parkNameUrl.textContent = parkName;
            parkActivities.textContent = data.data[i].activities;

            parkInfoContainer.append(parkNameUrl);
            parkInfoContainer.append(parkActivities);
            }
        };


/*Call to jQuery to ensure that code isn't run until the browser has finished 
rendering all the elements in the html*/
// $(document).ready(function () {


//Local Storage Script Begins

/*Function to store trail data to local storage and presist data to the page 
when user clicks the "Search" button*/
// $(".search_button").on("click", function() {
//     var parkInfo = $(this).siblings(".trail_description").val();
//     var park = $(this).parent().attr("id");

    //Save trail info retrieved by API and corresponding trail ID to local storage
    // localStorage.setItem(park, parkInfo);
// })

  /*Get any user input that was saved in localStorage and set the 
  values of the corresponding textarea elements*/
//   $("#trail_a .trail_description").val(localStorage.getItem("trail_a"));
//   $("#trail_b .trail_description").val(localStorage.getItem("trail_b"));
//   $("#trail_c .trail_description").val(localStorage.getItem("trail_c"));
// });
//Local Storage Script Ends
