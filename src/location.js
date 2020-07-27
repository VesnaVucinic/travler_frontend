class Location {
  constructor(location, locationAttributes) {
    this.id = location.id;
    this.name = locationAttributes.name;
    this.description = locationAttributes.description;
    this.image_url = locationAttributes.image_url;
    this.destination = locationAttributes.destination;
    Location.all.push(this);
  }

  renderLocationCard() {
    return `
              <div data-id="${this.id}">
                  <h2>${this.name}</h2>
                  <h4>${this.destination.name}</h4>
                  <p>${this.description}</p>
                  <img src="${this.image_url}" height="400" width="500">
                  <br>
                  <button data-id="${this.id}">Edit</button>
              </div>
              <br>
              <br>
            `;
  }
}

Location.all = [];
