const apiRouter = require("express").Router();
const blogRouter = require("./blog");
const userRouter = require("./user");
const { userIdExtractor, tokenExtractor } = require("../../utils/middleware");

apiRouter.use("/users", userRouter);

apiRouter.use(tokenExtractor);
apiRouter.use(userIdExtractor);

apiRouter.use("/blogs", blogRouter);

module.exports = apiRouter;