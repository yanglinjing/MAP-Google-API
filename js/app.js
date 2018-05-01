

function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
      center: initialPlaces[0].location,
      zoom: 13
    });

    ko.applyBindings(new ViewModel());
}
