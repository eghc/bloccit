const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:8088/";

describe("routes : static", () => {

//#1
  describe("GET /", () => {

//#2
    it("should return status code 200 and have 'Welcome to Bloccit' in the body of the response", (done) => {

//#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Welcome to Bloccit");

//#4
        done();
      });
    });


    it("should return status code 200 and have 'About us' in the body of the response", (done) => {
      request.get(base+"about", (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("About Us");

        done();
      });
    });

    // it("should return status code of 200 when request is put in", (done) =>{
    //   request.get(base+"marco", (err,res,body)=>{
    //     expect(res.statusCode).toBe(200);
    //     expect(body).toBe("polo");
    //     done();
    //
    //   });
    // });

  });
});
