"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCompanies = exports.getCompanies = exports.updateCompany = exports.createNewCompany = exports.getCompanyById = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const models_1 = require("../models");
exports.getCompanyById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield models_1.CompanyModel.findById(req.params.id).populate('reviews');
    if (company) {
        const offers = yield models_1.OfferModel.find({ company: company._id }).populate({
            path: 'company',
            populate: { path: 'reviews' },
        });
        res.status(201);
        res.json({
            company,
            offers,
        });
    }
    else {
        throw new Error('Company not found');
    }
}));
exports.createNewCompany = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) && (yield models_1.CompanyModel.findById(req.user.company))) {
        throw new Error('User has already created a company');
    }
    const { name, country, city, address, phoneNumber, image, description, localization, } = req.body;
    const company = yield models_1.CompanyModel.create({
        // user: req.user?._id,
        name,
        country,
        city,
        address,
        localization,
        phoneNumber,
        image,
        description,
    });
    if (company) {
        const user = yield models_1.UserModel.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
        if (user) {
            user.company = company._id;
            yield user.save();
        }
    }
    res.send(company);
}));
exports.updateCompany = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    if (!req.user.company) {
        throw new Error("User doesn't have a company");
    }
    const company = yield models_1.CompanyModel.findById((_c = req.user) === null || _c === void 0 ? void 0 : _c.company).populate('reviews');
    if (company) {
        company.name = req.body.name || company.name;
        company.image = req.body.logoURL || company.image;
        company.address = req.body.address || company.address;
        company.city = req.body.city || company.city;
        company.country = req.body.country || company.country;
        company.description = req.body.description || company.description;
        company.postalAddress = req.body.postalAddress || company.postalAddress;
        company.phoneNumber = req.body.phoneNumber || company.phoneNumber;
        const updatedCompany = yield company.save();
        res.send(updatedCompany);
    }
    else {
        res.status(404);
        throw new Error('Company not found');
    }
}));
exports.getCompanies = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const companySearch = req.query.company
        ? {
            name: {
                $regex: req.query.company,
                $options: 'i',
            },
        }
        : {};
    const locationSearch = req.query.location
        ? {
            $or: [
                { address: req.query.location },
                { city: req.query.location },
                { country: req.query.location },
            ],
        }
        : {};
    const count = yield models_1.CompanyModel.countDocuments(Object.assign(Object.assign({}, companySearch), locationSearch));
    const companies = yield models_1.CompanyModel.find(Object.assign(Object.assign({}, companySearch), locationSearch))
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .populate('offersCount')
        .populate('reviews');
    res.send({ companies, page, pages: Math.ceil(count / pageSize) });
}));
exports.getAllCompanies = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companies = yield models_1.CompanyModel.find({})
        .populate('offersCount')
        .populate('reviews');
    res.send({ companies });
}));
