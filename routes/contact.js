import express from "express";
import multer from "multer";
import path from "path";
import {
  deleteContact,
  getContact,
  updateContact,
  searchContact,
  addContact,
} from "../controller/contactController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route for adding a new contact with photo upload
router.post("/add", upload.single("photo"), addContact);

// Route for getting all contacts
router.get("/", getContact);

// Route for updating a contact by ID
router.put("/:id", updateContact);

// Route for deleting a contact by ID
router.delete("/:id", deleteContact);

// Route for searching contacts
router.get("/search", searchContact);

export default router;
