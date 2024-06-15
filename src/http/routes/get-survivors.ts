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
					200: z.object({
						survivors: z.array(
							z.object({
								id: z.string().uuid(),
								name: z.string(),
								gender: z.string(),
								age: z.number(),
								latitude: z.number(),
								longitude: z.number(),
								points: z.number(),
								infected: z.boolean(),
							})
						),
					}),
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
				},
			});

			return { survivors };
		}
	);
}
