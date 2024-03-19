//Modal Script
var modal = document.getElementById("modal_body");
var mainContent = document.getElementById("container");
var modalButton = document.getElementById("modal_button");

//Open the modal on page load
window.onload = function displayModal() {
    modal.style.display = "block";
    mainContent.style.filter = "blur(4px)";    
};

//Close the modal on button click
modalButton.onclick = function closeModal() {
    modal.style.display = "none";
    mainContent.style.filter = "blur(0px)";
};
