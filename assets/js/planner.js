function userInfo() {
  var login = [];
  var user = $(".user").val();
  var password = $(".password").val();
  $(".user").val("");
  $(".password").val("");
  newUser = [{ user: user, password: password }];
  console.log(newUser);
  login.push(newUser);

  $(this).modal("hide");
  console.log(login);
  localStorage.setItem("signup", JSON.stringify(login));
}

$(".new_user").on("click", userInfo);

login = JSON.parse(localStorage.getItem("signup"));
console.log(login);
console.log(localStorage.length);
