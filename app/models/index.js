const dbConfig      = require("../config/database");
const mongoose      = require("mongoose");
mongoose.Promise    = global.Promise;

const db    = {};
db.mongoose = mongoose;
db.url      = dbConfig.url;
db.products = require("./product.js")(mongoose);
db.user     = require("./user.js")(mongoose)
module.exports      = db;