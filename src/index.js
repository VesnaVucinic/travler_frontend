const baseURL = "http://localhost:3000/api/v1/locations";

document.addEventListener("DOMContentLoaded", () => {
  // gets all the loactions once the domcontent is loaded.
  getLocations();

  const createLocationForm = document.querySelector("#create-location-form");

  createLocationForm.addEventListener("submit", (e) => createFormHandler(e));

  const sortButton = document.querySelector("#sort-locations");
  sortButton.addEventListener("click", (e) => sortLocations());
});

function sortLocations() {
  document.querySelector("#location-container").innerHTML = "";
  // fecth GET to get locations
  fetch(baseURL)
    .then((response) => response.json())
    .then((locations) => {
      // sort by name
      locations.data.sort(function (a, b) {
        var nameA = a.attributes.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.attributes.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      // console.log(locations.data);
      locations.data.forEach((location) => {
        let newLocation = new Location(location, location.attributes);
        document.querySelector(
          "#location-container"
        ).innerHTML += newLocation.renderLocationCard();
      });
    });
}

function getLocations() {
  // GET request
  fetch(baseURL)
    .then((response) => response.json())
    .then((locations) => {
      locations.data.forEach((location) => {
        let newLocation = new Location(location, location.attributes);
        document.querySelector(
          "#location-container"
        ).innerHTML += newLocation.renderLocationCard();
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
      let newLocation = new Location(locationData, locationData.attributes);
      document.querySelector(
        "#location-container"
      ).innerHTML += newLocation.renderLocationCard();
      document.querySelector("#create-location-form").reset();
    });
}
