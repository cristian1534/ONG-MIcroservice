const express = require("express");
const router = express.Router();
const controller = require("../controllers/post-controller");
const { validate_post } = require("../middlewares/validator_post");
const verify_token = require("../middlewares/validator_token");


/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - requirement
 *         - available
 *         - area
 *       properties:
 *         title:
 *           type: string
 *           description: Post's title.
 *         description:
 *           type: string
 *           description: Post's description.
 *         requirement:
 *           type: string
 *           description: Post's requirement.
 *         available:
 *           type: string
 *           description: Post's job available type.
 *         area:
 *           type: string
 *           description: Post's job area.
 *       example:
 *         title: "Auxiliar administrativo"
 *         description: "Trabajo Part Time"
 *         requirement: "Manejo de Office 365"
 *         available: ["presencial", "hibrido", "remoto"]
 *         area: ["administracion", "operativo", "legales", "marketing"]
 * 
*/

/**
 * @swagger 
 * tags: 
 *   name: POST
 *   description: Backend POST Service REST API.
*/

/**
 * @swagger
  * /api/ong-create-post:
 *   post:
 *     security: 
 *      - bearerAuth: []
 *     parameters: 
 *     summary: Create a new POST
 *     tags: [POST]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: POST creado con exito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Hubo un error en CREAR POST
 */

router.post("/ong-create-post", verify_token, validate_post, controller.create);

/**
 * @swagger
 * /api/ong-get-post/{id}:
 *   get:
 *     security: 
 *      - bearerAuth: []
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The POST's id.
 *     summary: Get the ONG's post selected if created.
 *     tags: [POST]
 *     responses:
 *       200:
 *         description: The list of Posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       400:
 *         description: No se han encontrado POSTS registradas
 *       404:
 *         description: No se ha encontrado el POST
 */
router.get("/ong-get-post/:id" , verify_token, controller.get_post);

/**
 * @swagger
 * /api/ong-get-posts:
 *   get:
 *     security: 
 *      - bearerAuth: []
 *     summary: Get all the ONG's posts registered.
 *     tags: [POST]
 *     parameters: 
 *     responses:
 *       200:
 *         description: The list of ONG's posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       404:
 *         description: No se han encontrado POSTS registradas
 *       500:
 *         description: Error del servidor
 */
router.get("/ong-get-posts" , verify_token, controller.get_all_posts);



/**
 * @swagger
 * /api/ong-update-post/{id}:
 *   put:
 *     security: 
 *      - bearerAuth: []
 *     summary: Update the POST selected if created.
 *     tags: [POST]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The POST's id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Se han actualizado los datos del POST.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Error de servidor
 *       404:
 *         description: No se ha encontrado el POST para actualizar
 * 
 */
router.put("/ong-update-post/:id" , verify_token, controller.update_post);

/**
 * @swagger
 * /api/ong-delete-post/{id}:
 *   delete:
 *     security: 
 *      - bearerAuth: []
 *     summary: Delete the ONG's post selected if created.
 *     tags: [POST]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The POST's id.
 *     responses:
 *       200:
 *         description: Se ha eliminado el POST.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Error de servidor
 *       404:
 *         description: No se ha encontrado el POST
 */
router.delete("/ong-delete-post/:id" , verify_token, controller.delete_post);

module.exports = router;