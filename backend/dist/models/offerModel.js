"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferClass = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const companyModel_1 = require("./companyModel");
let OfferClass = class OfferClass {
};
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], OfferClass.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], OfferClass.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], OfferClass.prototype, "localization", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], OfferClass.prototype, "contractType", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], OfferClass.prototype, "time", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], OfferClass.prototype, "experience", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], OfferClass.prototype, "salaryMin", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], OfferClass.prototype, "salaryMax", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], OfferClass.prototype, "responsibilities", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], OfferClass.prototype, "requirements", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], OfferClass.prototype, "benefits", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], OfferClass.prototype, "tags", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => companyModel_1.Company }),
    __metadata("design:type", Object)
], OfferClass.prototype, "company", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], OfferClass.prototype, "expiresAt", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], OfferClass.prototype, "createdAt", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], OfferClass.prototype, "expiresIn", void 0);
__decorate([
    (0, typegoose_1.prop)({
        ref: 'JobApplication',
        foreignField: 'offer',
        localField: '_id',
    }),
    __metadata("design:type", Array)
], OfferClass.prototype, "jobApplications", void 0);
OfferClass = __decorate([
    (0, typegoose_1.modelOptions)({
        options: { allowMixed: typegoose_1.Severity.ALLOW },
        schemaOptions: { toJSON: { virtuals: true }, timestamps: true },
    })
], OfferClass);
exports.OfferClass = OfferClass;
