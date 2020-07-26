const baseURL = "http://localhost:3000/api/v1/locations";

document.addEventListener("DOMContentLoaded", () => {
  getLocations();

  const createLocationForm = document.querySelector("#create-location-form");

  createLocationForm.addEventListener("submit", (e) => createFormHandler(e));
});

function getLocations() {
  // GET request
  fetch(baseURL)
    .then((response) => response.json())
    .then((locations) => {
      locations.data.forEach((location) => {
        const locationMarkup = `
            <div data-id="${location.id}">
                <h2>${location.attributes.name}</h2>
                <h4>${location.attributes.destination.name}</h4>
                <p>${location.attributes.description}</p>
                <img src="${location.attributes.image_url}" height="400" width="500">
                <br>
                <button data-id="${location.id}">Edit</button>
            </div>
            <br>
            <br>
          `;
        document.querySelector(
          "#location-container"
        ).innerHTML += locationMarkup;
      });
    });
}

function createFormHandler(e) {
  e.preventDefault();
  const locationNameInput = document.querySelector("#input-name").value;
  const locationDescriptionInput = document.querySelector("#input-description")
    .value;
  const locationImageInput = document.querySelector("#input-url").value;
  const locationDestinationInputId = parseInt(
    document.querySelector("#destinations").value
  );
  postFetch(
    locationNameInput,
    locationDescriptionInput,
    locationImageInput,
    locationDestinationInputId
  );
}

function postFetch(name, description, image_url, destination_id) {
  const bodyData = { name, description, image_url, destination_id };
  // POST request
  fetch(baseURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  })
    .then((response) => response.json())
    .then((location) => {
      // console.log(location);
      const locationData = location.data;
      const locationMarkup = `
            <div data-id="${locationData.id}">
                <h2>${locationData.attributes.name}</h2>
                <h4>${locationData.attributes.destination.name}</h4>
                <p>${locationData.attributes.description}</p>
                <img src="${locationData.attributes.image_url}" height="400" width="500">
                <br>
                <button data-id="${locationData.id}">Edit</button>
            </div>
            <br>
            <br>
          `;
      document.querySelector("#location-container").innerHTML += locationMarkup;
    });
}
