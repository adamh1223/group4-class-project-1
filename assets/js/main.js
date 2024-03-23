//API call scripts
const apiKey = 'UeGIVNK3jgylK7Eyl4UiLatvibYiM5dwuUAoyp8u';
const states = [{
    code: 'AL',
    name: 'Alabama'
  },
  {
    code: 'AK',
    name: 'Alaska'
  },
  {
    code: 'AZ',
    name: 'Arizona'
  },
  {
    code: 'AR',
    name: 'Arkansas'
  },
  {
    code: 'CA',
    name: 'California'
  },
  {
    code: 'CO',
    name: 'Colorado'
  },
  {
    code: 'CT',
    name: 'Connecticut'
  },
  {
    code: 'DE',
    name: 'Delaware'
  },
  {
    code: 'FL',
    name: 'Florida'
  },
  {
    code: 'GA',
    name: 'Georgia'
  },
  {
    code: 'HI',
    name: 'Hawaii'
  },
  {
    code: 'ID',
    name: 'Idaho'
  },
  {
    code: 'IL',
    name: 'Illinois'
  },
  {
    code: 'IN',
    name: 'Indiana'
  },
  {
    code: 'IA',
    name: 'Iowa'
  },
  {
    code: 'KS',
    name: 'Kansas'
  },
  {
    code: 'KY',
    name: 'Kentucky'
  },
  {
    code: 'LA',
    name: 'Louisiana'
  },
  {
    code: 'ME',
    name: 'Maine'
  },
  {
    code: 'MD',
    name: 'Maryland'
  },
  {
    code: 'MA',
    name: 'Massachusetts'
  },
  {
    code: 'MI',
    name: 'Michigan'
  },
  {
    code: 'MN',
    name: 'Minnesota'
  },
  {
    code: 'MS',
    name: 'Mississippi'
  },
  {
    code: 'MO',
    name: 'Missouri'
  },
  {
    code: 'MT',
    name: 'Montana'
  },
  {
    code: 'NE',
    name: 'Nebraska'
  },
  {
    code: 'NV',
    name: 'Nevada'
  },
  {
    code: 'NH',
    name: 'New Hampshire'
  },
  {
    code: 'NJ',
    name: 'New Jersey'
  },
  {
    code: 'NM',
    name: 'New Mexico'
  },
  {
    code: 'NY',
    name: 'New York'
  },
  {
    code: 'NC',
    name: 'North Carolina'
  },
  {
    code: 'ND',
    name: 'North Dakota'
  },
  {
    code: 'OH',
    name: 'Ohio'
  },
  {
    code: 'OK',
    name: 'Oklahoma'
  },
  {
    code: 'OR',
    name: 'Oregon'
  },
  {
    code: 'PA',
    name: 'Pennsylvania'
  },
  {
    code: 'RI',
    name: 'Rhode Island'
  },
  {
    code: 'SC',
    name: 'South Carolina'
  },
  {
    code: 'SD',
    name: 'South Dakota'
  },
  {
    code: 'TN',
    name: 'Tennessee'
  },
  {
    code: 'TX',
    name: 'Texas'
  },
  {
    code: 'UT',
    name: 'Utah'
  },
  {
    code: 'VT',
    name: 'Vermont'
  },
  {
    code: 'VA',
    name: 'Virginia'
  },
  {
    code: 'WA',
    name: 'Washington'
  },
  {
    code: 'WV',
    name: 'West Virginia'
  },
  {
    code: 'WI',
    name: 'Wisconsin'
  },
  {
    code: 'WY',
    name: 'Wyoming'
  }
];

const stateInput = document.getElementById('state-input');
states.forEach(state => {
  const option = document.createElement('option');
  option.value = state.code;
  option.textContent = state.name;
  stateInput.appendChild(option);
});

async function searchParks() {
  const stateCode = document.getElementById('state-input').value.trim().toUpperCase();
  if (stateCode === '') {
    showErrorModal('Please select a state.');
    return;
  }

  const apiUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayParks(data);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    showErrorModal('There was a problem fetching data. Please try again later.');
  }
}

async function displayParks(data) {
  const parkList = document.getElementById('park-list');
  parkList.innerHTML = '';

  if (!data || data.data.length === 0) {
    parkList.innerHTML =
      '<div class="alert alert-danger" role="alert">No state parks found in the selected state.</div>';
  } else {
    const storedVisitedParks = JSON.parse(localStorage.getItem('visitedParks')) || {};
    data.data.forEach(park => {
      const visited = storedVisitedParks[park.fullName] || false;
      const listItem = document.createElement('div');
      listItem.classList.add('card', 'mt-3');
      listItem.innerHTML = `
        <div class="card-body">
          <h5 class="card-title"><a href="${park.url}" target="_blank" class="text-info">${park.fullName}</a></h5>
          <p class="card-text">${park.description}</p>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="${park.fullName}" ${visited ? 'checked' : ''} onchange="toggleVisited(this)">
            <label class="form-check-label" for="${park.fullName}">
              Visited
            </label>
          </div>
          <button class="btn btn-secondary" onclick="findTrails('${park.latitude}', '${park.longitude}', '${park.fullName}')">Find Trails Nearby</button>
        </div>
      `;
      parkList.appendChild(listItem);
    });
  }
}

async function toggleVisited(checkbox) {
  const parkName = checkbox.id;
  const storedVisitedParks = JSON.parse(localStorage.getItem('visitedParks')) || {};
  storedVisitedParks[parkName] = checkbox.checked;
  localStorage.setItem('visitedParks', JSON.stringify(storedVisitedParks));
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
        <div class="p-2">
          <p><strong>Name:</strong> ${trail.name}</p>
          <p><strong>City:</strong> ${trail.city}</p>
          <p><strong>State:</strong> ${trail.state}</p>
          <p><strong>Country:</strong> ${trail.country}</p>
          <p><strong>Description:</strong> ${trail.description}</p>
          <p><strong> Latitute:</strong> ${trail.lat}</p>
          <p><strong>Longitude:</strong> ${trail.lon}</p>
        </div>
          <hr>
        `;
      }).join('');

      // Create a Bootstrap modal
      const modal = `
        <div class="modal fade" id="trailModal" tabindex="-1" role="dialog" aria-labelledby="trailModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title m-2" id="trailModalLabel">${parkName} Trails</h5>
                <button type="button" class="close btn btn-secondary m-2 position-absolute top-0 end-0" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" id="modal-body">
                ${modalContent}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      `;

      // Remove any existing modal
      $('#trailModal').remove();

      // Append the modal to the body
      document.body.insertAdjacentHTML('beforeend', modal);

      // Show the modal
      $('#trailModal').modal('show');

      function onClose(){
        $('#trailModal').modal('hide');
      }

      $('.btn').on('click', onClose)

      // Clear modal content on close
      $('#trailModal').on('hidden.bs.modal', function (e) {
        $('#modal-body').empty();
      });

    } else {
      // No trails found
      showErrorModal('No hiking trails found nearby.');
    }
  } catch (error) {
    console.error(error);
    showErrorModal('There was a problem fetching hiking trails. Please try again later.');
  }
}

function showErrorModal(errorMessage) {
  const modal = `
    <div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-labelledby="errorModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="errorModalLabel">Error</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ${errorMessage}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Remove any existing error modal
  $('#errorModal').remove();

  // Append the error modal to the body
  document.body.insertAdjacentHTML('beforeend', modal);

  // Show the error modal
  $('#errorModal').modal('show');
}