"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApplication = exports.getRandomStatus = exports.getRandomExperience = void 0;
const faker_1 = require("@faker-js/faker");
const getRandomExperience = () => {
    const EXPERIENCE = [
        'No experience',
        '0-1 years',
        '1-3 years',
        '3-5 years',
        '5+ years',
    ];
    return EXPERIENCE[Math.floor(Math.random() * EXPERIENCE.length)];
};
exports.getRandomExperience = getRandomExperience;
const getRandomStatus = () => {
    const STATUS = ['New', 'Opened', 'Considering', 'Rejected', 'Accepted'];
    return STATUS[Math.floor(Math.random() * STATUS.length)];
};
exports.getRandomStatus = getRandomStatus;
const generateApplication = (user, offer) => {
    return {
        offer,
        user,
        name: faker_1.faker.name.fullName(),
        email: faker_1.faker.internet.email(),
        phoneNumber: faker_1.faker.phone.number('###-###-###'),
        country: faker_1.faker.address.country(),
        city: faker_1.faker.address.city(),
        address: faker_1.faker.address.streetAddress(),
        experience: (0, exports.getRandomExperience)(),
        cvFile: '.uploads/dummyCV.pdf',
        status: (0, exports.getRandomStatus)(),
    };
};
exports.generateApplication = generateApplication;
