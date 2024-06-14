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

// app.register(getProfile)

app.listen({ port: Number(process.env.SERVER_PORT) || 3333 }).then(() => {
	console.log(`HTTP server running at ${port}`);
});
