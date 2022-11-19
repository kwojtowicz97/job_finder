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
exports.JobApplication = exports.Status = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const offerModel_1 = require("./offerModel");
const userModel_1 = require("./userModel");
var Status;
(function (Status) {
    Status["New"] = "New";
    Status["Opened"] = "Opened";
    Status["Considering"] = "Considering";
    Status["Rejected"] = "Rejected";
    Status["Accepted"] = "Accepted";
})(Status = exports.Status || (exports.Status = {}));
class JobApplication {
}
__decorate([
    (0, typegoose_1.prop)({ ref: () => offerModel_1.OfferClass, required: true }),
    __metadata("design:type", Object)
], JobApplication.prototype, "offer", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => userModel_1.User }),
    __metadata("design:type", Object)
], JobApplication.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], JobApplication.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], JobApplication.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], JobApplication.prototype, "phoneNumber", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], JobApplication.prototype, "country", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], JobApplication.prototype, "city", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], JobApplication.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], JobApplication.prototype, "experience", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], JobApplication.prototype, "cvFile", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], JobApplication.prototype, "createdAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: Status.New, required: true }),
    __metadata("design:type", String)
], JobApplication.prototype, "status", void 0);
exports.JobApplication = JobApplication;
