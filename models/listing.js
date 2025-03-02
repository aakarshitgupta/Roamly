const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        url:{
            type: String,
            set: (v) => v === ""?"https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Ftaj-mahal&psig=AOvVaw1jdqFwFYKGovJSCqAXoEG1&ust=1740906024471000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMif8bzC6IsDFQAAAAAdAAAAABAE" : v,
        }
    },
    price:{
        type: Number,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})

const Listing = mongoose.model("listing",listingSchema);
module.exports = Listing;