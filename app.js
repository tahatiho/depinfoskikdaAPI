
const Hapi = require("@hapi/hapi");

const scrap = require("./scraper");


const init = async () => {
  var server = new Hapi.Server(+process.env.PORT, '0.0.0.0');
  
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
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
