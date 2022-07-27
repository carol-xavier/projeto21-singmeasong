import supertest from 'supertest';
import app from '../src/app.js';
import { prisma } from '../src/database.js';
import recommendationFactory from './factories/recommendationFactory.js';

// beforeEach(async () => {
//     await prisma.$executeRaw`TRUNCATE TABLE recommendation`;
// });

describe("POST new recommendation", () => {
    it("Given name and youtube link, new recommentatio is crated. statusCode=201", async () => {
        const info = recommendationFactory.createYoutubeLink();
        const promise = await supertest(app).post(`/recommendations`).send(info);
        expect(promise.status).toBe(201);

        const infoDB = await prisma.recommendation.findFirst({
            where: { name: info.name }
        });
        expect(infoDB.name).toBe(info.name);
    });
});

describe("GET the recommendations", () => {
    it("Sending a GET request to /recommendatios, receive all data. statusCode=200", async () => {
        const promise = await supertest(app).get(`/recommendations`);
        expect(promise.status).toBe(200);

    });
});

describe("GET random recommendation", () => {
    it("Sending a GET request to /recommendatios/random, receive a random recommendation. statusCode=200", async () => {
        const promise = await supertest(app).get(`/recommendations/random`);
        expect(promise.status).toBe(200);
    });
});

describe("GET top 'X amount' of recommendations", () => {
    it("Sending a GET request to /recommendatios/top/:amount, receive X top recommendations. statusCode=200", async () => {
        const number = await recommendationFactory.randomNumber();
        const promise = await supertest(app).get(`/recommendations/top/${number}`);
        expect(promise.status).toBe(200);
    });
});

describe("GET specific recommendation by ID", () => {
    it("Sending a valid ID, receive a specific recommendations. statusCode=200", async () => {
        const {id} = await recommendationFactory.findId();
        const promise = await supertest(app).get(`/recommendations/${id}`);
        expect(promise.status).toBe(200);
    });
});

describe("Upvote recommendation by ID", () => {
    it("Sending a valid ID, this recommendation receives a vote. statusCode=200", async () => {
        const {id} = await recommendationFactory.findId();
        const promise = await supertest(app).post(`/recommendations/${id}/upvote`);
        expect(promise.status).toBe(200);
    });
});

describe("GET specific recommendation by ID", () => {
    it("Sending a valid ID, this recommendation loses a vote. statusCode=200", async () => {
        const {id} = await recommendationFactory.findId();
        const promise = await supertest(app).post(`/recommendations/${id}/downvote`);
        expect(promise.status).toBe(200);
    });
});

