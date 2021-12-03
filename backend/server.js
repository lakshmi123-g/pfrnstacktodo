const fastify = require("fastify")({
    logger: true,
});
const dbconnector = require("./db");
const route = require("./routes");

fastify.register(dbconnector);
fastify.register(route);

fastify.register(require('fastify-cors'), {
})


async function start() {
    try {
        await fastify.listen(3008);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
start();
