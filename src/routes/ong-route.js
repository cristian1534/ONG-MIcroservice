const express = require("express");
const router = express.Router();
const controller = require("../controllers/ong-controller");
const { validate_register } = require("../middlewares/validator_register");
const { validate_login } = require("../middlewares/validator_login");
const verify_token = require("../middlewares/validator_token");
// const passport = require("passport")


// router.get('/auth/facebook',
//   passport.authenticate('facebook'));

// router.get('/auth/facebook/home',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/home');
//   });


/**
 * @swagger
 * components:
 *   securitySchemes: 
 *      bearerAuth:
 *       type: http
 *       scheme: bearer
 *       required:
 *         - JWT Token
 *       
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - confirm_password
 *         - website
 *         - telephone
 *         - telephone
 *         - ong_type
 *         - user_comment
 *       properties:
 *         name:
 *           type: string
 *           description: ONG's name.
 *         email:
 *           type: string
 *           description: ONG's email.
 *         password:
 *           type: string
 *           description: ONG's password.
 *         confirm_password:
 *           type: string
 *           description: ONG's confirm_password.
 *         website:
 *           type: string
 *           description: ONG's website.
 *         telephone:
 *           type: number
 *           description: ONG's telephone.
 *         ong_type:
 *           type: string
 *           description: ONG's type.
 *         user_comment:
 *           type: string
 *           description: ONG's comment from user.
 *         
 *       example:
 *         name: "Voluntad ONG"
 *         email: "voluntad@gmail.com"
 *         password: "12345678"
 *         confirm_password: "12345678"
 *         website: "www.voluntad.com"
 *         telephone: 55556666
 *         ong_type: ["cultura", "deportes", "educacion"] 
 *         user_comment: "Mi primer experiencia en Administracion fue en ONG BS AS con buen clima laboral." 
 * 
 * 
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: ONG's email.
 *         password:
 *           type: string
 *           description: ONG's password.
 *       example:
 *         email: "voluntad@gmail.com"
 *         password: "12345678"
 * 
 * 
 * 
*/

/**
 * @swagger
 * tags: 
 *   name: ONG
 *   description: Backend ONG Service REST API.
*/

/**
 * @swagger
  * /api/ong-register:
 *   post:
 *     summary: Create a new ONG
 *     tags: [ONG]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: Registro Exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *       500:
 *         description: Hubo un error en el registro
 */
router.post("/ong-register", validate_register, controller.register);
router.post("/ong-upload-image", controller.upload_image_profile);




/**
 * @swagger
  * /api/ong-login:
 *   post:
 *     summary: Login an ONG
 *     tags: [ONG]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: ONG's data and Token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       400:
 *         description: EMAIL o CONTRASEÑA incorrectas
 *       500:
 *         description: Verifique sus credenciales
 */
router.post("/ong-login", validate_login, controller.login);

/**
 * @swagger
 * /api/ong-get/{id}:
 *   get:
 *     security: 
 *      - bearerAuth: []
 *     summary: Get the ONG selected if registered.
 *     tags: [ONG]
 *     parameters: 
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: ONG's fetched.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Register'
 *       400:
 *         description: No se han encontrado ONGs registradas
 *       404:
 *         description: No se ha encontrado la ONG
 */
router.get("/ong-get/:id", verify_token, controller.get_ong);

/**
 * @swagger
 * /api/ong-get-ongs:
 *   get:
 *     summary: Get all the ONG's registered.
 *     tags: [ONG]
 *     responses:
 *       200:
 *         description: The list of ONGs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Register'
 *       400:
 *         description: No se han encontrado ONGs registradas
 *       500:
 *         description: Error del servidor
 */
router.get("/ong-get-ongs", controller.get_all_ongs);




/**
 * @swagger
 * /api/ong-update-ong/{id}:
 *   put:
 *     security: 
 *      - bearerAuth: []
 *     summary: Update the ONG selected if registered.
 *     tags: [ONG]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ONG's id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: Se han actualizado los datos de la ONG.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Register'
 *       500:
 *         description: Error de servidor
 *       404:
 *         description: No se ha encontrado la ONG
 */
router.put("/ong-update-ong/:id", verify_token, controller.update_ong);


/**
 * @swagger
 * /api/ong-delete-ong/{id}:
 *   delete:
 *     security: 
 *      - bearerAuth: []
 *     summary: Delete the ONG selected if registered.
 *     tags: [ONG]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ONG's id.
 *     responses:
 *       200:
 *         description: Se ha eliminado la ONG.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Register'
 *       500:
 *         description: Error de servidor
 *       404:
 *         description: No se ha encontrado la ONG
 */
router.delete("/ong-delete-ong/:id", verify_token, controller.delete_ong);

module.exports = router;


