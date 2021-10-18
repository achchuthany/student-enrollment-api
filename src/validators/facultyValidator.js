/* eslint-disable camelcase */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
// const slugify = require("slugify");

const { validate } = require("../utilities/validationHelper");
const {
  fetchAllfaculties: fetchAllfacultiesSchema,
  fetchFaculty: fetchFacultySchema,
  addNewFaculty: addNewFacultySchema,
  updateFaculty: updateFacultySchema,
  deleteFaculty: deleteFacultySchema,
} = require("../schema/facultySchema");

const ErrorHelper = require("../utilities/errorHelper");

const fetchAllfaculties = async (req) => {
  const { page, limit, sortBy } = req.query;

  const attributes = {
    cacheKey: req.cacheKey,
    page: page ? parseInt(page, 10) : null,
    limit: limit ? parseInt(limit, 10) : null,
    sortBy: sortBy || null,
  };

  return validate(fetchAllfacultiesSchema, attributes);
};

const fetchFaculty = async (req) => {
  const attributes = {
    cacheKey: req.cacheKey,
    id: isNaN(req.params.id) ? req.params.id : parseInt(req.params.id, 10), // id can be ID or slug
  };

  return validate(fetchFacultySchema, attributes);
};

const addNewFaculty = async (req) => {
  const { name, abbreviation } = req.body;

  const attributes = {
    name,
    abbreviation,
  };

  return validate(addNewFacultySchema, attributes);
};

const updateFaculty = async (req) => {
  const { name, abbreviation } = req.body;

  const attributes = {
    id: parseInt(req.params.id, 10),
    name,
    abbreviation,
  };

  return validate(updateFacultySchema, attributes);
};

const deleteFaculty = async (req) => {
  const attributes = {
    id: parseInt(req.params.id, 10),
  };

  return validate(deleteFacultySchema, attributes);
};

module.exports = {
  fetchAllfaculties,
  fetchFaculty,
  addNewFaculty,
  updateFaculty,
  deleteFaculty,
};
