"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const ReviewController_1 = require("../controllers/ReviewController");
const authHandler_1 = require("../middleware/authHandler");
router.route('/:id').post(authHandler_1.protect, ReviewController_1.createReview);
exports.default = router;
