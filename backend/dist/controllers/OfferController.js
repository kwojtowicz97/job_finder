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
exports.getAllOffers = exports.createOffer = exports.getOfferById = exports.getOffers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const models_1 = require("../models");
// @desc    Fetch all offers
// @route   GET /api/products
// @access  Public
exports.getOffers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const position = req.query.position
        ? {
            title: {
                $regex: req.query.position,
                $options: 'i',
            },
        }
        : {};
    const location = req.query.location
        ? {
            city: {
                $regex: req.query.location,
                $options: 'i',
            },
        }
        : {};
    try {
        const count = yield models_1.OfferModel.countDocuments(Object.assign(Object.assign({}, position), location));
        const offers = yield models_1.OfferModel.find(Object.assign(Object.assign({}, position), location))
            .sort({ createdAt: 'descending' })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .populate({ path: 'company', populate: { path: 'reviews' } });
        offers.forEach((offer) => {
            const hours = (new Date(offer.expiresAt).getTime() - new Date().getTime()) / 3600000;
            offer.expiresIn = hours;
        });
        res.json({ offers, page, pages: Math.ceil(count / pageSize) });
    }
    catch (error) {
        res.send(error);
    }
}));
// @desc    Fetch offer by Id
// @route   GET /api/products/:id
// @access  Public
exports.getOfferById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const offer = yield models_1.OfferModel.findById(req.params.id).populate({
        path: 'company',
        populate: { path: 'reviews' },
    });
    if (offer && offer.expiresAt instanceof Date) {
        const hours = (new Date(offer.expiresAt).getTime() - new Date().getTime()) / 3600000;
        offer.expiresIn = hours;
        res.json(offer);
    }
    else {
        res.status(404);
        throw new Error('Offer not found');
    }
}));
exports.createOffer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userCompany = yield models_1.CompanyModel.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.company);
    if (userCompany) {
        const { body: { title, city, address, contractType, time, experience, responsibilities, requirements, benefits, expiresAt, localization, }, } = req;
        const newOffer = yield models_1.OfferModel.create({
            title,
            city,
            address,
            contractType,
            time,
            experience,
            localization,
            responsibilities,
            requirements,
            benefits,
            expiresAt,
            company: userCompany._id,
        });
        res.send(newOffer);
    }
    else {
        res.status(401);
        throw new Error("Company didn't found");
    }
}));
exports.getAllOffers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offers = yield models_1.OfferModel.find({})
            .sort({ createdAt: 'descending' })
            .populate({ path: 'company', populate: { path: 'reviews' } });
        offers.forEach((offer) => {
            const hours = (new Date(offer.expiresAt).getTime() - new Date().getTime()) /
                3600000;
            offer.expiresIn = hours;
        });
        res.json({ offers });
    }
    catch (error) {
        res.send(error);
    }
}));
