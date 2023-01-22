"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const OfferController_1 = require("../controllers/OfferController");
const authHandler_1 = require("../middleware/authHandler");
router.route('/').get(OfferController_1.getOffers).post(authHandler_1.protect, OfferController_1.createOffer);
router.route('/all').get(OfferController_1.getAllOffers);
router.route('/:id').get(OfferController_1.getOfferById);
exports.default = router;
