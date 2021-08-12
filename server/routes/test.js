const express = require('express');
const tests = express.Router();
const connection = require('../dbConfig/db');
var md5 = require("md5");


tests.get('/getAll', (req, res) => {
  let query = "SELECT * FROM user"
  connection.all(query, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err });
      return;
    }
    res.json(rows)
  });
})

  .post('/delete/:id', (req, res) => {
    let userId = req.body.id;

    let query = "DELETE FROM user WHERE id=?";
    let query2 = "SELECT * FROM user";
    let params = [userId];
    connection.run(query, params, (err, results) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      connection.all(query2, (err, rows) => {
        if (!err) {
          res.send(rows)
        } else {
          res.status(400).json({ "error": err.message });
          return;
        }
      })
    })
  })

  .post('/insert', (req, res) => {
    let query = "INSERT INTO user (name,email,password) VALUES(?,?,?)"
    let query2 = "SELECT * FROM user"
    let params = [req.body.name, req.body.email, req.body.password]
    connection.run(query, params, (err, result) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      connection.all(query2, (err, rows) => {
        if (!err) {
          res.send(rows)
        } else {
          res.status(400).json({ "error": err.message });
          return;
        }
      })
    });
  })

  .post('/update/:id', (req, res) => {
    let userToUpdate = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      id: req.body.id,
    }
    let query = "UPDATE user SET name=?,email=?,password=? WHERE id=?";
    let query2 = "SELECT * FROM user";
    connection.run(query, [userToUpdate.name, userToUpdate.email, md5(userToUpdate.password), userToUpdate.id], (err, results) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      connection.all(query2, (err, rows) => {
        if (!err) {
          res.send(rows)
        } else {
          res.status(400).json({ "error": err.message });
          return;
        }
      })
    })
  })



module.exports = tests;