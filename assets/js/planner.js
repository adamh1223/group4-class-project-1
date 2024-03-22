function userInfo() {
  var login = [];
  var firstName = $(".first_name").val();
  var lastName = $(".last_name").val();
  var user = $(".user").val();
  var password = $(".password").val();
  $(".user").val("");
  $(".password").val("");
  newUser = [
    {
      firstName: firstName,
      lastName: lastName,
      user: user,
      password: password,
    },
  ];

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
