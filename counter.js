let counter = ((req,res) => {
  client.incr(`${req.originalUrl}`);
  client.get(`${req.originalUrl}`, (err,data) =>{
    res.getCounter = data;
  });
  return res.getCounter;
});

module.exports = counter;