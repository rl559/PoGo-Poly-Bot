var publicConfig = {
  key: 'AIzaSyCYtlcX6HByoHsNAIcSOpTpRLffPai-i7g',
  stagger_time: 1000, // for elevationPath
  encode_polylines: false,
  secure: true, // use https
  //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
}
const GoogleMapsAPI = require('googlemaps');
var gmAPI = new GoogleMapsAPI(publicConfig);


module.exports = class GMapsAPI
{

getCityChannelName(coordIn)
{
  let reverseGeocodeParams = {
  				  "latlng":        coordIn,
  				  "result_type":   "locality",
  				  "language":      "en",
  				  "location_type": "APPROXIMATE"
  				};
  
  let cityChanName = '';
  gmAPI.reverseGeocode(reverseGeocodeParams, function(err, result){
  cityChanName = result.results[0].address_components[0].short_name.toLowerCase().replace( ' ', '_' );
});
  return cityChanName;
}

getAddress(queryIn, displayAddress)
{
  let formatAddress = '';
  let mapImage = '';
  let mapImageParams = '';
  let mapUrl = '';
  let placeSearchTextParams = {
    "query": queryIn,
    "location": '26.272368, -80.250188',
    "radius": '9.656064003688153'
  };
  gmAPI.placeSearchText(placeSearchTextParams, function (err, result) {
    
    if (result.results[0] && err === null) {

      mapUrl = encodeURI('https://www.google.com/maps/place/' + result.results[0].formatted_address);
      if (result.results[0].name) {
        mapImageParams = {
          "center": result.results[0].formatted_address,
          "zoom": 15,
          "size": '500x300',
          "maptype": 'roadmap',
          "markers": [{
            "location": result.results[0].formatted_address,
            "label": result.results[0].name,
            "color": 'red',
            "shadow": true
          }],
          "style": [{
            "feature": 'road',
            "element": 'all',
            "rules": {
              "hue": '0x00ff00'
            }
          }]
        };
        mapImage = gmAPI.staticMap(mapImageParams);
        formatAddress = result.results[0].formatted_address;
      } else {
        mapImageParams = {
          "center": result.results[0].formatted_address,
          "zoom": 15,
          "size": '500x300',
          "maptype": 'roadmap',
          "markers": [{
            "location": result.results[0].formatted_address,
            "label": result.results[0].formatted_address,
            "color": 'red',
            "shadow": true
          }],
          "style": [{
            "feature": 'road',
            "element": 'all',
            "rules": {
              "hue": '0x00ff00'
            }
          }]
        };
    mapImage = gmAPI.staticMap(mapImageParams);
    formatAddress = result.results[0].formatted_address;
  }
  console.log([mapUrl, formatAddress, mapImage]);
  displayAddress(mapUrl, formatAddress, mapImage);
}
else{displayAddress('','','')}
});
}
};
