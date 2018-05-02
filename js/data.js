//--------------数据-----------
let initialPlaces = [
  {title: 'Kyoto Station', location: {lat: 34.985849, lng: 135.7587667}},
  {title: 'Tofukuji Temple', location: {lat: 34.9763494, lng: 135.77381}},
  {title: 'Kiyomizu-dera', location: {lat: 34.9948561, lng: 135.7850463}},
  {title: 'Nijojocho', location: {lat: 35.0134832, lng: 135.748106}},
  {title: 'Arashiyama Park Kameyama Area', location: {lat: 35.0142738, lng: 135.6717478}}
];

let filterText = ko.observable("");//输入框里的文字

//------------章鱼模型-----------
let Place = function(data){
    let self = this;

    this.title = ko.observable(data.title);
    this.location = ko.observable(data.location);

    //在输入框写入内容，则只有匹配的列表项的该（visiable）属性为true
    //retrieved from the udacity mentor @Zhilian's notes
    this.visiable = ko.computed(function(){
        let placeName = data.title.toLowerCase();//值不能用observable
        let userInput = filterText().toLowerCase();//全部转换小写，便于匹配

        //a.indexOf(b)如果b包含在a中，返回0-正无穷之间的值；
        //如果b完全不含在a中，返回-1
        if(placeName.indexOf(userInput) == -1){
            return false;//不匹配
        }else{
            return true;//匹配。无输入也算在内
        }

    });

    //制作地图上的红色图标
    this.marker = new google.maps.Marker({
        map: map,
        position: data.location,//值不能用observable
        title: data.title,
        animation: google.maps.Animation.DROP
    });

    //添加事件监听器
    this.marker.addListener('click', function(){
        animateMarker(this);//icon跳动两下
        getComments(this, largeInfowindow, data);//异步加载第三方API
        openInfoWindow(this, largeInfowindow);//弹出窗口
    });

    //点击列表，地图上对应的Marker会改变
    this.clickMarker = function(){
        google.maps.event.trigger(self.marker, 'click');
    };

};

let ViewModel = function(){
    let self = this;
    this.placeList = [];

    //遍历所有初始地点，为每个地点建立新对象，并放入数组
    initialPlaces.forEach(function(placeItem){
        self.placeList.push(new Place(placeItem));
    });

    //只有匹配项（的列表内容和Marker），会被留在页面上
    this.matchedPlaceList = ko.computed(function(){
        let matchedPlaceArray = [];

        self.placeList.forEach(function(place){
            if(place.visiable()){
                matchedPlaceArray.push(place);
            }
        });

        return matchedPlaceArray;
    });

};

function getComments(marker, infowindow, data){
    let yelpUrl = 'https://api.yelp.com/v3/businesses/search?term=delis&latitude='+ data.location.lat +'&longitude=' + data.location.lng;
    console.log(yelpUrl);
}

//retrieved from the udacity instructor notes
function openInfoWindow(marker, infowindow){
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);//在哪个地图打开，在哪个marker头上打开
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
  }
}

//retrieved from the udacity mentor @Zhilian's notes
function animateMarker(marker){
    if(marker.getAnimation() != null){//当前有动画
        marker.setAnimation(null);//停止动画
    }else{//没动画时
        marker.setAnimation(google.maps.Animation.BOUNCE);//设置动画
        setTimeout(function(){
            marker.setAnimation(null);//跳一会儿就别跳了
        }, 1500);
    }
}
