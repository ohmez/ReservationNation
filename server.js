var express = require('express');
var path = require('path');
var PORT = process.env.PORT || 3000;
var app = express();
var reservations = [ { name: 'john',
group: '3',
phoneNum: '80188888453',
routeName: 'john',
table: 1}, 
{ name: 'sally',
group: '5',
phoneNum: '80188888453',
routeName: 'sally',
table: 2}, { name: 'bob',
group: '2',
phoneNum: '80188888453',
routeName: 'bob',
table: 3},
];
var activeTables = reservations.length;
var waitListed = 0;

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
    if(activeTables<=4) {
        activeTables++;
        newReservation.table = activeTables;
    } else {
        waitListed++;
        newReservation.table = 'Wait-List: '+ waitListed;
    }
    reservations.push(newReservation);
    res.json(newReservation);
    console.log('then response \n')
        console.log(reservations);

});
  
