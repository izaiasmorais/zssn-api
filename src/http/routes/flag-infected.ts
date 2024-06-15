import { prisma } from "../../lib/prisma";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

const FlagInfectedSchema = z.object({
	id: z.string().uuid(),
});

export async function flagInfected(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().put(
		"/survivors/flag-infected",
		{
			schema: {
				tags: ["survivors"],
				summary: "Flag a survivor as infected",
				body: FlagInfectedSchema,
				response: {
					200: z.object({
						id: z.string().uuid(),
						name: z.string(),
						age: z.number(),
						gender: z.string(),
						latitude: z.number(),
						longitude: z.number(),
						infectionReports: z.number(),
						infected: z.boolean(),
						water: z.number(),
						food: z.number(),
						medication: z.number(),
						ammunition: z.number(),
						points: z.number(),
					}),
					404: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.body;

			const survivor = await prisma.survivor.findUnique({
				where: { id },
			});

			if (!survivor) {
				reply.status(404).send({ message: "Survivor not found" });
				return;
			}

			const updatedSurvivor = await prisma.survivor.update({
				where: { id },
				data: {
					infectionReports: { increment: 1 },
					infected:
						survivor.infectionReports + 1 >= 3 ? true : survivor.infected,
				},
			});

			reply.status(200).send(updatedSurvivor);
		}
	);
}
