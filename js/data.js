let map;
//let largeInfowindow = new google.maps.InfoWindow();

//--------------数据-----------
let initialPlaces = [
  {title: 'Kyoto Station', location: {lat: 34.985849, lng: 135.7587667}},
  {title: 'Tofukuji Temple', location: {lat: 34.9763494, lng: 135.77381}},
  {title: 'Kiyomizu-dera', location: {lat: 34.9948561, lng: 135.7850463}},
  {title: 'Nijojocho', location: {lat: 35.0134832, lng: 135.748106}},
  {title: 'Arashiyama Park Kameyama Area', location: {lat: 35.0142738, lng: 135.6717478}}
];

let filterText = ko.observable();//输入框里的文字

//------------章鱼模型-----------
let Place = function(data){
    this.title = ko.observable(data.title);
    this.location = ko.observable(data.location);

    //制作地图上的红色图标
    this.marker = new google.maps.Marker({
        map: map,
        position: data.location,//值不能用observable
        title: data.title,
        animation: google.maps.Animation.DROP
    });

    //添加事件监听器
    this.marker.addListener('click', function(){
        openInfoWindow();
    });

};

let ViewModel = function(){
    let self = this;
    this.placeList = ko.observableArray([]);//把地点们放在监控数组中

    //遍历所有初始地点，为每个地点建立新对象，并放入监控数组
    initialPlaces.forEach(function(placeItem){
        self.placeList.push(new Place(placeItem));
    });


};


function openInfoWindow(){

}
