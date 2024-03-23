function trailDetailDisplay() {
  $(".trail_container").children().show();
  $(".trail_details").children().show();
  $(".btn_trail").children().show();
  $(".park_container").children().hide();
  $(".park_details").children().hide();
  $(".trails_container").children().hide();
  $(".btn_park").children().hide();
}

function trailDetail(event) {
  trailDetailDisplay();
  var id = Number($(this).attr("id"));
  var trailItem = trailsResult[id];

  var name = trailItem.name;
  var city = trailItem.city;
  var state = trailItem.state;
  var directions = trailItem.directions;
  var description = trailItem.description;
  $(".trail_details").children().remove();

  var content = `
  <p class="details_content flex-wrap text-wrap  border border-1 p-1 bg-dark text-light">
    <b>Name:</b> ${name}<br/>
    <b>City:</b> ${city}<br/>
    <b>State:</b> ${state}<br/>
    <b>Directions:</b> ${directions}<br/>
    <b>Description:</b> ${description}</b>
  </p>
  <div class="w-100 d-flex flex-row flex-wrap btn_trail justify-content-end">
        <button class="btn btn-primary btn_home">Home</button>
        <button class="btn btn-primary ms-1 btn_back">Back</button>
  </div>
  `;

  $(".trail_details").append(content);
  $(".trail_container>.trail_details>.btn_trail>.btn_home").on(
    "click",
    parkDisplay
  );
  $(".trail_container>.trail_details>.btn_trail>.btn_back").on(
    "click",
    parkDetail_display
  );
}

function processTrails() {
  $(".trail_item").children().remove();
  var trailList = $(".trail_item");

  for (var i = 0; i < trailsResult.length; i++) {
    trailName = trailsResult[i].name;

    trailList.append(
      "<div class='w-25 mb-2 d-flex flex-column border border-1 p-2 justify-content-between' id=" +
        i +
        "'><p>" +
        trailName +
        "<div class='text-end'><button id='" +
        i +
        "' class='btn btn-primary text-end'>View</button></p></div>"
    );
    $("#" + i).on("click", trailDetail);
  }
}

async function getTrails() {
  requestURL =
    "https://trailapi-trailapi.p.rapidapi.com/activity/?lat=" +
    latitude +
    "&limit=25&lon=" +
    longitude +
    "&radius=25&q-activities_activity_type_name_eq=hiking";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "89c0abfbefmshb2be528e8343681p1b4d7bjsn081c9f5f6bc9",
      "X-RapidAPI-Host": "trailapi-trailapi.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(requestURL, options);
    const result = await response.json();
    console.log(result);
    trailsResult = Object.values(result);
    console.log(trailsResult);
    processTrails();
  } catch (error) {
    console.error(error);
  }
}

function parkDetail_display() {
  $(".park_container").children().hide();
  $(".trail_details").children().hide();
  $(".btn_trail").children().hide();
  $(".park_details").children().show();
  $(".trails_container").children().show();
  $(".btn_park").children().show();
}

function parkDetail(event) {
  parkDetail_display();
  var parkItem = parksResult.find(
    (element) => element.parkCode == $(this).attr("id")
  );
  console.log(parkItem);
  fullName = parkItem.fullName;
  var url = parkItem.directionsUrl;
  var designation = parkItem.designation;
  var description = parkItem.description;
  $(".park_details").children().remove();

  var content = `
  <p class="details_content flex-wrap text-wrap  border border-1 p-1 bg-dark text-light">
    <b>Full Name:</b> ${fullName}<br/>
    <b>URL:</b> <a href=${url}>${url}</a><br/>
    <b>Designation:</b> ${designation}<br/>
    <b>Description:</b> ${description}</b>
  </p>
  <div class="w-100 d-flex flex-row flex-wrap btn_park justify-content-end">
        <button class="btn btn-primary btn_home">Home</button>
        <!--button class="btn btn-primary ms-1 btn_book">Book</button-->
  </div>
  `;

  $(".park_details").append(content);
  $(".park_details>.btn_park>.btn_home").on("click", parkDisplay);

  getTrails();
}
function processParks(parksResult) {
  $(".park_item").children().remove();
  var parkList = $(".park_item");

  for (var i = 0; i < parksResult.length; i++) {
    fullName = parksResult[i].fullName;
    parkCode = parksResult[i].parkCode;
    longitude = parksResult[i].longitude;
    latitude = parksResult[i].latitude;
    console.log("latitude " + latitude + "longitude " + longitude);
    parkList.append(
      "<div class='w-25 mb-2 d-flex flex-column border border-1 p-2 justify-content-between' id=" +
        parkCode +
        "'><p>" +
        fullName +
        "<div class='text-end'><button id='" +
        parkCode +
        "' class='" +
        parkCode +
        " btn btn-primary text-end'>View</button></p></div>"
    );
    $("." + parkCode).on("click", parkDetail);
  }
}

function parkDisplay() {
  $(".park_container").children().show();
  $(".park_details").children().hide();
  $(".trails_container").children().hide();
  $(".btn_park").children().hide();
  $(".trail_container").children().hide();
  $(".trail_details").children().hide();
  $(".btn_trail").children().hide();
}

function parkAPI() {
  parkDisplay();
  var stateCode = $(".state_selector")
    .children(".option_box")
    .find("#states option:selected")
    .val();

  var requestURL =
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
      parksResult = data.data;

      processParks(parksResult);
    });
}

var trailName = "";
var fullName = "";
var iBookings = 0;
var booking = [];
var parksResult = [];
var trailsResult = [];

var latitude;
var longitude;
var parkCode;
var fullName;

var description = "";
var designation = "";

$(".park_details").hide();
$(".park_container").children().hide();
$(".trails_container").children().hide();
$(".trail_container").children().hide();
var buttonPark = $(".state_selector").children(".btn_container");
buttonPark.on("click", parkAPI);
//console.log($(".state_selector").children(".btn_container").children('input[name="paramName"]').val());
console.log($(".state_selector>.btn_container>#btn_search").text());

//var buttonTrail = $(".parkDetails").children(".btn_park");
//buttonTrail.on("click", parkDisplay);

//populate states into combobox
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