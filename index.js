
const Hapi = require("@hapi/hapi");

const scrap = require("./scraper");


const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: "0.0.0.0"
  });
  server.route({
    method: "GET",
    path: "/posts",
    handler: async (request, h) => {
      const result = await scrap();
      return result;
      
    }
  });
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Hello World!';
    }
});

  await server.start();
  console.log("Server running on %s port %s", server.info.host ,server.info.port);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
