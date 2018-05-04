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
        .catch(e=> function(e){
            alert("Opps! Something went wrong!" + e);
          })

}

function showRestaurants(data){
    let restaurants = data.businesses;//yelp返回的Array
    console.log(restaurants);
    let restaurantList = [];//放置实例
    restaurants.map(restaurant => {
        restaurantList.push(new Restaurant(restaurant));
    });
    restaurantList.map(restaurant =>{
        bounds.extend(place.marker.position);//扩展地图，包含该marker
    });
    map.fitBounds(bounds);//地图适应新界限
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

    //制作地图上的餐馆图标
    this.marker = new google.maps.Marker({
        map: map,
        position: self.location,
        title: self.title,
        animation: google.maps.Animation.DROP,
        icon: {
          url: 'img/restaurant_loc.svg',
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

    let address = '';
    if(restaurant.address.address1){
        address += restaurant.address.address1;
    }
    if(restaurant.address.address2){
        address += restaurant.address.address2;
    }
    if(restaurant.address.address3){
        address += restaurant.address.address3;
    }
    if(restaurant.address.city){
        address += restaurant.address.city;
    }

    let innerHTML = "<div class='yelpWindow'>"
    + '<h3>' + marker.title +'</h3>'
    + "<img src='" + restaurant.imgUrl + "' alt='restaurant' class='yelpPic'>"
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

//这段代码不工作
// function hideRestaurants(){
//     document.getElementById('hide_restaurants').addEventListener('click', function(){
//         restaurantList.map(restaurant => restaurant.marker.setMap(null));
//         console.log(restaurant.marker);
//     })
// }
