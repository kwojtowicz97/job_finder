"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importData = void 0;
const offers_1 = __importStar(require("./data/offers"));
const companies_1 = __importStar(require("./data/companies"));
const models_1 = require("./models");
const reviews_1 = require("./data/reviews");
const users_1 = require("./data/users");
const jobApplications_1 = require("./data/jobApplications");
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('dataimport');
    try {
        yield models_1.OfferModel.deleteMany();
        yield models_1.CompanyModel.deleteMany();
        yield models_1.ReviewModel.deleteMany();
        yield models_1.UserModel.deleteMany();
        yield models_1.JobApplicationModel.deleteMany();
        //Create dummy company
        const dummyCompany = yield models_1.CompanyModel.create(companies_1.demoCompany);
        //Create dummy user
        const demoUser = yield models_1.UserModel.create(users_1.userCredentials);
        const { _id: companyUserId } = yield models_1.UserModel.create(Object.assign(Object.assign({}, users_1.companyCredentials), { company: dummyCompany._id }));
        //Create dummy offers for dummy company
        offers_1.offersForDummyCompany.forEach((offer) => {
            const company = dummyCompany;
            offer.company = company._id;
            offer.address = company.address || '';
            offer.city = company.city || '';
        });
        const createdOffersForDummyCompany = yield models_1.OfferModel.insertMany(offers_1.offersForDummyCompany);
        //Create dummy applications for dummy offers
        const jobApplications = [];
        createdOffersForDummyCompany.forEach((offer) => {
            const numberOfApplications = Math.ceil(Math.random() * 6);
            for (let i = 0; i <= numberOfApplications; i++) {
                jobApplications.push((0, jobApplications_1.generateApplication)('6376c96f3e21d9b4aaa6e9e5', offer._id));
            }
        });
        yield models_1.JobApplicationModel.insertMany(jobApplications);
        //Create companies
        const createdCompanies = yield models_1.CompanyModel.insertMany(companies_1.default);
        //Create offers and populate with random company
        offers_1.default.forEach((offer) => {
            const company = createdCompanies[Math.floor(createdCompanies.length * Math.random())];
            offer.company = company._id;
            offer.address = company.address || '';
            offer.city = company.city || '';
        });
        const createdOffers = yield models_1.OfferModel.insertMany(offers_1.default);
        //Create dummy applications for demo offers
        const jobApplicationsSendByDummyUser = [];
        createdOffers.forEach((offer, index) => {
            if (index % 3 !== 0)
                return;
            jobApplicationsSendByDummyUser.push({
                offer: offer._id,
                user: demoUser._id,
                email: demoUser.email,
                address: demoUser.address,
                city: demoUser.city,
                country: demoUser.country,
                cvFile: '/uploads/demoUserCv',
                experience: (0, jobApplications_1.getRandomExperience)(),
                name: demoUser.name,
                phoneNumber: demoUser.phoneNumber,
                status: (0, jobApplications_1.getRandomStatus)(),
            });
        });
        yield models_1.JobApplicationModel.insertMany(jobApplicationsSendByDummyUser);
        //Create reviews
        const reviews = [];
        createdCompanies.forEach((company) => {
            const numberOfReviews = Math.ceil(Math.random() * 6);
            for (let i = 0; i <= numberOfReviews; i++) {
                reviews.push((0, reviews_1.generateReview)(company._id));
            }
        });
        yield models_1.ReviewModel.insertMany(reviews);
        console.log('Data Imported!');
        // process.exit(0)
    }
    catch (error) {
        console.error(`${error}`);
        // process.exit(1)
    }
});
exports.importData = importData;
const destroyData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.OfferModel.deleteMany();
        yield models_1.CompanyModel.deleteMany();
        console.log('Data Destroyed!');
    }
    catch (error) {
        console.error(`${error}`);
    }
});
// if (process.argv[2] === '-d') {
//   destroyData()
// } else {
//   importData()
// }
