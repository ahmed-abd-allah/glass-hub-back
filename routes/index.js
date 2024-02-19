const locationRoutes = require("./locationRoutes");
const resoursesRoutes = require("./resoursesRoutes");

const mountRoutes = (app) => {
  app.use("/api/v1/location", locationRoutes);

  app.use("/api/v1/resourses", resoursesRoutes);
};

module.exports = mountRoutes;
