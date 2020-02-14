const express = require("express");

const actions = require("./data/actionsRouter");

const projects = require("./data/projectsRouter");

const server = express();

server.use(express.json());

server.use("/api/actions", actions);

server.use("/api/projects", projects);

server.listen(5000, () => {
    console.log(`\n* Server is running on http://localhost:5000 *\n`)
})