const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
const PORT = 3000;
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});
const databaseLink =
    "mongodb+srv://frog:4vS-brN-59X-fKA@cluster0.w7cg7jm.mongodb.net/nodejs-course?retryWrites=true&w=majority";
mongoose
    .connect(databaseLink)
    .then((res) => console.log("Connected to db"))
    .catch((error) => console.log(error));

app.use(require("method-override")("_method"));
app.use(require("morgan")("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    const title = "Home";
    res.render("index", { title });
});
app.get("/contacts", (req, res) => {
    const title = "Contacts";
    const contacts = [
        { name: "YouTube", link: "http://youtube.com/YauhenKavalchuk" },
        { name: "Twitter", link: "http://github.com/YauhenKavalchuk" },
        { name: "GitHub", link: "http://twitter.com/YauhenKavalchuk" },
    ];
    res.render("contacts", { contacts, title });
});
// app routes
app.use(require("./routes/post-routes.js"));
//api routes
app.use(require("./routes/api-post-routes.js"));

// error handling
// bad request 404 code
app.use((req, res) => {
    const title = "Error Page";
    res.status(404).render("error", {
        title,
        statusCode: res.statusCode,
        error: "Route doesn't exist",
    });
});
// internal server error 500 code
app.use((err, req, res, next) => {
    const title = "Server side error";
    console.log(err);
    res.status(500).render("error", {
        title,
        statusCode: res.statusCode,
        error: err,
    });
});
