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
router.get('/', (req, res) => 
{
  con.query(
    'SELECT teams.team_id, teams.name, fromDate, toDate, descr, room FROM meeting, teams order by teams.team_id asc'
    , function (err, result) 
  {
    
    res.render('index', 
    {
      title: 'Display All Meetings',
      ans: result,
      teams: filterResult(result)
    });
  });
});

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