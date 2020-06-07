const express = require('express'), router = express.Router();

// get Meetings lists
router.get('/meetings', (req, res) => 
{
  con.query('SELECT * FROM meeting', function (err, result) 
  {
    console.log(result);
    res.render('index', 
    {
      title: 'Display All Meetings',
      ans: result
    });
  });
});


// // create new Meeting
// let from = req.body.from;
// let to = req.body.to;
// let desc = req.body.desc;
// let room = req.body.room;


// router.post('/new', function(req, res) 
// {
//   let sql = `INSERT INTO users(name, gender) VALUES (?)`;
//   let values = [
//     req.body.name,
//     req.body.gender
//   ];
//   db.query(sql, [values], function(err, data, fields) 
//   {
//     if (err) throw err;
//     res.json(
//     {
//       status: 200,
//       message: "New user added successfully"
//     })
//   })
// });

module.exports = router;