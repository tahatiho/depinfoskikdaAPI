
const Hapi = require("@hapi/hapi");

const scrap = require("./scraper");


const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost"
  });

  server.route({
    method: "GET",
    path: "/posts",
    handler: async (request, h) => {
      const result = await scrap();
      return result;
      
    }
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
