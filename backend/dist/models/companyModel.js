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
exports.Company = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const reviewModel_1 = require("./reviewModel");
let Company = class Company {
    get rating() {
        var _a;
        const sum = ((_a = this.reviews) === null || _a === void 0 ? void 0 : _a.reduce((prev, curr) => {
            if ((0, typegoose_1.isDocument)(curr)) {
                return prev + curr.rating;
            }
            return 0;
        }, 0)) || 0;
        return sum / this.reviews.length;
    }
};
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Company.prototype, "image", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Company.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Company.prototype, "city", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Company.prototype, "country", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Company.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Company.prototype, "postalAddress", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Company.prototype, "phoneNumber", void 0);
__decorate([
    (0, typegoose_1.prop)({
        ref: () => reviewModel_1.Review,
        foreignField: 'company',
        localField: '_id',
    }),
    __metadata("design:type", Array)
], Company.prototype, "reviews", void 0);
__decorate([
    (0, typegoose_1.prop)({
        ref: 'OfferClass',
        foreignField: 'company',
        localField: '_id',
        count: true,
    }),
    __metadata("design:type", Number)
], Company.prototype, "offersCount", void 0);
Company = __decorate([
    (0, typegoose_1.modelOptions)({
        options: { allowMixed: typegoose_1.Severity.ALLOW },
        schemaOptions: { toJSON: { virtuals: true } },
    })
], Company);
exports.Company = Company;
