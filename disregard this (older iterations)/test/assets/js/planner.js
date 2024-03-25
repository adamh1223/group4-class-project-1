function userInfo() {
  var user = $(".user").val();
  var password = $(".password").val();
  $(".user").val("");
  $(".password").val("");

  alert(user + " " + password);
}

login = [];
$(".new_user").on("click", userInfo);
