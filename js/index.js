
var map;
var markers = [];
var infoWindow;
var locationSelect;

function initMap() {
      var losAngeles = {lat: 34.063380, lng: -118.358080};
      map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 11,
          styles: [
              {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
              {
                  featureType: 'administrative.locality',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
              },
              {
                  featureType: 'poi',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
              },
              {
                  featureType: 'poi.park',
                  elementType: 'geometry',
                  stylers: [{color: '#263c3f'}]
              },
              {
                  featureType: 'poi.park',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#6b9a76'}]
              },
              {
                  featureType: 'road',
                  elementType: 'geometry',
                  stylers: [{color: '#38414e'}]
              },
              {
                  featureType: 'road',
                  elementType: 'geometry.stroke',
                  stylers: [{color: '#212a37'}]
              },
              {
                  featureType: 'road',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#9ca5b3'}]
              },
              {
                  featureType: 'road.highway',
                  elementType: 'geometry',
                  stylers: [{color: '#746855'}]
              },
              {
                  featureType: 'road.highway',
                  elementType: 'geometry.stroke',
                  stylers: [{color: '#1f2835'}]
              },
              {
                  featureType: 'road.highway',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#f3d19c'}]
              },
              {
                  featureType: 'transit',
                  elementType: 'geometry',
                  stylers: [{color: '#2f3948'}]
              },
              {
                  featureType: 'transit.station',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
              },
              {
                  featureType: 'water',
                  elementType: 'geometry',
                  stylers: [{color: '#17263c'}]
              },
              {
                  featureType: 'water',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#515c6d'}]
              },
              {
                  featureType: 'water',
                  elementType: 'labels.text.stroke',
                  stylers: [{color: '#17263c'}]
              }
          ],
        mapTypeId: 'roadmap',
  });
    infoWindow = new google.maps.InfoWindow();
    searchStores();

}

function searchStores() {
    var foundStores = [];
    var zipCode = document.getElementById('zip-code-input').value;
    if(zipCode){
        stores.forEach(function (store, index) {
            var postal = store.address.postalCode.substring(0,5);
            if(postal == zipCode){
                foundStores.push(store);
            }
        })
    }else {
        foundStores = stores;
    }


    clearLocations();
    displayStores(foundStores);
    showStoreMarkers(foundStores);
    setOnClickListener()
}

function clearLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;
}

function setOnClickListener() {
    var storeElements = document.querySelectorAll('.store-container');
    storeElements.forEach(function (elem, index) {
        elem.addEventListener('click', function () {
            new google.maps.event.trigger(markers[index], 'click');
        })
    })
}

function displayStores(stores){
    var storesHtml = '';
    stores.forEach(function(store, index) {
        var address = store.addressLines;
        var phone = store.phoneNumber;

        storesHtml += `
            <div class="store-container">
                <div class="store-container-background">
                    <div class="store-info-container">
                        <div class="store-address">
                            <span>${address[0]}</span>
                            <span>${address[1]}</span>
                        </div>
                        <div class="store-phone-number">
                            ${phone}
                        </div>
                    </div>
                    <div class="store-number-container">
                        <div class="store-number">${index+1}</div>
                    </div>
                </div>
             </div>
        `
    });

    document.querySelector('.stores-list').innerHTML = storesHtml;
}

function showStoreMarkers(stores) {
    var bounds = new google.maps.LatLngBounds();
    stores.forEach(function (store, index) {
        var latlng = new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude);

        var number = store.phoneNumber;
        var open = store.openStatusText;
        var name = store.name;
        var address = store.addressLines[0];
        createMarker(latlng, name, address, number, open, index);
        bounds.extend(latlng);
    });
    map.fitBounds(bounds);
}

function createMarker(latlng, name, address, number, open, index) {
    var image = 'images/moneyheist.png';
    var html = "<b>" + name + "</b> <br><br/>" + address + "<br> <br/> <hr>" + "<i class='fas fa-phone-alt'></i> " + number + "<br> <br/> <hr>" + open;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        number: number,
        open:open,
        icon:image
        // label: `${index+1}`
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);
}