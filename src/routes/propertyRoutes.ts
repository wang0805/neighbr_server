import express from "express";
import {
  getProperties,
  getProperty,
  createProperty,
  getLeasesByProperty,
} from "../controllers/propertyControllers";
import { authMiddleware } from "../middleware/authMiddleware";
import multer from "multer";

//upload photos using multer and upload to s3 buckets later
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); // In-memory storage for file uploads

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getProperty);
router.post(
  "/",
  authMiddleware(["manager"]),
  upload.array("photos"),
  createProperty
);
//added to see leases
router.get(
  "/:id/leases",
  authMiddleware(["manager", "tenant"]),
  getLeasesByProperty
);

export default router;
