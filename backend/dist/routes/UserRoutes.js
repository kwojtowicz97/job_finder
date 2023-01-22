"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const UserController_1 = require("../controllers/UserController");
const authHandler_1 = require("../middleware/authHandler");
router
    .route('/')
    .post(UserController_1.registerUser)
    .get(authHandler_1.protect, UserController_1.getUserById)
    .put(authHandler_1.protect, UserController_1.updateUser);
router.route('/login').post(UserController_1.authUser);
router.route('/favourites/:id').put(authHandler_1.protect, UserController_1.addToFavourite);
router.route('/cvData').get(authHandler_1.protect, UserController_1.getUserCvData);
exports.default = router;
