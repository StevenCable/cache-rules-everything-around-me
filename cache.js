//each get request should check if html/data exists in redis db
//not stored: first get request should store html then return it
//stored: return html
let redis = require('redis');
let client = redis.createClient(); 

module.exports = function(req,res,next){

  client.get(`${req.originalUrl}`, function(err, html){
    if(err) throw err;

    if(html !== null){
      return res.send(html);
    }

    res.setCache = (url, html) =>{
      client.setex(`${url}`, 60, `${html}`);

    };
    return next();
    
  });
  
};