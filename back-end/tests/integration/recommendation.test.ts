import app from '../../src/app';
import supertest from 'supertest';
import { prisma } from '../../src/database'
import { createRecommendation, recommendationFactory } from '../factories/recommendationFactory';
import { createScenarioWith20RecommendationsWithVotes, createScenarioWithOver10Recommendations } from '../factories/scenarioFactory';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "recommendations"`;
});

describe("POST /recommendations", () => {

  it("should answer with status 201 when given name and youtube link", async () => {    
    const recommendation = createRecommendation();
    const response = await supertest(app).post("/recommendations").send(recommendation);

    const createdRecommendation = await prisma.recommendation.findUnique({
      where: { name: recommendation.name }
    })

    expect(response.status).toBe(201);
    expect(createdRecommendation).not.toBeNull;
  });

  it("should answer with status 409 when the name is already in use", async () => {      
    const recommendation = createRecommendation();
    
    await recommendationFactory(recommendation)

    const response = await supertest(app).post("/recommendations").send(recommendation);
    expect(response.status).toBe(409);
  });
});

describe("GET /recommendations", () => {
    it("should answer with status 200 and a list of recs available", async () => {
     
      await createScenarioWithOver10Recommendations();

      const response = await supertest(app).get("/recommendations")

      expect(response.status).toBe(200);    
      expect(response.body.length).toEqual(10);     
    });
  });

  describe("GET /recommendations by Id", () => {
    it("should answer with status 200 and return the recommendation with the id", async () => {
     
      const recommendation = createRecommendation();    
      const { id } = await recommendationFactory(recommendation)

      const response = await supertest(app).get(`/recommendations/${id}`)

      expect(response.status).toBe(200);   
      expect(response.body.id).toEqual(id)
    });
  });
 

  afterAll(async () => {
    await prisma.$disconnect();
  });
  