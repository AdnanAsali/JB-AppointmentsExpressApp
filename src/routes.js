const express = require('express')
const router = express.Router()
const mysql = require('mysql');
const cors = require('cors');

var obj = {};
var teamsArray = [];

var con = mysql.createConnection(
  {
    host: "localhost",
    user: "user",
    password: "root",
    database: "meetings",
    port: 4200
  });

// Routing 

// Getting all the meetings and the Teams' Data
router.get('/', (req, res) => 
{
  let query = 
  `
  SELECT 
    teams.team_id, 
    teams.name, fromDate, toDate, descr, room 
      FROM meeting 
        join teams on meeting.team_id = teams.team_id 
          order by  
            teams.team_id 
              asc
  `;
  con.query(query , function (err, result) 
  {
    console.log(result);

    res.render('index', 
    {
      title: 'Display All Meetings',
      ans: result,
      teams: filterResult(result)
    });
  });
});


// Adding a new meeting

router.post('/', (req, res) => 
{
  var desc = req.body.desc;
  var room = req.body.room;
  var from = req.body.from;
  var to = req.body.to;
  var team = req.body.team;


  let query = 
  ` 
  INSERT INTO meeting (descr, fromDate, toDate, room, team_id)
  VALUES ('${desc}', '${from}', '${to}', '${room}', '${team}');
  `

  con.query( query , function (err, result) 
  {
    if (err) {
      return res.status(500).send(err);
  }
  res.redirect('/');
  });
});





// Helping and Data Filtering/Processing Functions 
var filterResult = (resJson) => 
{
  
  resJson.forEach(el => 
  {
    teamsArray.push(el.name);
  });

  let uniqueSet = new Set(teamsArray);

  let backToArray = [...uniqueSet];
  console.log(backToArray);
  return backToArray
}

module.exports = router