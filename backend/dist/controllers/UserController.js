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
exports.getUserCvData = exports.addToFavourite = exports.updateUser = exports.getUserById = exports.authUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const models_1 = require("../models");
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phoneNumber, country, city, address } = req.body;
    const isExistingUser = yield models_1.UserModel.findOne({ email });
    if (isExistingUser) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = yield models_1.UserModel.create({
        name,
        email,
        password,
        phoneNumber,
        country,
        city,
        address,
    });
    if (user) {
        res.status(201).send(user.toJSON());
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}));
exports.authUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield models_1.UserModel.findOne({ email }).populate('company');
    if (user && (yield user.matchPassword(password))) {
        res.status(201).send(user.toJSON());
    }
    else {
        res.status(400);
        throw new Error('Invalid login or password');
    }
}));
exports.getUserById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield models_1.UserModel.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).populate('company');
    if (user) {
        res.send(user.toJSON());
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
}));
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = yield models_1.UserModel.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b._id).populate('company');
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        user.country = req.body.country || user.country;
        user.city = req.body.city || user.city;
        user.address = req.body.address || user.address;
        yield user.save();
        res.send(user.toJSON());
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
}));
exports.addToFavourite = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const user = yield models_1.UserModel.findById((_c = req.user) === null || _c === void 0 ? void 0 : _c._id).populate('company');
    const offer = yield models_1.OfferModel.findById(req.params.id);
    if (user && offer) {
        if (user.saved.includes(offer._id)) {
            user.saved = user.saved.filter((id) => !offer._id.equals(id));
        }
        else {
            user.saved.push(offer._id);
        }
        const updatedUser = yield user.save();
        res.send(updatedUser.toJSON());
    }
    else {
        res.status(404);
        throw new Error('User or offer not found');
    }
}));
exports.getUserCvData = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const user = yield models_1.UserModel.findById((_d = req.user) === null || _d === void 0 ? void 0 : _d._id);
    if (user) {
        res.send(user.cvData);
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
}));
