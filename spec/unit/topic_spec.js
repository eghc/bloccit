const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;


describe("Topic", () => {

  beforeEach((done) => {

    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

//#2
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
//#3
        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
//#4
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
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

    it("should create a topic object with a title and body", (done) => {
//#1
      Topic.create({
        title: "JS Frameworks",
        body: "There are a lot of them."
      })
      .then((topic) => {

//#2
        expect(topic.title).toBe("JS Frameworks");
        expect(topic.body).toBe("There are a lot of them.");
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a topic with missing title or body", (done) => {
     Topic.create({
       title: "JS Frameworks"
     })
     .then((topic) => {
       done();

      })
     .catch((err) => {

        expect(err.message).toContain("Topic.body cannot be null");
        expect(err.message).toContain("Topic.topicId cannot be null");
        done();

      })
    });

  });


   describe("#getPosts()", () => {

     it("should return the posts associated topic", (done) => {
        this.topic.getPosts().then((posts) => {
          expect(posts[0].title).toBe("My first visit to Proxima Centauri b");
          done();
        });
     });

   });

});
