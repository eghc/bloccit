module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const topicRoutes = require("../routes/topics");
    const advertisementRoutes = require("../routes/advertisement");
    const postRoutes = require("../routes/posts");
    const flairRoutes = require("../routes/flairs");
    const userRoutes = require("../routes/users");

    app.use(staticRoutes);
    app.use(postRoutes);
    app.use(topicRoutes);
    app.use(advertisementRoutes);
    app.use(flairRoutes);
    app.use(userRoutes);
  }
}
