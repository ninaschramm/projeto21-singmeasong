import { faker } from '@faker-js/faker';
import { prisma } from '../../src/database'
import { CreateRecommendationData } from '../../src/services/recommendationsService';

export function createRecommendation(){
    const recommendation = {
        name: `${faker.word.noun()} ${faker.animal.type()} - ${faker.word.verb()}`,
        youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(11)}`
    }
    return recommendation
}

export async function recommendationFactory(recommendation: CreateRecommendationData) {
    return await prisma.recommendation.create({
        data: recommendation,
      });
}