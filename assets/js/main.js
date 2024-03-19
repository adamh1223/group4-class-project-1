//Modal Script
var modal = document.getElementById("modal_body");
var modalButton = document.getElementById("modal_button");

//Open the modal on page load
window.onload = function displayModal() {
    modal.style.display = "block"
};

//Close the modal on button click
modalButton.onclick = function closeModal() {
    modal.style.display = "none";
};
