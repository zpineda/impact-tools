      var transformRequest = (url, resourceType) => {
        var isMapboxRequest =
          url.slice(8, 22) === "api.mapbox.com" ||
          url.slice(10, 26) === "tiles.mapbox.com";
        return {
          url: isMapboxRequest
            ? url.replace("?", "?pluginName=sheetMapper&")
            : url
        };
      };

      //YOUR TURN: add your Mapbox access token 
      mapboxgl.accessToken = '<Replace with your access token>';
      var map = new mapboxgl.Map({
        container: 'map', // container id
        style: "<Replace with a Mapbox style url>", //YOUR TURN: choose a style: https://docs.mapbox.com/api/maps/#styles
        center: [-122.411464, 37.7852299], // starting position [lng, lat]
        zoom: 9, // starting zoom
        transformRequest: transformRequest
      });


      map.on("load", function() {
        init();
      });

      // Initialize Tabletop to access your table
      function init() {
        Tabletop.init({
          // YOUR TURN: change 'key' value to point to your spreadsheet
          key: '<Link to your shared spreadsheet goes here!>',
          // once Tabletop has loaded the data, it passes it to the 'callback' function, 'addPoints', defined below
          callback: addPoints,
          simpleSheet: true
        });
      }


      // create a function called addPoints that iterates through your table (row by row) to create markers and popups
      function addPoints(data) {

        // iterate through your table to set the marker to lat/long values for each row

        data.forEach(function(row) {

          // create a variable for your popup and populate your popup with information from your table
          var popup = new mapboxgl.Popup()
            .setHTML(`<h3>` + row.Name + `</h3>` + '<h4>' + '<b>' + 'Address: ' + '</b>' + row.Address + '</h4>' + '<h4>' + '<b>' + 'Phone: ' + '</b>' + row.Phone + '</h4>'); // use the table to populate your popup with text


          // create a variable for your markup and add it to the map 
          var marker = new mapboxgl.Marker({
              color: 'purple'
            })
            .setLngLat([row.Longitude, row.Latitude])
            .setPopup(popup)
            .addTo(map); // add the marker to the map


        });
      }
