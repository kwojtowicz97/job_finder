"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authHandler_1 = require("../middleware/authHandler");
const JobApplicationControler_1 = require("../controllers/JobApplicationControler");
router
    .route('/received-job-applications')
    .get(authHandler_1.protect, JobApplicationControler_1.getReceivedJobApplications);
router
    .route('/:id')
    .post(authHandler_1.protect, JobApplicationControler_1.createJobApplication)
    .put(authHandler_1.protect, JobApplicationControler_1.updateStateOfJobApplication)
    .get(authHandler_1.protect, JobApplicationControler_1.getJobApplications);
router.route('/').get(authHandler_1.protect, JobApplicationControler_1.getSendJobApplications);
exports.default = router;
