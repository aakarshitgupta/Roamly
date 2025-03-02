const mongoose = require("mongoose");
const data = require("./data");
const Listing = require("../models/listing");

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/roamly');
  }

  const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(data.data);
    console.log("database is initialised");
}

initDB();