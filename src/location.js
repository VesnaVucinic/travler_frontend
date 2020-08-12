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
              <div data-id="${this.id}" class="card">
                  <h2>${this.name}</h2>
                  <em><p>Destination Type: ${this.destination.name}</p></em>
                  <p>${this.description}</p>
                  <img src="${this.image_url}" height="400" width="500">
                  <br>
                  <button type="submit" data-id="${this.id}" class="delete">Delete</button>
              </div>
              <br>
              <br>
            `;
  }

  // static findById(id) {
  //   return this.all.find((location) => location.id === id);
  // }
}

Location.all = [];

// edit button option for renderLocationCard -> <button data-id="${this.id}">Edit</button>
