/*const url = `https://developer.nps.gov/api/v1/parks?limit=496&api_key=eFGyiFska6BcchqM5KEZhffuQaP0g9KYYikMaaqO`;

function getData() {
  //
  fetch(url)
    .then((resp) => {
      if (!resp.ok) throw new Error('was not a valid response');
      return resp.json();
    })
    .then((data) => {
      //console.log(data);
      const result = data.data.filter((park) => park.states === 'CA');
      console.log(data);


      console.log(result);
    })
    .catch((err) => {
      console.warn(err.message);
    });
};

getData();
*/
/*
async function getSomething() {

const url = 'https://trailapi-trailapi.p.rapidapi.com/trails/%7Bid%7D/maps/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c113e84c8dmsh8e32fb6c144dc82p1fe22ajsnfb77d6512dab',
		'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
};

getSomething();

*/
