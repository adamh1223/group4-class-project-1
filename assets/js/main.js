//Modal Script Begins
var modal = document.getElementById("modal_body");
var mainContent = document.getElementById("container");
var headerContent = document.getElementById("header_content");
var modalButton = document.getElementById("modal_button");

//Open the modal on page load
window.onload = function displayModal() {
    modal.style.display = "block";
    mainContent.style.filter = "blur(4px)";
    headerContent.style.filter = "blur(4px)";    
};

//Close the modal on button click
modalButton.onclick = function closeModal() {
    modal.style.display = "none";
    mainContent.style.filter = "blur(0px)";
    headerContent.style.filter = "blur(0px)";
};
//Modal Script Ends


/*Call to jQuery to ensure that code isn't run until the browser has finished 
rendering all the elements in the html*/
$(document).ready(function () {


//Local Storage Script Begins

/*Function to store trail data to local storage and presist data to the page 
when user clicks the "Search" button*/
$(".search_button").on("click", function() {
    var trailInfo = $(this).siblings(".trail_description").val();
    var trail = $(this).parent().attr("id");

    //Save trail info retrieved by API and corresponding trail ID to local storage
    localStorage.setItem(trail, trailInfo);
})

  /*Get any user input that was saved in localStorage and set the 
  values of the corresponding textarea elements*/
  $("#trail_a .trail_description").val(localStorage.getItem("trail_a"));
  $("#trail_b .trail_description").val(localStorage.getItem("trail_b"));
  $("#trail_c .trail_description").val(localStorage.getItem("trail_c"));
});
//Local Storage Script Ends