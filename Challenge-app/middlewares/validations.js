const {body} = require ('express-validator')
module.exports = {
    userRegister : [
        body ('name')
            .notEmpty().withMessage ('Tiene que ingresar un nombre').bail()
            .isLength({ min:2,}).withMessage ('Su nombre es muy corto: debe contar con al menos 2 caracteres')
            .isLength({ max:50,}).withMessage ('Su nombre es muy largo'),
        
        body ('email')
            .notEmpty().withMessage ('Tiene que ingresar su e-mail').bail()
            .isEmail().withMessage ('Ingresa un email valido'),
        
        body ('password')
            .notEmpty().withMessage ('Tiene que ingresar una contraseña').bail()
            .isLength( { min:6, max:12 }).withMessage ('Su contraseña debe tener al menos 6 caracteres y no mas de 12'),
    ],

    loginForm : [
        body ('email').isEmail().withMessage ('Ingresa un email valido'),
        body ('password').notEmpty() .withMessage ('Ingresa una contraseña'),
    ],
    // Validaciones para creacion de producto
    CreateMovie : [
        body ('title')
            .notEmpty().withMessage ('Ingrese el titulo de la pelicula').bail()
            .isLength({ min:2,}).withMessage ('Debe tener al menos 2 letras')
            .isLength({ max:50,}).withMessage ('No puede ser mayor a 30 letras'),

        body ('genre')
            .notEmpty().withMessage ('Debes seleccionar un genero'),
    ],

}