import { createServer, Model } from "miragejs";

const LOCAL_HOST = 'http://127.0.0.1:8181';

export function makeServer({ environment = "dev" } = {}) {
  console.log("makeServer");
  let server = createServer({
    environment,

    models: {
      quote: Model,
      product: Model,
    },

    seeds(server) {

      server.create("quote", {id: "q1",text: "Quote 1",author: "John"});
      server.create("quote", {id: "q2",text: "Quote 2",author: "Jim"});
      server.create("quote", {id: "q3",text: "Quote 3",author: "Steve"})
      server.create("quote", {id: "q4",text: "Quote 4",author: "George"})
      server.create("quote", {id: "q5",text: "Quote 5",author: "Keith"})

      server.create("product", {
        productId: "p1",
        productName: "Toilet Paper",
        productDesc: "Softest Toilet Paper Ever",
        productPrice: 94.12,
      });
      server.create("product", {
        productId: "p2",
        productName: "New TY",
        productDesc: "Brand New LCD TV",
        productPrice: 294.12,
      });
      server.create("product", {
        productId: "p3",
        productName: "Desk - Wood",
        productDesc: "Premium Wooden Desk",
        productPrice: 541.22,
      });
      server.create("product", {
        productId: "p4",
        productName: "Computer - Laptop",
        productDesc: "State of the art new Laptop",
        productPrice: 1025.81,
      });
    },

    routes() {
      this.get(LOCAL_HOST + "/quotes", (schema) => {
        console.log("makeServer.getAllQuotes");
        var data = schema.db.quotes;
        return data;
      }, { timing: 1000 } );
      
      this.post(LOCAL_HOST + "/quotes", (schema, request) => {
        console.log("makeServer.addQuotes");
        let attrs = JSON.parse(request.requestBody)
        var data = schema.quotes.create(attrs);
        return data;
      });

      this.get(LOCAL_HOST + "/quotes/:quoteId", (schema, request) => {
        const quoteId = request.params.quoteId;
        var data = schema.db.quotes.find(quoteId);
        return data;
      });

      this.passthrough((request) => {
         console.log('request:' + request)
         if (request.url.includes('login')) {
            return true;
         }
         return false;
      });

    },
  });
  return server;
}
