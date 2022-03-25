
function initMap() {
    // Create the map.
    const pyrmont = { lat: 28.1870336, lng: 76.6312448 };
    const map = new google.maps.Map(document.getElementById("map"), {
      center: pyrmont,
      zoom: 17,
      mapId: "8d193001f940fde3",
    });
    // Create the places service.
    const service = new google.maps.places.PlacesService(map);
    let getNextPage;
    const moreButton = document.getElementById("more");
  
    moreButton.onclick = function () {
      moreButton.disabled = true;
      if (getNextPage) {
        getNextPage();
      }
    };
  
    // Perform a nearby search.
    service.nearbySearch(
      { location: pyrmont, radius: 5000, type: "hospital" },
      (results, status, pagination) => {
        if (status !== "OK" || !results) return;
  
        addPlaces(results, map);
        moreButton.disabled = !pagination || !pagination.hasNextPage;
        if (pagination && pagination.hasNextPage) {
          getNextPage = () => {
            // Note: nextPage will call the same handler function as the initial call
            pagination.nextPage();
          };
        }
      }
    );
  }
  
function addPlaces(places, map) {
  const placesList = document.getElementById("places");
  const ListOfHospitals=[];
  for (const place of places) {
    if (place.geometry && place.geometry.location) {
      const image = {
        url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
  
        // new google.maps.Marker({
        //   map,
        //   icon: image,
        //   title: place.name,
        //   position: place.geometry.location,
        // });
        const li = document.createElement("li");
  
        li.textContent = place.name;
        placesList.appendChild(li);
        ListOfHospitals.push(li.innerText);
        
        li.addEventListener("click", () => {
          map.setCenter(place.geometry.location);
        });
       
      }
    }
    const firebaseConfig = {
      apiKey: "AIzaSyCxj5MbXIVZvx03g0vW-7WuGEQk5kGl0XA",
      authDomain: "sahyogportal-6ef34.firebaseapp.com",
      databaseURL: "https://sahyogportal-6ef34-default-rtdb.firebaseio.com",
      projectId: "sahyogportal-6ef34",
      storageBucket: "sahyogportal-6ef34.appspot.com",
      messagingSenderId: "770428567068",
      appId: "1:770428567068:web:999e8345ba8ea6cabc69d9"
    };
    firebase.initializeApp(firebaseConfig);

    //var database = firebase.database();
    
    var hospitalsRef = firebase.database().ref("Hospitals/");

    hospitalsRef.update ({
       Live_hospital: ListOfHospitals
       
    });
}

