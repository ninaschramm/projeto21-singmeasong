import { createRecommendation, recommendationFactory } from "./recommendationFactory";
import { prisma } from '../../src/database'

export async function createScenarioWithOver10Recommendations(){
    for (let i=0; i<11; i++) {
        let rec = createRecommendation()
        rec = {...rec, name: `${rec.name}+${i}`}
        await recommendationFactory(rec)
    }
}

export async function createScenarioWith20RecommendationsWithVotes(){
    for (let i=0; i<11; i++) {
        let rec = createRecommendation()
        rec = {...rec, name: `${rec.name}-${i}`}
        let response = await recommendationFactory(rec)
        
        await prisma.recommendation.update({
            where: { id: response.id },
            data: {
              score: { increment: 10 + (Math.floor(Math.random()*100))},
            },
          });
    }

    for (let i=0; i<11; i++) {
        let rec = createRecommendation()
        rec = {...rec, name: `${rec.name}-${i}`}
        let response = await recommendationFactory(rec)
        
        await prisma.recommendation.update({
            where: { id: response.id },
            data: {
              score: { increment: 10 - (Math.floor(Math.random()*100))},
            },
          });
    }
}

export async function createScenarioWith10RecsOver10Score() {
    for (let i=0; i<11; i++) {
        let rec = createRecommendation()
        rec = {...rec, name: `${rec.name}+${i}`}
        let response = await recommendationFactory(rec)
        
        await prisma.recommendation.update({
            where: { id: response.id },
            data: {
              score: { increment: 11 + (Math.floor(Math.random()*100))},
            },
          });
    }
}

export async function createScenarioWith10RecsUnder10Score() {
    for (let i=0; i<11; i++) {
        let rec = createRecommendation()
        rec = {...rec, name: `${rec.name}+${i}`}
        let response = await recommendationFactory(rec)
        
        await prisma.recommendation.update({
            where: { id: response.id },
            data: {
              score: { increment: 10 - (Math.floor(Math.random()*100))},
            },
          });
    }
}