/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
const controller = require("../controller");
const facultyValidator = require("../validators/facultyValidator");
const facultyService = require("../services/facultyService");
const { defaultResolve } = require("../utilities/responseHelper");
const Logger = require("../utilities/loggingHelper");
const { flushCacheDb } = require("../utilities/cacheHelper");

const fetchAllfaculties = async (req, res) => {
  await controller(req, res, {
    validator: facultyValidator.fetchAllfaculties,
    service: facultyService.fetchAllFaculties,
  });
};

const fetchFaculty = async (req, res) => {
  await controller(req, res, {
    validator: facultyValidator.fetchFaculty,
    service: facultyService.fetchFaculty,
  });
};

const addNewFaculty = async (req, res) => {
  await controller(req, res, {
    validator: facultyValidator.addNewFaculty,
    service: facultyService.addNewFaculty,
    resolve: async (response, data) => {
      // custom resolve to send 201 status for created resource
      const { flushCache, ...payload } = data;
      response.status(201).json({
        data: payload,
        status: "success",
      });

      if (flushCache) {
        // flush cache
        const result = await flushCacheDb();
        Logger.log("debug", `Cleared Cache: ${result.toString()}`);
      }
    },
  });
};

const updateFaculty = async (req, res) => {
  await controller(req, res, {
    validator: facultyValidator.updateFaculty,
    service: facultyService.updateFaculty,
  });
};

const deleteFaculty = async (req, res) => {
  await controller(req, res, {
    validator: facultyValidator.deleteFaculty,
    service: facultyService.deleteFaculty,
  });
};

module.exports = {
  fetchAllfaculties,
  fetchFaculty,
  addNewFaculty,
  updateFaculty,
  deleteFaculty,
};
