const sequelize = require("../../src/db/models/index").sequelize;
const Flair = require("../../src/db/models").Flair;
const Topic = require("../../src/db/models").Topic;


describe("Flair", () => {

  beforeEach((done) => {

    this.flair;
    this.topic;
    sequelize.sync({force: true}).then((res) => {

//#2
      Flair.create({
        name: "coding",
        color: "#0000ff"
      })
      .then((flair) => {
        this.flair = flair;
//#3
        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",
//#4
          flairId: this.flair.id
        })
        .then((topic) => {
          this.topic = topic;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("#create()", () => {

    it("should create a flair object with a name and color", (done) => {
//#1
      Flair.create({
        name: "coding",
        color: "#0000ff"
      })
      .then((flair) => {

//#2
        expect(flair.name).toBe("coding");
        expect(flair.color).toBe("#0000ff");
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a flair with missing title or body", (done) => {
     Flair.create({
       color: "#0000ff"
     })
     .then((flair) => {
       done();

      })
     .catch((err) => {

        expect(err.message).toContain("Flair.name cannot be null");
        done();

      })
    });

  });


   describe("#getTopics()", () => {

     it("should return the topics associated with the flair", (done) => {
        this.flair.getTopics().then((topics) => {
          expect(topics[0].title).toBe("Expeditions to Alpha Centauri");
          done();
        });
     });

   });

});
