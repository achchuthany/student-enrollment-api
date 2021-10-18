const Joi = require("joi");

const fetchAllfaculties = () =>
  Joi.object().keys({
    cacheKey: Joi.string(),
    name: Joi.number().allow(null),
    uuid: Joi.number().allow(null),
    abbreviation: Joi.string().allow(null),
  });

const fetchFaculty = () =>
  Joi.object().keys({
    cacheKey: Joi.string(),
    id: Joi.alternatives(Joi.string(), Joi.number()).required(),
  });

const addNewFaculty = () =>
  Joi.object().keys({
    name: Joi.string().min(3).max(100).required(),
    abbreviation: Joi.string().min(3).max(5).required(),
  });

const updateFaculty = () =>
  Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().min(3).max(100),
    abbreviation: Joi.string().min(3).max(5),
  });

const deleteFaculty = () =>
  Joi.object().keys({
    id: Joi.number().required(),
  });

module.exports = {
  fetchAllfaculties,
  fetchFaculty,
  addNewFaculty,
  updateFaculty,
  deleteFaculty,
};
