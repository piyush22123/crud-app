const mongoose = require("mongoose");

const DB = "mongodb+srv://piyushmalviya2201:P5aW9c5AfBxR5m1g@cluster0.ml3kuqs.mongodb.net/crud-application?retryWrites=true&w=majority";

// connect to the server
mongoose.connect(DB, {
}).then(() => {
  console.log("Connection successfull"); // Print 'Connection successful' if the server connected successfully
}).catch((error) => {
  console.log(error.message); // Return an error message if an error occurs
});
