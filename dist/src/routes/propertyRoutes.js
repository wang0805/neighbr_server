"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const propertyControllers_1 = require("../controllers/propertyControllers");
const authMiddleware_1 = require("../middleware/authMiddleware");
const multer_1 = __importDefault(require("multer"));
//upload photos using multer and upload to s3 buckets later
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage }); // In-memory storage for file uploads
const router = express_1.default.Router();
router.get("/", propertyControllers_1.getProperties);
router.get("/:id", propertyControllers_1.getProperty);
router.post("/", (0, authMiddleware_1.authMiddleware)(["manager"]), upload.array("photos"), propertyControllers_1.createProperty);
//added to see leases
router.get("/:id/leases", (0, authMiddleware_1.authMiddleware)(["manager", "tenant"]), propertyControllers_1.getLeasesByProperty);
exports.default = router;
