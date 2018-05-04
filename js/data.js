//--------------数据-----------
let initialPlaces = [
  {title: 'Kyoto Station', location: {lat: 34.985849, lng: 135.7587667}},
  {title: 'Tofukuji Temple', location: {lat: 34.9763494, lng: 135.77381}},
  {title: 'Kiyomizu-dera', location: {lat: 34.9948561, lng: 135.7850463}},
  {title: 'Nijojocho', location: {lat: 35.0134832, lng: 135.748106}},
  {title: 'Arashiyama Park Kameyama Area', location: {lat: 35.0142738, lng: 135.6717478}},
  {title: 'Kiyomizu Junsei Okabeya', location: {lat: 34.9956824, lng: 135.7811589}},

];

let filterText = ko.observable("");//输入框里的文字

let restaurants;//接受yelp API返回的数组：景点附近的餐厅
