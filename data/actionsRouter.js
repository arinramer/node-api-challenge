const express = require("express");

const router = express.Router();

const actions = require("./helpers/actionModel");

const projects = require("./helpers/projectModel");

router.post("/:id", validateProjectId, validateAction, (req, res) => {
    actions.insert(req.body)
    .then(created => {
        res.status(201).json(created);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fulfill request"})
    })
})

router.get("/", (req, res) => {
    actions.get()
    .then(actions => {
        res.status(200).json(actions);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fulfill request"})
    })
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    actions.get(id)
    .then(actions => {
        res.status(200).json(actions);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fulfill request"})
    })
})

router.put("/:id", validateActionUpdate, (req, res) => {
    const id = req.params.id;
    actions.update(id, req.body)
    .then(updated => {
        console.log(updated)
        res.status(200).json(updated);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fulfill request"})
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    actions.remove(id)
    .then(removed => {
        res.status(200).json(removed);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fulfill request"})
    })
})

function validateProjectId(req, res, next) {
    const id = req.params.id;
    projects.get(id)
    .then(project => {
        if(project !== null) {
            next();
        } else {
            res.status(400).json({ message: "Invalid post id" });
          }
        }).catch(err => {
          console.log(err);
          res.status(500).json({ message: "Unable to fulfill request" });
        })
}

function validateAction(req, res, next) {
    const body = req.body;
    if(!body.project_id || !body.description || !body.notes) {
        res.status(400).json({ message: "missing post data" });
    } else {
        body.project_id = req.params.id;
        req.body = body;
        next();
    }
}

function validateActionUpdate(req, res, next) {
    const body = req.body;
    if(!body.description || !body.notes) {
        res.status(400).json({ message: "missing post data" });
    } else {
        req.body = body;
        next();
    }
}

module.exports = router;