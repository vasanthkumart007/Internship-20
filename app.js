const express = require("express");
const mongoose = require("mongoose");

const bodyparser = require("body-parser");
const Task = require("./task");
const app = express();

mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
    res.send("-----------Connected-----------");
})

app.post("/task", (req, res) => {
    if (req.body.task) {
        var task = new Task({
            id: req.body.id,
            task: req.body.task,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            stat: req.body.stat,
        })
        task.save();
        res.status(200).send({ msg: "Successfully Added to db" });
        console.log("\nADDED TO DB");
    } else {
        res.status(400).send({ msg: "Insufficient Data" });
    }
})

app.get("/tasks", (req, res) => {
    Task.find({}, (err, tasks) => {
        if (!err) {
            res.status(200).send(tasks);
            console.log("\nGETTING VALUES",tasks);
        } else {
            res.status(400).send(err);
        }
    })
})


app.get("/task_id/:id", (req, res) => {
    var id = req.params.id;
    if (id) {
        Task.find({ id: id }, (err, tasks) => {
            if (!err) {
                res.status(200).send(tasks);
            } else {
                res.status(400).send(err);
            }
        })
    } else {
        res.status(400).send({ msg: "Data Insuffcient" });
    }
})

app.get("/task_status/:stat", (req, res) => {
    var stat = req.params.stat;
    if (stat) {
        Task.find({ stat: stat }, (err, tasks) => {
            if (!err) {
                res.status(200).send(tasks);
            } else {
                res.status(400).send(err);
            }
        })
    } else {
        res.status(400).send({ msg: "Wrong Search" });
    }
})

app.put("/task/:id", (req, res) => {
    var id = req.params.id;
    var input = req.body.task;
    if (id && input) {
        Task.findOne({ id: id }, (err, task) => {
            if (!err && task) {
                task.task = input;
                task.save();
                res.status(200).send({ msg: "Successfully Updated" });
                console.log("\nDB IS UPDATED RECENTLY");
            } else {
                res.status(400).send(err);
            }
        })
    } else {
        res.status(400).send({ msg: "Insufficent Data" });
    }
})

app.delete("/task/:id", (req, res) => {
    var id = req.params.id;
    if (id) {
        Task.deleteOne({ id: id }, (err) => {
            if (!err) {
                res.status(200).send({ msg: "successfully deleted" });
            }
        })
    } else {
        res.status(200).send({ msg: "data insuf" });
    }
})

app.listen("3000", () => {
    console.log("Server started ..Running in port 3000");
})