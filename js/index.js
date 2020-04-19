
var map;
var markers = [];
var infoWindow;
var locationSelect;

function initMap() {
      var malta = {lat: 35.9375, lng: 14.3754};
      map = new google.maps.Map(document.getElementById('map'), {
        center: malta,
        zoom: 11,
        mapTypeId: 'roadmap',
  });
}