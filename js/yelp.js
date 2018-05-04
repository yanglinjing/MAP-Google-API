function getComments(marker, infowindow, data){

    //使用https://cors-anywhere.herokuapp.com/完成‘跨域请求Access-Control-Allow-Origin’
    //The Access-Control-Allow-Origin response header indicates
    //Twhether the response can be shared with resources with the given origin.
    let yelpUrl = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=delis&latitude='+ data.location.lat +'&longitude=' + data.location.lng;

    const apiKey = 'BxPEUWatE4QCiFwCcRdAKx6-CxYy_vZMnT5fgcBZxCdN2BofkURH9Y8ooKyelJ3YCoSUVrG2ydj7T-QnFDHHVAJwvfkpgVrDSAk57YLnO2jBJF5TmC-Q7TbTkivpWnYx';

    let myInit = {
        method: 'GET',

        //yelp官方给的固定格式，Bearer后有一个空格!!
        headers: {
            "Authorization": "Bearer " + apiKey
        }
    };

    fetch(yelpUrl, myInit)//参数一网址，参数二对象
        .then(res => res.json())//返回结果转为json格式
        .then(data => showRestaurants(data))
        .catch(_=> alert("Sorry, we could not find any restaurants near it."))

}

function showRestaurants(data){
    let restaurants = data.businesses;//是个Array
    let restaurantList = [];
    restaurants.map(restaurant => {
        restaurantList.push(new Restaurant(restaurant));
    });
}

//------------景点附近餐厅的类-----------
let Restaurant = function(data){
    let self = this;

    this.title = data.name;
    this.rating = data.rating;
    this.address = data.location;
    this.distance = (data.distance/1000).toFixed(2);

    this.lat = data.coordinates.latitude;
    this.lng = data.coordinates.longitude;
    this.location = {lat: self.lat, lng: self.lng};

    this.imgUrl = data.image_url;
    console.log(this.imgUrl);
    this.id = data.id

    //制作地图上的红色图标
    this.marker = new google.maps.Marker({
        map: map,
        position: self.location,//值不能用observable
        title: self.title,
        animation: google.maps.Animation.DROP,
        icon: {
          url: 'http://maps.google.com/mapfiles/kml/shapes/dining.png',
          //size: new google.maps.Size(20, 20)
        }
    });

    //添加事件监听器
    this.marker.addListener('click', function(){
        openRestaurantWindow(self, this, largeInfowindow);//弹出窗口
    });
}

function openRestaurantWindow(restaurant, marker, infowindow){
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;

    let address =  restaurant.address.address1
                  + restaurant.address.address2
                  + restaurant.address.address3
                  + restaurant.address.city;

    let innerHTML = '<div>'
    + '<h3>' + marker.title +'</h3>'
    + "<img src='" + restaurant.imgUrl + "' alt='restaurant'>"
    + '<br>Address: ' + address.replace(/\s+/g,"")
    + '<br>Rating: ' + restaurant.rating
    + '<br>Distance: ' + restaurant.distance + ' km'
    + '</div>';

    infowindow.setContent(innerHTML);
    infowindow.open(map, marker);//在哪个地图打开，在哪个marker头上打开

    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
  }
}
