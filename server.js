var express = require('express');
var path = require('path');
var PORT = process.env.PORT || 3000;
var app = express();
var reservations = [ { name: 'john',
group: '3',
phoneNum: '80188888453',
routeName: 'john',
table: 0}];
var activeTables = 1;

app.listen(PORT,(err,res) => {
    if (err) throw err;
    console.log('listening on port: '+PORT);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "main.html"));
});
app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});
app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "list.html"));
});
app.get("/tables/api", function (req, res) {
    return res.json(reservations);
});
app.post("/tables/api", function (req, res,) {
    var newReservation = req.body;
    newReservation.routeName = newReservation.name.replace(/\s+/g,"").toLowerCase();
    if(activeTables<=5) {
        newReservation.table = activeTables;
        activeTables++;
    }
    reservations.push(newReservation);
    res.json(newReservation);
    console.log('then response \n')
        console.log(reservations);

});
  
