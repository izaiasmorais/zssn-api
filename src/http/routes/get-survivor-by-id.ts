import { prisma } from "../../lib/prisma";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export async function getSurvivorById(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/survivors/:id",
		{
			schema: {
				tags: ["survivors"],
				summary: "Get a survivor by id",
				params: z.object({
					id: z.string(),
				}),
				response: {
					200: z.object({
						survivor: z
							.object({
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
							.nullable(),
					}),
				},
			},
		},

		async (request) => {
			const { id } = request.params;

			const survivor = await prisma.survivor.findUnique({
				where: {
					id,
				},
			});

			return { survivor };
		}
	);
}
