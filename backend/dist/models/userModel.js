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
exports.User = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const typegoose_1 = require("@typegoose/typegoose");
const companyModel_1 = require("./companyModel");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
let User = class User {
    matchPassword(enteredPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(enteredPassword, this.password);
        });
    }
    toJSON() {
        const obj = this.toObject();
        return {
            _id: obj._id,
            name: obj.name,
            email: obj.email,
            phoneNumber: obj.phoneNumber,
            country: obj.country,
            city: obj.city,
            address: obj.address,
            isAdmin: obj.isAdmin,
            cvPath: obj.cvPath,
            cvData: obj.cvData,
            saved: obj.saved,
            token: (0, generateToken_1.default)(String(obj._id)),
            company: obj.company,
        };
    }
};
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], User.prototype, "cvPath", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Object)
], User.prototype, "cvData", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Array, required: false, default: [] }),
    __metadata("design:type", Array)
], User.prototype, "saved", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => companyModel_1.Company }),
    __metadata("design:type", Object)
], User.prototype, "company", void 0);
User = __decorate([
    (0, typegoose_1.pre)('save', function (next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isModified('password'))
                next();
            this.password = yield bcryptjs_1.default.hash(this.password, 10);
        });
    }),
    (0, typegoose_1.modelOptions)({ options: { allowMixed: typegoose_1.Severity.ALLOW } })
], User);
exports.User = User;