import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import { createCategorySchema } from "./categories.schema.js";
import { listCategoriesHandler, createCategoryHandler } from "./categories.controller.js";

export const categoriesRouter = Router();

categoriesRouter.use(authenticate);

categoriesRouter.get("/", listCategoriesHandler);
categoriesRouter.post("/", validate({ body: createCategorySchema }), createCategoryHandler);
