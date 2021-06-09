const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const validations = require('../middlewares/validations');

router.get('/', moviesController.list);

router.get('/create' , moviesController.create)
router.post('/create' , validations.CreateMovie , moviesController.add);

router.get('/userRegister' , moviesController.registerForm);
router.post('/userRegister' , validations.userRegister , moviesController.register);

router.get('/login' , moviesController.login);
router.post('/login' , validations.loginForm , moviesController.loginAuth);
router.get('/logout' , moviesController.logout);

router.get('/:id', moviesController.detail);
router.get('/userDetail/:id' , moviesController.userDetail);
router.get('/:id/edit', moviesController.edit);
router.put('/:id/edit' , moviesController.editProcess);
router.delete('/:id/delete' , moviesController.delete);






module.exports = router;
