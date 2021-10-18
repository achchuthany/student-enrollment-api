/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { Op } = require("sequelize");

const Faculties = require("../models/Faculty");

const { checkRecordExistByAttribute } = require("../utilities/queryHelper");

const fetchAllFaculties = async (attributes) => {
  const { cacheKey, page, limit, sortBy } = attributes;

  // // prepare conditions
  // const options = {};
  // if (limit) {
  //   options.offset = page ? (page - 1) * limit : 0;
  //   options.limit = limit;
  // }

  // if (sortBy) {
  //   options.order = [[sortBy, 'ASC']];
  // }

  // fetch list of products
  const faculties = await Faculties.findAll();

  return {
    faculties,
    cacheKey,
  };
};

const fetchFaculty = async (attributes) => {
  const { cacheKey, id } = attributes;

  // fetch list of products
  const faculty = await Faculties.findOne({
    where: { id },
  });

  return {
    faculty,
    cacheKey,
  };
};

const addNewFaculty = async (attributes) => {
  const { name, abbreviation } = attributes;

  const newFaculty = await Faculties.create({
    name,
    abbreviation,
  });

  return {
    ...newFaculty.toJSON(),
    flushCache: true,
  };
};

const updateFaculty = async (attributes) => {
  const { id } = attributes;

  // check whether product with it exist
  await checkRecordExistByAttribute(Faculties, { id });

  // Omit the null fields from attribute
  const validUpdateAttributes = Object.keys(attributes)
    .filter((key) => attributes[key] && key !== "id")
    .reduce(
      (obj, validKey) => ({
        ...obj,
        [validKey]: attributes[validKey],
      }),
      {}
    );

  // Update Product
  await Faculties.update(
    { ...validUpdateAttributes, updatedAt: Date.now() },
    {
      where: {
        id,
      },
    }
  );

  return {
    id,
    ...validUpdateAttributes,
    flushCache: true,
  };
};

const deleteFaculty = async (attributes) => {
  const { id } = attributes;

  // check whether product with it exist
  await checkRecordExistByAttribute(Faculties, { id });

  // Update Product
  await Faculties.destroy({
    where: {
      id,
    },
  });

  return {
    id,
    flushCache: true,
  };
};

module.exports = {
  fetchAllFaculties,
  fetchFaculty,
  addNewFaculty,
  updateFaculty,
  deleteFaculty,
};
