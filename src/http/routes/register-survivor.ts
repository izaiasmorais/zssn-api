import { prisma } from "../../lib/prisma";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { BadRequestError } from "./_errors/bad-request-error";

const RegisterSurvivorSchema = z.object({
	name: z.string(),
	gender: z.string(),
	age: z.number(),
	latitude: z.number(),
	longitude: z.number(),
	water: z.number(),
	food: z.number(),
	medication: z.number(),
	ammunition: z.number(),
});

export async function registerSurvivor(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/survivors",
		{
			schema: {
				tags: ["survivors"],
				summary: "Register a new survivor",
				body: RegisterSurvivorSchema,
				response: {
					201: z.object({
						id: z.string().uuid(),
						name: z.string(),
						age: z.number(),
						gender: z.string(),
						latitude: z.number(),
						longitude: z.number(),
						infected: z.boolean(),
						water: z.number(),
						food: z.number(),
						medication: z.number(),
						ammunition: z.number(),
						points: z.number(),
					}),
				},
			},
		},
		async (request, reply) => {
			const {
				name,
				age,
				gender,
				latitude,
				longitude,
				water,
				food,
				medication,
				ammunition,
			} = request.body;

			const isNameAlreadyRegistered = await prisma.survivor.findFirst({
				where: { name },
			});

			if (isNameAlreadyRegistered) {
				throw new BadRequestError("Name already in use");
			}

			const newSurvivor = await prisma.survivor.create({
				data: {
					name,
					age,
					gender,
					latitude,
					longitude,
					infected: false,
					water,
					food,
					medication,
					ammunition,
					points: 0,
				},
			});

			let points = 0;
			points += newSurvivor.water * 4;
			points += newSurvivor.food * 3;
			points += newSurvivor.medication * 2;
			points += newSurvivor.ammunition;

			const updatedSurvivor = await prisma.survivor.update({
				where: { id: newSurvivor.id },
				data: { points },
			});

			reply.status(201).send(updatedSurvivor);
		}
	);
}
