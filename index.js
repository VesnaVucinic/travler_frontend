const baseURL = "http://localhost:3000/api/v1/locations";

document.addEventListener("DOMContentLoaded", () => {
  getLocations();
});

function getLocations() {
  fetch(baseURL)
    .then((response) => response.json())
    .then((locations) => {
      console.log(locations);
    });
}
