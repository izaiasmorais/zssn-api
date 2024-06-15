import { fastify } from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	ZodTypeProvider,
} from "fastify-type-provider-zod";
import { getSurvivors } from "./routes/get-survivors";
import { getSurvivorById } from "./routes/get-survivor-by-id";
import { registerSurvivor } from "./routes/register-survivor";
import { editSurvivorLocation } from "./routes/edit-survivor-location";
import { flagInfected } from "./routes/flag-infected";

const port = process.env.PORT || "3333";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(fastifyCors);
app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "zssn api",
			description:
				"Uma API de um sistema de controle de sobreviventes a um apocalipse zumbi.",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUI, {
	routePrefix: "/docs",
});

app.register(getSurvivors);
app.register(getSurvivorById);
app.register(registerSurvivor);
app.register(editSurvivorLocation)
app.register(flagInfected)

app.listen({ port: Number(process.env.SERVER_PORT) || 3333 }).then(() => {
	console.log(`HTTP server running at ${port}`);
});
