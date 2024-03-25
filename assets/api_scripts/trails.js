//view for trails detail using JQuery Navigation on trees
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
  //using the array index for the buttons click events
  var id = Number($(this).attr("id"));
  //add API data to local variables
  var trailItem = trailsResult[id];

  var name = trailItem.name;
  var city = trailItem.city;
  var state = trailItem.state;
  var directions = trailItem.directions;
  var description = trailItem.description;
  //remove old trail HTML and apply dynamic HTML for the new data
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
  //JQuery to add the new HTML content to the trail details class node
  $(".trail_details").append(content);
  //add events for the new Home and Back buttons to display different views
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
  //Removing old data for trails and adding the new trails
  $(".trail_item").children().remove();
  //on the trail item class node add each trail
  //add a button on each trail with a click event that reference the array index used for data
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
//asynchronous function to wait for responses and data from the API
async function getTrails() {
  //call to the trails API with a key a host and parameters
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
    //result was an unknown key with an object for a result
    //add the object to my array
    trailsResult = Object.values(result);
    processTrails();
  } catch (error) {
    console.error(error);
  }
}
//JQuery tree traversal for the parkdetail view
function parkDetail_display() {
  $(".park_container").children().hide();
  $(".trail_details").children().hide();
  $(".btn_trail").children().hide();
  $(".park_details").children().show();
  $(".trails_container").children().show();
  $(".btn_park").children().show();
}

//I probably place an extra step here after I encountered an error
//just getting the global Park Code for the Park Detail function
function bookingPark(event) {
  $(".state_selector>.bookingsContainer>#collapse_bookings").modal("hide");
  bBook = true;
  parkCode = $(this).attr("id");
  parkDetail();
  bBook = false;
}
function parkDetail() {
  parkDetail_display();
  var parkItem;
  var url;
  var designation;
  var directions;
  var description;

  //searched data from the NPS Array
  //Store the API data into variables
  if (!bBook) {
    parkItem = parksResult.find(
      (element) => element.parkCode == $(this).attr("id")
    );
    parkCode = $(this).attr("id");
    fullName = parkItem.fullName;
    stateCode = parkItem.states;
    url = parkItem.directionsUrl;
    designation = parkItem.designation;
    directions = parkItem.directionsInfo;
    description = parkItem.description;
    //Booking data from the Booking array for placed park bookings
  } else {
    parkItem = bookingsStorage.find((element) => element.parkCode == parkCode);

    fullName = parkItem.fullName;
    stateCode = parkItem.stateCode;
    url = parkItem.url;
    designation = parkItem.designation;
    directions = parkItem.directions;
    description = parkItem.description;
  }

  //remove the old park detail elements and replace it with the incoming data
  $(".park_details").children().remove();

  var content = `
  <p class="details_content flex-wrap text-wrap  border border-1 p-1 bg-dark text-light">
    <b>Full Name:</b> ${fullName}<br/>
    <b>State Code:</b> ${stateCode}<br/>
    <b>URL:</b> <a href=${url}>${url}</a><br/>
    <b>Designation:</b> ${designation}<br/>
    <b>Directions:</b> ${directions}<br/>
    <b>Description:</b> ${description}</b>
  </p>
  <div class="w-100 d-flex flex-row flex-wrap btn_park justify-content-end">
        <button class="btn btn-primary btn_home">Home</button>
        <button class="btn btn-primary ms-1 btn_book">Book</button>
  </div>
  `;

  //add the new HTML and add events to view the Home View or add a new booking
  $(".park_details").append(content);
  $(".park_details>.btn_park>.btn_home").on("click", parkDisplay);
  $(".park_details>.btn_park>.btn_book").on("click", bookings);
  //set the longitude and latitude for the park to retrieve data from the Trails API
  longitude = parkItem.longitude;
  latitude = parkItem.latitude;
  getTrails();
}

function processParks(parksResult) {
  //remove old park elements and add new elements with the current data
  $(".park_item").children().remove();
  var parkList = $(".park_item");

  for (var i = 0; i < parksResult.length; i++) {
    fullName = parksResult[i].fullName;
    parkCode = parksResult[i].parkCode;
    longitude = parksResult[i].longitude;
    latitude = parksResult[i].latitude;

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
    //add a button to view the details on the park
    $("." + parkCode).on("click", parkDetail);
  }
}

//elements to show and hide for the home screen
function parkDisplay() {
  $(".park_container").children().show();
  $(".park_details").children().hide();
  $(".trails_container").children().hide();
  $(".btn_park").children().hide();
  $(".trail_container").children().hide();
  $(".trail_details").children().hide();
  $(".btn_trail").children().hide();
  $(".state_selector").children(".option_box").val(stateCode);
}
//from local storage readd the bookings list
function reAddBookings() {
  //handle whether data exists or not
  if (bookingsStorage && bookingsStorage.length > 0) {
    iBookings = bookingsStorage.length;
  } else {
    iBookings++;
  }

  //add the Boostrap collapsible elements with the number of parks booked
  var bookingCount = $(".state_selector>.bookingsContainer>.btn_bookings");
  bookingCount.text("Click to view bookings(" + iBookings + ")");

  var newItem = $(
    ".state_selector>.bookingsContainer>#collapse_bookings>.modal-dialog>.modal-content>.modal-body"
  );
  var newDiv =
    "<div name=" +
    stateCode +
    " id=" +
    parkCode +
    " class=text-primary>" +
    fullName +
    "</div>";
  newItem.append(newDiv);
  //using the unique parkcode to set the click event when the booking is clicked
  clickItem = $(
    ".state_selector>.bookingsContainer>#collapse_bookings>.modal-dialog>.modal-content>.modal-body>#" +
      parkCode
  );
  clickItem.on("click", bookingPark);
}
function bookings() {
  //get the data in the NPS array that matches the current park viewed
  //Then retrieve the data to store in the Booking array
  var result = parksResult.find((x) => x.parkCode == parkCode);
  fullName = result.fullName;
  var stateCode = result.states;
  var url = result.directionsUrl;
  var designation = result.designation;
  var directions = result.directionsInfo;
  var description = result.description;
  longitude = result.longitude;
  latitude = result.latitude;

  //handle whether bookings exist or not for the count
  if (bookingsStorage && bookingsStorage.length > 0) {
    iBookings = bookingsStorage.length + 1;
  } else {
    iBookings++;
  }

  //refresh the Bootstrap  collapsible with the new count
  var bookingCount = $(".state_selector>.bookingsContainer>.btn_bookings");
  bookingCount.text("Click to view bookings(" + iBookings + ")");
  bookingsStorage.push({
    stateCode: stateCode,
    parkCode: parkCode,
    fullName: fullName,
    url: url,
    designation: designation,
    directions: directions,
    description: description,
    latitude: latitude,
    longitude: longitude,
  });

  //set local storage for the bookings and NPS data
  localStorage.setItem("bookingsStorage", JSON.stringify(bookingsStorage));
  localStorage.setItem("parksResult", JSON.stringify(parksResult));

  var newItem = $(
    ".state_selector>.bookingsContainer>#collapse_bookings>.modal-dialog>.modal-content>.modal-body"
  );
  var newDiv =
    "<div name=" +
    stateCode +
    " id=" +
    parkCode +
    " class=text-primary>" +
    fullName +
    "</div>";
  newItem.append(newDiv);
  //using the unique parkcode to set the click event when the booking is clicked
  clickItem = $(
    ".state_selector>.bookingsContainer>#collapse_bookings>.modal-dialog>.modal-content>.modal-body>#" +
      parkCode
  );
  clickItem.on("click", bookingPark);
}

//the NPS API
function parkAPI() {
  //get the state code from the combobox value
  parkDisplay();
  stateCode = $(".state_selector")
    .children(".option_box")
    .find("#states option:selected")
    .val();

  //request to send the NPS API with query paramaters, mainly state, the API key and the endpoints
  var requestURL =
    "https://developer.nps.gov/api/v1/parks?stateCode=" +
    stateCode +
    "&limit=50&q=trail,hiking,mountain,ski,swim,rafting,biking&api_key=eFGyiFska6BcchqM5KEZhffuQaP0g9KYYikMaaqO";
  fetch(requestURL, {
    headers: {
      accept: "application/json",
    },
  })
    //200?
    .then(function (response) {
      return response.json();
    })
    //populate the data into an array
    .then(function (data) {
      parksResult = data.data;

      processParks(parksResult);
    });
}

var trailName = "";
var fullName = "";
var parkCode = "";
var stateCode = "";
var iBookings = 0;
var bookingsStorage = [];
var parksResult = [];
var trailsResult = [];
var bBook = false;

//pulling local storage bookings and last state search data
bookingsStorage = JSON.parse(localStorage.getItem("bookingsStorage"));
parksResult = JSON.parse(localStorage.getItem("parksResult"));

$(document).ready(function () {
  if (bookingsStorage && parksResult) {
    //reset the state combobox if there are items in local storage
    stateCode = bookingsStorage[bookingsStorage.length - 1].stateCode;

    $(".state_selector>.option_box>#states").val(stateCode);
    //rerun the NPS API and process the data
    parkAPI();
    //reset the bookings list
    for (var i = 0; i < bookingsStorage.length; i++) {
      parkCode = bookingsStorage[i].parkCode;
      fullName = bookingsStorage[i].fullName;
      stateCode = bookingsStorage[i].stateCode;
      reAddBookings();
    }
    //Local Storage doesn't exist
  } else {
    bookingsStorage = [];
  }
});

var latitude;
var longitude;
var parkCode;
var fullName;

var description = "";
var designation = "";

//set the main screen view
$(".park_details").hide();
$(".park_container").children().hide();
$(".trails_container").children().hide();
$(".trail_container").children().hide();

//click event for the park search button to run the NPS API
var buttonPark = $(".state_selector").children(".btn_container");
buttonPark.on("click", parkAPI);

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
