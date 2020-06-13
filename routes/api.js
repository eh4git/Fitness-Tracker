const router = require("express").Router();
const Workout = require("../models/workout");


router.get("/api/workouts", function(req, res){
    Workout.find()
        .then(function(dbWorkout) {   
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err)
        })
});

router.get("/api/workouts/range", function(req, res){
    Workout.find({}).limit(7)
        .then(function(dbWorkout) {    
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err)
        })
});

router.post("/api/workouts", function(req, res){
    Workout.create({})
        .then(function(dbWorkout) {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err)
        })
});

router.delete("/api/workouts", function({ body }, res){
    Workout.findByIdAndDelete(body.id)
        .then(function() {
            res.json(true);
        })
        .catch(err => {
            res.json(err)
        })
});

router.put("/api/workouts/:id", function({ body, params }, res){
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        // "runValidators" will ensure new exercises meet our schema requirements
        { new: true, runValidators: true }
    )
        .then(function() {
            res.json(true);
        })
        .catch(err => {
            res.json(err)
        })
});

module.exports = router;