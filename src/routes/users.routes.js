import express from 'express'
import bodyParser from 'body-parser' // Agrega la importación de bodyParser
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/users.controller.js'

const router = express.Router()

// Configurar body-parser para analizar el cuerpo de la petición en formato JSON
router.use(bodyParser.json())

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Endpoint to get all registered users.
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Server error
 */
router.get('/', getUsers)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Endpoint to get a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to get
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User found
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 */
router.get('/:id', getUserById)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               role:
 *                 type: string
 *                 description: The role of the user (e.g., "user" or "admin")
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '500':
 *         description: Server error
 */
router.post('/', createUser)

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Endpoint to update a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The new username of the user
 *               email:
 *                 type: string
 *                 description: The new email of the user
 *             required:
 *               - username
 *               - email
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '400':
 *         description: Bad request, missing username or email
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 */
router.put('/:id', updateUser)

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Endpoint to delete a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 */
router.delete('/:id', deleteUser)

// Opciones de configuración para Swagger JSDoc
const options = {
  definition: {
    openapi: '3.0.0', // Especifica la versión de OpenAPI que estás utilizando
    info: {
      title: 'Nombre de tu API', // Título de tu API
      version: '1.0.0', // Versión de tu API
      description: 'Descripción de tu API' // Descripción de tu API
    }
  },
  apis: ['./routes/*.js'] // Rutas donde se encuentra la documentación de Swagger
}

// Configura Swagger JSDoc con las opciones definidas
const specs = swaggerJsdoc(options)

// Genera y sirve la documentación de Swagger UI
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

export default router
