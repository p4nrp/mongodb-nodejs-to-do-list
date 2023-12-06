// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// const port = 3000;

// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1/contacts", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Create a mongoose schema
// const contactSchema = new mongoose.Schema({
//   name: String,
//   phoneNumber: String,
// });

// // Create a mongoose model
// const Contact = mongoose.model("Contact", contactSchema);

// // Set EJS as the view engine
// app.set("view engine", "ejs");

// // Middleware to parse the request body
// app.use(express.urlencoded({ extended: true }));

// // Serve static files from the 'public' directory
// app.use(express.static("public"));

// // Route to render the form
// app.get("/", (req, res) => {
//   res.render("index");
// });

// // Route to handle form submission
// app.post("/addContact", async (req, res) => {
//   try {
//     // Create a new contact instance
//     const newContact = new Contact({
//       name: req.body.name,
//       phoneNumber: req.body.phoneNumber,
//     });

//     // Save the new contact to the database
//     await newContact.save();

//     res.redirect("/");
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// // Route to display contacts
// app.get("/contacts", async (req, res) => {
//   try {
//     // Retrieve all contacts from the database
//     const contacts = await Contact.find();

//     res.render("contacts", { contacts });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// // Route to render the form for editing a contact
// app.get("/edit/:id", async (req, res) => {
//   try {
//     console.log(req.params.id);
//     // Find the contact by ID in the database
//     const contact = await Contact.findById(req.params.id);

//     // Render the edit form with the contact details
//     res.render("editContact", { contact });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1/contacts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

// Create a mongoose model
const Contact = mongoose.model("Contact", contactSchema);

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Route to render the form
app.get("/", (req, res) => {
  res.render("index");
});

// Route to handle form submission
app.post("/addContact", async (req, res) => {
  try {
    // Create a new contact instance
    const newContact = new Contact({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
    });

    // Save the new contact to the database
    await newContact.save();

    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to display contacts
app.get("/contacts", async (req, res) => {
  try {
    // Retrieve all contacts from the database
    const contacts = await Contact.find();

    res.render("contacts", { contacts });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to render the form for editing a contact
app.get("/edit/:id", async (req, res) => {
  try {
    // Find the contact by ID in the database
    const contact = await Contact.findById(req.params.id);

    // Render the edit form with the contact details
    res.render("editContact", { contact });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to handle updating a contact
app.post("/updateContact/:id", async (req, res) => {
  try {
    // Find the contact by ID in the database
    const contact = await Contact.findById(req.params.id);

    // Update the contact details
    contact.name = req.body.name;
    contact.phoneNumber = req.body.phoneNumber;

    // Save the updated contact to the database
    await contact.save();

    res.redirect("/contacts");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ...

// Route to handle deleting a contact
app.get("/delete/:id", async (req, res) => {
  try {
    // Find the contact by ID in the database and remove it
    await Contact.findByIdAndDelete(req.params.id);

    // Redirect to the contacts page after deletion
    res.redirect("/contacts");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ...

// ...

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
