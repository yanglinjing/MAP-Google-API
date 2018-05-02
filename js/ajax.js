$.ajax({
    url: apiUrl + marker.title,
    dataType: 'json',
    timeout: 5000
}).done(function(){//参数
    infowindow.setContent();//内容
    infowindow.open(map, marker);
}).fail(function(){
    alter('加载失败');
})
