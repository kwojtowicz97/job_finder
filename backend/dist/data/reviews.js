"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReview = void 0;
const lorem_ipsum_1 = require("lorem-ipsum");
const description = new lorem_ipsum_1.LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
});
const user = '63068ea7db0f26ca10cb7829';
const generateReview = (company) => {
    return {
        user,
        company,
        contents: description.generateSentences(3),
        rating: 1 + Math.ceil(Math.random() * 4),
    };
};
exports.generateReview = generateReview;
