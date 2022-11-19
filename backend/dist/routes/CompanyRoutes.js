"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const CompanyController_1 = require("../controllers/CompanyController");
const authHandler_1 = require("../middleware/authHandler");
router.route('/all').get(CompanyController_1.getAllCompanies);
router.route('/:id').get(CompanyController_1.getCompanyById).put(authHandler_1.protect, CompanyController_1.updateCompany);
router.route('/').post(authHandler_1.protect, CompanyController_1.createNewCompany).get(CompanyController_1.getCompanies);
exports.default = router;
