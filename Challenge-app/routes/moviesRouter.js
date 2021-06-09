const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const validations = require('../middlewares/validations');


//home
router.get('/', moviesController.list);

//crear una pelicula
router.get('/create' , moviesController.create)
router.post('/create' , validations.CreateMovie , moviesController.add);

//registrar un usuario
router.get('/userRegister' , moviesController.registerForm);
router.post('/userRegister' , validations.userRegister , moviesController.register);

//login y logout
router.get('/login' , moviesController.login);
router.post('/login' , validations.loginForm , moviesController.loginAuth);
router.get('/logout' , moviesController.logout);

//detalle de pelicula y usuario
router.get('/:id', moviesController.detail);
router.get('/userDetail/:id' , moviesController.userDetail);

//editar pelicula
router.get('/:id/edit', moviesController.edit);
router.put('/:id/edit' , moviesController.editProcess);

//borrar pelicula
router.delete('/:id/delete' , moviesController.delete);






module.exports = router;
