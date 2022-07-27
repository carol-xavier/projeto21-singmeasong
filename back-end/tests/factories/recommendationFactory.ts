import { faker } from '@faker-js/faker';
import Randexp from 'randexp';

const linkName = faker.word.noun();
const youtubeLink = new Randexp (/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/).gen();

function createYoutubeLink() {
    return {
        "name": linkName,
        youtubeLink,
    };
};

const recommendationFactory = {
    createYoutubeLink
};

export default recommendationFactory;