import { prisma } from "../../lib/prisma";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

const EditSurvivorLocationSchema = z.object({
	id: z.string().uuid(),
	latitude: z.number(),
	longitude: z.number(),
});

export async function editSurvivorLocation(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().put(
		"/survivors/location",
		{
			schema: {
				tags: ["survivors"],
				summary: "Edit a survivor's	 location",
				body: EditSurvivorLocationSchema,
				response: {
					200: z.object({
						id: z.string().uuid(),
						name: z.string(),
						age: z.number(),
						gender: z.string(),
						latitude: z.number(),
						longitude: z.number(),
						points: z.number(),
						infected: z.boolean(),
					}),
					404: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { id, latitude, longitude } = request.body;

			const survivor = await prisma.survivor.findUnique({
				where: { id },
			});

			if (!survivor) {
				reply.status(404).send({ message: "Survivor not found" });
				return;
			}

			const updatedSurvivor = await prisma.survivor.update({
				where: { id },
				data: { latitude, longitude },
			});

			reply.status(200).send(updatedSurvivor);
		}
	);
}
