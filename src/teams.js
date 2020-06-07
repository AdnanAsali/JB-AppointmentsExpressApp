const express = require('express'), router = express.Router();

// get Meetings lists
router.get('/list', function(req, res) 
{
  let sql = `SELECT * FROM teams`;
  db.query(sql, function(err, data, fields) 
  {
    if (err) throw err;
    res.json(
    {
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});


module.exports = router;