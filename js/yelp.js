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
        .then(data => {
            console.log(data);
        })
        .catch(e => requestError(e))

}
