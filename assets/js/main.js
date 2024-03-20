//Modal Script Begins
// var modal = document.getElementById("modal_body");
// var mainContent = document.getElementById("container");
// var headerContent = document.getElementById("header_content");
// var modalButton = document.getElementById("modal_button");

//Open the modal on page load
// window.onload = function displayModal() {
//     modal.style.display = "block";
//     mainContent.style.filter = "blur(4px)";
//     headerContent.style.filter = "blur(4px)";    
// };

//Close the modal on button click
// modalButton.onclick = function closeModal() {
//     modal.style.display = "none";
//     mainContent.style.filter = "blur(0px)";
//     headerContent.style.filter = "blur(0px)";
// };
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

        if (response.ok) {response.json().then(function(data) {
            npsDisplay(data);
            console.log(data)
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
}