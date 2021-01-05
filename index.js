
const Hapi = require("@hapi/hapi");

const fs = require('fs');


const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: "localhost"
  });
  await server.register(require('@hapi/inert'));
  server.route({
    method: "GET",
    path: "/posts.json",
    handler:  (request, h) => {
  
      return h.file('posts.json');
      
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
