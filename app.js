const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require('./utils/ExpressError.js');
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/roamly');
}

app.set("view engine", 'ejs');
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("root route");
})


app.use("/listings" ,listings);
app.use("listings/:id/reviews" ,reviews);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "error occured" } = err;
    res.status(statusCode).render("error.ejs",{err});
    // res.status(statusCode || 500).send(message || "Internal Server Error");
  });

app.listen(8080,()=>{
    console.log("app is listening on port 8080");
})