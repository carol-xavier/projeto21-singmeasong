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

describe("POST new recommendation", () => {
    it("Given name and youtube link, new recommentatio is crated. statusCode=201", async () => {
        const promise = await supertest(app).get(`/recommendations`);
        expect(promise.status).toBe(200);

    });
});