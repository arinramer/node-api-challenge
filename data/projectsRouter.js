const express = require("express");

const router = express.Router();

const projects = require("./helpers/projectModel");

router.get("/", (req, res) => {
    projects.get()
    .then(projects => {
        res.status(200).json(projects)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fulfill request"})
    })
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    projects.get(id)
    .then(projects => {
        res.status(200).json(projects);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fulfill request"})
    })
})

router.put("/:id", validateProject, (req, res) => {
    const id = req.params.id;
    projects.update(id, req.body)
    .then(updated => {
        res.status(200).json(updated);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fulfill request"})
    })
})

router.post("/", validateProject, (req, res) => {
    projects.insert(req.body)
    .then(created => {
        res.status(201).json(created);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fulfill request"})
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    projects.remove(id)
    .then(removed => {
        res.status(200).json(removed);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fulfill request"})
    })
})

function validateProject(req, res, next) {
    const body = req.body;
    if(!body.name || !body.description) {
        res.status(400).json({ message: "missing post data" });
    } else {
        req.body = body;
        next();
    }
}

module.exports = router;