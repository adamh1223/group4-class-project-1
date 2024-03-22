//Welcome Modal Script Begins
// var modal = document.getElementById("modal_body");
// var mainContent = document.getElementById("container");
// var headerContent = document.getElementById("header_content");
// var modalButton = document.getElementById("modal_button");

//Open the modal on page load
// window.onload = function displayModal() {
//     modal.style.display = "block";
//     mainContent.style.filter = "blur(4px)";
//     headerContent.style.filter = "blur(4px)";    
// };

//Close the modal on button click
// modalButton.onclick = function closeModal() {
//     modal.style.display = "none";
//     mainContent.style.filter = "blur(0px)";
//     headerContent.style.filter = "blur(0px)";
// };
//Welcome Modal Script Ends

//API call scripts
const apiKey = 'UeGIVNK3jgylK7Eyl4UiLatvibYiM5dwuUAoyp8u';
const stateCodes = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
  'KS',
  'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
  'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const stateInput = document.getElementById('state-input');
stateCodes.forEach(code => {
  const option = document.createElement('option');
  option.value = code;
  option.textContent = code;
  stateInput.appendChild(option);
});

async function searchParks() {
  const stateCode = document.getElementById('state-input').value.trim().toUpperCase();
  if (stateCode === '') {
    alert('Please select a state code.');
    return;
  }

  const apiUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayParks(data);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    alert('There was a problem fetching data. Please try again later.');
  }
}

async function displayParks(data) {
  const parkList = document.getElementById('park-list');
  parkList.innerHTML = '';

  if (!data || data.data.length === 0) {
    parkList.innerHTML =
      '<div class="alert alert-danger" role="alert">No state parks found in the selected state.</div>';
  } else {
    data.data.forEach(park => {
      const listItem = document.createElement('div');
      listItem.classList.add('card', 'mt-3');
      listItem.innerHTML = `
        <div class="card-body">
          <h5 class="card-title"><a href="${park.url}" target="_blank" class="text-info">${park.fullName}</a></h5>
          <p class="card-text">${park.description}</p>
          <button class="btn btn-secondary" onclick="findTrails('${park.latitude}', '${park.longitude}', '${park.fullName}')">Find Trails Nearby</button>
        </div>
      `;
      parkList.appendChild(listItem);
    });
  }
}

async function findTrails(latitude, longitude, parkName) {
  const apiUrl =
    `https://trailapi-trailapi.p.rapidapi.com/activity/?lat=${latitude}&lon=${longitude}&radius=25&q-activities_activity_type_name_eq=hiking`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '08d9e2e83fmshb99660e611d154fp174571jsnc99c04c20d12',
      'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.json();

    if (result && Object.keys(result).length > 0) {
      const trails = Object.values(result);
      const modalContent = trails.map(trail => {
        return `
          <strong>Name:</strong> ${trail.name}<br>
          <strong>City:</strong> ${trail.city}<br>
          <strong>State:</strong> ${trail.state}<br>
          <strong>Country:</strong> ${trail.country}<br>
          <strong>Description:</strong> ${trail.description}<br>
          <strong>Directions:</strong> ${trail.directions}<br>
          <strong> Latitute:</strong> ${trail.lat}<br>
          <strong>Longitude:</strong> ${trail.lon}<br>
          <hr>
        `;
      }).join('');

      // Create a Bootstrap modal
      const modal = `
        <div class="modal fade" id="trailModal" tabindex="-1" role="dialog" aria-labelledby="trailModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="trailModalLabel">${parkName} Trails</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ${modalContent}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      `;

      // Append the modal to the body
      document.body.insertAdjacentHTML('beforeend', modal);

      // Show the modal
      $('#trailModal').modal('show');
    } else {
      // No trails found
      alert('No hiking trails found nearby.');
    }
  } catch (error) {
    console.error(error);
    alert('There was a problem fetching hiking trails. Please try again later.');
  }
};