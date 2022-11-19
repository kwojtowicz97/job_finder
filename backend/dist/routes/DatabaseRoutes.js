"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DatabaseController_1 = require("../controllers/DatabaseController");
const router = express_1.default.Router();
router.route('/').post(DatabaseController_1.resetDatabase);
exports.default = router;
