"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authHandler_1 = require("../middleware/authHandler");
const CVUploadController_1 = require("../controllers/CVUploadController");
const uploadFileHandler_1 = require("../middleware/uploadFileHandler");
const router = express_1.default.Router();
router.post('/cv', authHandler_1.protect, uploadFileHandler_1.upload, (req, res) => {
    var _a;
    res.send(`/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.path}`);
});
router.post('/logo', authHandler_1.protect, uploadFileHandler_1.upload, (req, res) => {
    var _a;
    res.send(`/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.path}`);
});
router.post('/pdfCV', authHandler_1.protect, uploadFileHandler_1.upload, CVUploadController_1.saveCv);
exports.default = router;
