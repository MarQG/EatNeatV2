const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const databaseUrl = process.env.MONGODB_URI ||'mongodb://localhost:27017/DateLyte';

mongoose.Promise = Promise;
mongoose.connect(databaseUrl);

const db = require("./../models")

db.on("error", function(error) {
  console.log("Database Error:", error);
});

//GET blogs

router.get("/api/blogs", function(req, res){
    db.Blog.find({}, function(err, data){
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

//POST blogs

router.post("/api/blogs", function(req, res){
    db.Blog.create({
        user: req.body.user,
        text: req.body.text
    },function(err, data){
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

//PUT blogs

router.put("/api/blogs/:id", function(req, res){
    db.Blog.findByIdAndUpdate({ _id: req.params.id }, { text: req.body.text }, function(err, data){
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

//DELETE blogs

router.delete("/api/blogs/:id", function(req, res){
    db.Blog.findByIdAndRemove({ _id: req.params.id }, function(err, data){
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

//GET comments

router.get("/api/blogs/:id/comments", function(req, res){
    db.Comment.find({blog_id: req.params.id}, function(err, data){
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

//POST comments

router.post("/api/blogs/:id/comments", function(req, res){
    db.Comment.create({
        blog_id: req.params.id,
        user: req.body.user,
        text: req.body.text
    }, function(err, data){
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

//PUT comments

router.put("/api/blogs/:id/comments/:comment_id", function(req, res){
    db.Comment.findByIdAndUpdate({ _id: req.params.comment_id }, { text: req.body.text }, function(err, data){
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

//DELETE comments

router.delete("/api/blogs/:id/comments/:comment_id", function(req, res){
    db.Comment.findByIdAndRemove({ _id: req.param.comment_id }, function(err, data){
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})



// // GET All GroceryList

// router.get("/api/grocerylist", function (req, res) {
//     db.GroceryList.find({})
//         .then(function (dbGroceryList) {
//             res.json(dbGroceryList);
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });

// // GET byID GroceryList

// router.get("/api/grocerylist/:id", function (req, res) {
//     db.GroceryList.findOne({ _id: req.params.id })
//         .then(function (dbGroceryList) {
//             res.json(dbGroceryList);
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });

// // POST new GroceryList
// // need model info to update column 

// router.post("/api/grocerylist", function (req, res) {
//     db.GroceryList.create({
//         column: req.body.column,
//     }).then(function (dbGroceryList) {
//         res.json(dbGroceryList);
//     })
//         .catch(function (err) {
//             res.json(err);
//         });
// });

// // PUT update GroceryList
// // need model info to update column 

// router.put("/api/grocerylist/:id", function (req, res) {
//     db.GroceryList.findOneAndUpdate({
//         column: req.body.column
//     }, {
//             where: {
//                 id: req.body.id
//             }
//         }).then(function (dbGroceryList) {
//             res.json(dbGroceryList);
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });

// // DELETE GroceryList
// // remove item from grocery list vs removing whole list?
// router.delete("/api/grocerylist/:id", function (req, res) {
//     db.GroceryList.findOneAndRemove({ _id: req.params.id })
//         .then(function (dbGroceryList) {
//             res.json(dbGroceryList);
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });

module.exports = router;