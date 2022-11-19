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
exports.updateStateOfJobApplication = exports.getReceivedJobApplications = exports.getSendJobApplications = exports.getJobApplications = exports.createJobApplication = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const models_1 = require("../models");
const typegoose_1 = require("@typegoose/typegoose");
exports.createJobApplication = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobOffer = yield models_1.OfferModel.findById(req.params.id);
    const { name, email, phoneNumber, country, city, experience, cvFile } = req.body;
    if (jobOffer) {
        const jobAppliction = yield models_1.JobApplicationModel.create({
            offer: jobOffer._id,
            user: req.user._id,
            name,
            email,
            phoneNumber,
            country,
            city,
            experience,
            cvFile,
        });
        res.status(201);
        res.send(jobAppliction);
    }
    else {
        res.status(400);
        throw new Error('Offer does not found');
    }
}));
exports.getJobApplications = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const jobApplications = yield models_1.JobApplicationModel.find({
        company: (_a = req.user) === null || _a === void 0 ? void 0 : _a.company,
    }).populate('offer');
    res.send(jobApplications);
}));
exports.getSendJobApplications = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const jobApplications = yield models_1.JobApplicationModel.find({
        user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
    }).populate('offer');
    res.send(jobApplications);
}));
exports.getReceivedJobApplications = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const jobApplications = yield models_1.OfferModel.find({
        company: (_c = req.user) === null || _c === void 0 ? void 0 : _c.company,
    }).populate('jobApplications');
    res.send(jobApplications);
}));
exports.updateStateOfJobApplication = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const jobApplication = yield models_1.JobApplicationModel.findById(req.params.id).populate('offer');
    if (!jobApplication) {
        res.status(400);
        throw new Error('Bad request');
    }
    if (!(0, typegoose_1.isDocument)(jobApplication.offer)) {
        res.status(400);
        throw new Error('Bad request');
    }
    if (!(String((_d = req.user) === null || _d === void 0 ? void 0 : _d.company) === String(jobApplication.offer.company))) {
        res.status(401);
        throw new Error('Not authorized');
    }
    jobApplication.status = req.body.status;
    const updatedJobApplication = yield jobApplication.save();
    if (!updatedJobApplication) {
        res.status(500);
        throw new Error('Internal Server Error');
    }
    res.send(updatedJobApplication);
}));
