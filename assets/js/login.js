//modal code
var login = $("#login");
var modal = bootstrap.Modal.getOrCreateInstance(login); // Returns a Bootstrap modal instance
modal.show();

function validateLogin() {
  modal.hide();
}
$(".btn_login").on("click", validateLogin);
//end modal code

function parkDetail() {
  alert("here");
}
function processParks(parksResult) {
  $(".park_item").remove();
  var parkList = $(".park_item"); //.find("li").text();

  for (var i = 0; i < parksResult.length; i++) {
    fullName = parksResult[i].fullName;
    console.log(parksResult[i].designation);
    parkCode = parksResult[i].parkCode;
    parkList.append(
      "<div class='w-25 mb-2 d-flex flex-column border border-1 p-2 justify-content-between' id=" +
        parkCode +
        "'><p>" +
        fullName +
        "<div class='text-end'><button class='" +
        parkCode +
        " btn btn-primary text-end'>View</button></p></div>"
    );
    $("." + parkCode).on("click", parkDetail);
  }
}

function parkAPI() {
  var parksResult = [];
  var stateCode = $(".state_selector")
    .children(".option_box")
    .find("#states option:selected")
    .val();

  console.log(stateCode);

  requestURL =
    "https://developer.nps.gov/api/v1/parks?stateCode=" +
    stateCode +
    "&limit=50&q=trail,hiking,mountain,ski,swim,rafting,biking&api_key=eFGyiFska6BcchqM5KEZhffuQaP0g9KYYikMaaqO";
  fetch(requestURL, {
    headers: {
      accept: "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var parksResult = data.data;
      latitude = parksResult[0].latitude;
      longitude = parksResult[0].longitude;
      parkCode = parksResult[0].parkCode;
      fullName = parksResult[0].fullName;
      console.log(parksResult);
      processParks(parksResult);
    });
}

var latitude;
var longitude;
var parkCode;
var fullName;

var description = "";
var designation = "";

//populate states into combobox
var button = $(".state_selector").children(".btn_container");
button.on("click", parkAPI);
var states = [
  {
    name: "Alabama",
    abbreviation: "AL",
  },
  {
    name: "Alaska",
    abbreviation: "AK",
  },
  {
    name: "American Samoa",
    abbreviation: "AS",
  },
  {
    name: "Arizona",
    abbreviation: "AZ",
  },
  {
    name: "Arkansas",
    abbreviation: "AR",
  },
  {
    name: "California",
    abbreviation: "CA",
  },
  {
    name: "Colorado",
    abbreviation: "CO",
  },
  {
    name: "Connecticut",
    abbreviation: "CT",
  },
  {
    name: "Delaware",
    abbreviation: "DE",
  },
  {
    name: "District Of Columbia",
    abbreviation: "DC",
  },
  {
    name: "Federated States Of Micronesia",
    abbreviation: "FM",
  },
  {
    name: "Florida",
    abbreviation: "FL",
  },
  {
    name: "Georgia",
    abbreviation: "GA",
  },
  {
    name: "Guam",
    abbreviation: "GU",
  },
  {
    name: "Hawaii",
    abbreviation: "HI",
  },
  {
    name: "Idaho",
    abbreviation: "ID",
  },
  {
    name: "Illinois",
    abbreviation: "IL",
  },
  {
    name: "Indiana",
    abbreviation: "IN",
  },
  {
    name: "Iowa",
    abbreviation: "IA",
  },
  {
    name: "Kansas",
    abbreviation: "KS",
  },
  {
    name: "Kentucky",
    abbreviation: "KY",
  },
  {
    name: "Louisiana",
    abbreviation: "LA",
  },
  {
    name: "Maine",
    abbreviation: "ME",
  },
  {
    name: "Marshall Islands",
    abbreviation: "MH",
  },
  {
    name: "Maryland",
    abbreviation: "MD",
  },
  {
    name: "Massachusetts",
    abbreviation: "MA",
  },
  {
    name: "Michigan",
    abbreviation: "MI",
  },
  {
    name: "Minnesota",
    abbreviation: "MN",
  },
  {
    name: "Mississippi",
    abbreviation: "MS",
  },
  {
    name: "Missouri",
    abbreviation: "MO",
  },
  {
    name: "Montana",
    abbreviation: "MT",
  },
  {
    name: "Nebraska",
    abbreviation: "NE",
  },
  {
    name: "Nevada",
    abbreviation: "NV",
  },
  {
    name: "New Hampshire",
    abbreviation: "NH",
  },
  {
    name: "New Jersey",
    abbreviation: "NJ",
  },
  {
    name: "New Mexico",
    abbreviation: "NM",
  },
  {
    name: "New York",
    abbreviation: "NY",
  },
  {
    name: "North Carolina",
    abbreviation: "NC",
  },
  {
    name: "North Dakota",
    abbreviation: "ND",
  },
  {
    name: "Northern Mariana Islands",
    abbreviation: "MP",
  },
  {
    name: "Ohio",
    abbreviation: "OH",
  },
  {
    name: "Oklahoma",
    abbreviation: "OK",
  },
  {
    name: "Oregon",
    abbreviation: "OR",
  },
  {
    name: "Palau",
    abbreviation: "PW",
  },
  {
    name: "Pennsylvania",
    abbreviation: "PA",
  },
  {
    name: "Puerto Rico",
    abbreviation: "PR",
  },
  {
    name: "Rhode Island",
    abbreviation: "RI",
  },
  {
    name: "South Carolina",
    abbreviation: "SC",
  },
  {
    name: "South Dakota",
    abbreviation: "SD",
  },
  {
    name: "Tennessee",
    abbreviation: "TN",
  },
  {
    name: "Texas",
    abbreviation: "TX",
  },
  {
    name: "Utah",
    abbreviation: "UT",
  },
  {
    name: "Vermont",
    abbreviation: "VT",
  },
  {
    name: "Virgin Islands",
    abbreviation: "VI",
  },
  {
    name: "Virginia",
    abbreviation: "VA",
  },
  {
    name: "Washington",
    abbreviation: "WA",
  },
  {
    name: "West Virginia",
    abbreviation: "WV",
  },
  {
    name: "Wisconsin",
    abbreviation: "WI",
  },
  {
    name: "Wyoming",
    abbreviation: "WY",
  },
];

states.forEach((state) => {
  $("#states").append(
    '<option value="' + state.abbreviation + '">' + state.name + "</option>"
  );
});
