import { faker } from '@faker-js/faker';
import { prisma } from '../../src/database.js';
import Randexp from 'randexp';

const linkName = faker.word.noun();
const youtubeLink = new Randexp (/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/).gen();

function createYoutubeLink() {
    return {
        "name": linkName,
        youtubeLink,
    };
};

async function randomNumber() {
    const data = await prisma.recommendation.findMany();
    return Math.floor(Math.random() * data.length);
};

const recommendationFactory = {
    createYoutubeLink,
    randomNumber
};

export default recommendationFactory;