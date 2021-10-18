/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();

// Controllers
const facultyController = require("../controllers/facultyController");

/**
 * @swagger
 * /faculties:
 *  get:
 *   summary: Get all faculties
 *   tags:
 *     - Faculty
 *   description: Fetch all the faculties from database
 *   parameters:
 *    - in: query
 *      name: page
 *      schema:
 *       type: number
 *      required: false
 *      description: page number
 *    - in: query
 *      name: limit
 *      schema:
 *       type: number
 *      required: false
 *      description: number of items per page
 *    - in: query
 *      name: sortBy
 *      schema:
 *       type: string
 *      required: false
 *      description: column name to sort the result
 *   responses:
 *    200:
 *     description: Successful Response
 *    304:
 *     description: Not Modified
 *    422:
 *     description: Parameter Validation Error
 *    429:
 *     description: Too Many Requests
 *    500:
 *     description: Internal Server Error
 */
router.get("/faculties", facultyController.fetchAllfaculties);

/**
 * @swagger
 * /faculties:
 *  post:
 *   summary: Create new faculty
 *   tags:
 *     - Faculty
 *   description: Add new faculties to the list of faculties
 *   consumes:
 *      - application/json
 *   parameters:
 *     - in: body
 *       name: Faculty
 *       description: Payload for create new faculty API
 *       schema:
 *         type: object
 *         required:
 *           - name
 *           - abbreviation
 *         properties:
 *           name:
 *             type: string
 *             description: Name of the faculty
 *           abbreviation:
 *             type: string
 *             description: Abbreviation of the faculty
 *   responses:
 *    201:
 *     description: Resource Created
 *    422:
 *     description: Parameter Validation Error
 *    429:
 *     description: Too Many Requests
 *    500:
 *     description: Internal Server Error
 */
router.post("/faculties", facultyController.addNewFaculty);

/**
 * @swagger
 * /faculties/{id}:
 *  get:
 *   summary: Get Faculty by ID
 *   tags:
 *     - Faculty
 *   description: Fetch Faculty information using ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id
 *   responses:
 *    200:
 *     description: Successful Response
 *    304:
 *     description: Not Modified
 *    422:
 *     description: Parameter Validation Error
 *    429:
 *     description: Too Many Requests
 *    500:
 *     description: Internal Server Error
 */
router.get("/faculties/:id", facultyController.fetchFaculty);

/**
 * @swagger
 * /faculties/{id}:
 *  patch:
 *   summary: Update Faculty
 *   tags:
 *     - Faculty
 *   description: Update Faculty information
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id or slug
 *    - in: body
 *      name: Faculty
 *      description: Payload for update Faculty API
 *      schema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: Name of the faculty
 *          slug:
 *            type: string
 *            abbreviation: abbreviation of the faculty
 *   responses:
 *    200:
 *     description: Successful Response
 *    422:
 *     description: Parameter Validation Error
 *    429:
 *     description: Too Many Requests
 *    500:
 *     description: Internal Server Error
 */
router.patch("/faculties/:id", facultyController.updateFaculty);

/**
 * @swagger
 * /faculties/{id}:
 *  delete:
 *   summary: Delete Faculty
 *   tags:
 *     - Faculty
 *   description: Delete Faculty record
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id
 *   responses:
 *    200:
 *     description: Successful Response
 *    404:
 *     description: Not Found
 *    422:
 *     description: Parameter Validation Error
 *    429:
 *     description: Too Many Requests
 *    500:
 *     description: Internal Server Error
 */
router.delete("/faculties/:id", facultyController.deleteFaculty);

module.exports = router;
