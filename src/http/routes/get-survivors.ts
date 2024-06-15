import { prisma } from "../../lib/prisma";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export async function getSurvivors(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/survivors",
		{
			schema: {
				tags: ["survivors"],
				summary: "Get all survivors information",
				response: {
					200: z.array(
						z.object({
							id: z.string().uuid(),
							name: z.string(),
							gender: z.string(),
							age: z.number(),
							latitude: z.number(),
							longitude: z.number(),
							infectionReports: z.number(),
							infected: z.boolean(),
							water: z.number(),
							food: z.number(),
							medication: z.number(),
							ammunition: z.number(),
							points: z.number(),
						})
					),
				},
			},
		},

		async () => {
			const survivors = await prisma.survivor.findMany({
				select: {
					id: true,
					name: true,
					age: true,
					gender: true,
					latitude: true,
					longitude: true,
					points: true,
					infected: true,
					ammunition: true,
					food: true,
					medication: true,
					water: true,
					infectionReports: true,
				},
			});

			return survivors;
		}
	);
}
