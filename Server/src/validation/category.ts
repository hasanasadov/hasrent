import { Schema } from "express-validator";

export const createCategorySchema: Schema = {
  title: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    isLength: {
      options: { min: 3 },
    },
  },
};

export const editCategorySchema: Schema = {
  title: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    isLength: {
      options: { min: 3 },
    },
  },
};
