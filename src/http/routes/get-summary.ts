import { prisma } from "../../lib/prisma";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export async function getSummary(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/summary",
		{
			schema: {
				tags: ["summary"],
				summary: "Get summary of survivors",
				response: {
					200: z.object({
						infectedPercentage: z.number(),
						nonInfectedPercentage: z.number(),
						totalLostPoints: z.number(),
						averageItemsPerSurvivor: z.object({
							water: z.number(),
							food: z.number(),
							medication: z.number(),
							ammunition: z.number(),
						}),
					}),
				},
			},
		},
		async () => {
			const totalSurvivors = await prisma.survivor.count();
			const infectedSurvivors = await prisma.survivor.count({
				where: { infected: true },
			});
			const nonInfectedSurvivors = totalSurvivors - infectedSurvivors;

			const totalLostPoints = await prisma.survivor.aggregate({
				where: { infected: true },
				_sum: {
					points: true,
				},
			});

			const itemAverages = await prisma.survivor.aggregate({
				_avg: {
					water: true,
					food: true,
					medication: true,
					ammunition: true,
				},
			});

			return {
				infectedPercentage: (infectedSurvivors / totalSurvivors) * 100,
				nonInfectedPercentage: (nonInfectedSurvivors / totalSurvivors) * 100,
				totalLostPoints: totalLostPoints._sum.points || 0,
				averageItemsPerSurvivor: {
					water: itemAverages._avg.water || 0,
					food: itemAverages._avg.food || 0,
					medication: itemAverages._avg.medication || 0,
					ammunition: itemAverages._avg.ammunition || 0,
				},
			};
		}
	);
}
