//git test
var requestURL =
  "https://developer.nps.gov/api/v1/activities?api_key=eFGyiFska6BcchqM5KEZhffuQaP0g9KYYikMaaqO";
/*uncomment to view Activities data fetch(requestURL)
  .then(function (response) {
    // console.log(response.json());
    return response.json();
  })
  .then(function (data) {
    //console.log(data);
    console.log(data.data[0]);
    var activities = data.data;
    console.log("id: " + activities[0].id + " name: " + activities[0].name);
    for (var i = 0; i < activities.length; i++) {
      console.log("id: " + activities[i].id + " name: " + activities[i].name);
    }
  });

  var requestURL =
  "https://developer.nps.gov/api/v1/activities?api_key=eFGyiFska6BcchqM5KEZhffuQaP0g9KYYikMaaqO";
fetch(requestURL)
  .then(function (response) {
    // console.log(response.json());
    return response.json();
  })
  .then(function (data) {
    //console.log(data);
    console.log(data.data[0]);
    var activities = data.data;
    console.log("id: " + activities[0].id + " name: " + activities[0].name);
    for (var i = 0; i < activities.length; i++) {
      console.log("id: " + activities[i].id + " name: " + activities[i].name);
    }
  });
  end Activities comment*/

var longitude = 0;
var latitude = 0;

requestURL =
  "https://developer.nps.gov/api/v1/parks?parkCode=yose&api_key=eFGyiFska6BcchqM5KEZhffuQaP0g9KYYikMaaqO";
fetch(requestURL, {
  headers: {
    accept: "application/json",
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //console.log(data);
    //console.log(data.data[0]);
    //comment to remove bike info from the console
    var yosemite = data.data;
    latitude = yosemite[0].latitude;
    longitude = yosemite[0].longitude;
    bikes(latitude, longitude);
    //end bike comment
    /* uncomment to view Yosemite data in the console console.log(
      "id: " +
        yosemite[0].id +
        " park code: " +
        yosemite[0].parkCode +
        " description: " +
        yosemite[0].description +
        " designation: " +
        yosemite[0].designation +
        " full name: " +
        yosemite[0].fullName +
        " latitude: " +
        yosemite[0].latitude +
        " longitude: " +
        yosemite[0].longitude
    );
   end Yosemite Comment*/
  });

//this is the RapidIO Server Side API call
function bikes(latitude, longitude) {
  console.log(latitude + " " + longitude);

  requestURL =
    "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&radius=100";
  fetch(requestURL, {
    headers: {
      "X-RapidAPI-Key": "89c0abfbefmshb2be528e8343681p1b4d7bjsn081c9f5f6bc9",
      "X-RapidAPI-Host": "trailapi-trailapi.p.rapidapi.com",
    },
  })
    .then(function (response) {
      // console.log(response.json());
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
  return;
}
