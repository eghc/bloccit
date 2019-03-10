const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";

const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisements", () => {

  beforeEach((done) => {
    this.advertisement;
    sequelize.sync({force: true}).then((res) => {

     Advertisement.create({
       title: "Free Airpods",
       description: "You will look v fancy."
     })
      .then((advertisement) => {
        this.advertisement = advertisement;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

    });

  });

  describe("GET /advertisements", () => {

    it("should return a status code 200 and all ads", (done) => {
      request.get(base, (err, res, body) => {
         expect(res.statusCode).toBe(200);
         expect(err).toBeNull();
         expect(body).toContain("Advertisements");
         expect(body).toContain("Free Airpods");
         done();
      });
    });

  });

  describe("GET /advertisements/new", () => {

    it("should render a new advertisement form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Ad");
        done();
      });
    });
  });

  describe("POST /advertisements/create", () => {
  const options = {
    url: `${base}create`,
    form: {
      title: "blink-182 show",
      description: "Win tickets to a blink-182 show"
    }
  };

  it("should create a new ad and redirect", (done) => {

//#1
        request.post(options,
          (err, res, body) => {
            Advertisement.findOne({where: {title: "blink-182 show"}})
            .then((advertisement) => {
              expect(res.statusCode).toBe(303);
              expect(advertisement.title).toBe("blink-182 show");
              expect(advertisement.description).toBe("Win tickets to a blink-182 show");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });

  describe("GET /advertisements/:id", () => {

    it("should render a view with the selected ad", (done) => {
      request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Free Airpods");
        done();
      });
    });

  });

  describe("POST /advertisements/:id/destroy", () => {

     it("should delete the ad with the associated ID", (done) => {

 //#1
       Advertisement.all()
       .then((advertisements) => {

 //#2
         const adCountBeforeDelete = advertisements.length;

         expect(adCountBeforeDelete).toBe(1);

 //#3
         request.post(`${base}${this.advertisement.id}/destroy`, (err, res, body) => {
           Advertisement.all()
           .then((ads) => {
             expect(err).toBeNull();
             expect(ads.length).toBe(adCountBeforeDelete - 1);
             done();
           })

         });
       });

     });

   });

   describe("GET /advertisements/:id/edit", () => {

      it("should render a view with an edit ad form", (done) => {
        request.get(`${base}${this.advertisement.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit Ad");
          expect(body).toContain("Free Airpods");
          done();
        });
      });

    });

    describe("POST /advertisements/:id/update", () => {

      it("should update the ad with the given values", (done) => {
         const options = {
            url: `${base}${this.advertisement.id}/update`,
            form: {
              title: "Free Airpods",
              description: "You will look VERY fancy."
            }
          };
 //#1
          request.post(options,
            (err, res, body) => {

            expect(err).toBeNull();
 //#2
            Advertisement.findOne({
              where: { id: this.advertisement.id }
            })
            .then((advertisement) => {
              expect(advertisement.description).toBe("You will look VERY fancy.");
              done();
            });
          });
      });

    });

});
