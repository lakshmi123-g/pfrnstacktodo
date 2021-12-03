const fastify = require("fastify")({
  logger: true,
});

async function routes(fastify, options) {
  const client = fastify.db.client;
  fastify.get("/todos", async function (request, reply) {
    try {
      const { rows } = await client.query("SELECT * FROM todo");
      console.log(rows);
      return rows;
    } catch (err) {
      throw new Error(err);
    }
  });
  fastify.get("/todos/:id", async function (request, reply) {
    console.log(request.params);
    try {
      const { rows } = await client.query(`SELECT * FROM todo  WHERE todo_id=$1`, [
        request.params.id,
      ]);
      console.log(rows[0]);
      return rows[0];
      // reply.code(204);
    } catch (err) {
      throw new Error(err);
    }
  });



  fastify.post("/todos", async function (request, reply) {
    const { id, description } = request.body;
    const query = {
      text: "INSERT INTO todo(description) values($1) RETURNING *",
      values: [description],
    };
    try {
      const { rows } = await client.query(query);
      console.log(rows);
      reply.code(201);
      return rows;
    } catch (err) {
      throw new Error(err);
    }
  });
  fastify.put("/todos/:id", async function (request, reply) {
    const id = request.params.id;
    const { description } = request.body;
    const query = {
      text: "UPDATE todo SET description = $1 WHERE todo_id = $2",

      values: [description, id],
    };
    try {
      const { rows } = await client.query(query);
      console.log(rows[0]);
      // return rows[0]
      reply.code(204);
    } catch (err) {
      throw new Error(err);
    }
  });
  fastify.delete("/todos/:id", async function (request, reply) {
    console.log(request.params);
    try {
      const { rows } = await client.query(`DELETE FROM todo WHERE todo_id=$1`, [
        request.params.id,
      ]);
      console.log(rows[0]);
      reply.code(204);
    } catch (err) {
      throw new Error(err);
    }
  });
}
module.exports = routes;
