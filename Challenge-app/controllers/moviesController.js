const bcrypt = require ('bcryptjs')
const db = require('../database/models')
const { validationResult } = require ('express-validator');
const { promiseImpl } = require('ejs')

module.exports = {
    create (req ,res) {
        db.genres.findAll()
            .then((genres) => res.render('create' , { genres }))
    } ,

    add (req ,res) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            db.genres.findAll()
                .then(genres => {return res.render('create' , {genres , errors: errors.mapped() , oldFormData: req.body})});
        } else {
            db.movies.create({
            title: req.body.title , 
            genre_id: req.body.genre ,
            actor_: req.body.actors
        });
            res.redirect('/')
        }  
    } ,   

    edit (req, res) {
        const id = req.params.id
        
        Promise.all ([
            db.movies.findByPk(id),
            db.actors.findAll(),
            db.genres.findAll(),                   
        ])

        .then (([movie, actors, genres]) => {
            res.render('edit', {movie, actors, genres}) 
        })

    } ,

    editProcess (req , res )  {
        const { id } = req.params
        const { name, genre_id , actor_id } =  req.body
        const errors = validationResult(req)
        
        if (errors.isEmpty()) {
            db.movies.findByPk(id)
                .then(movie => {            
                        db.movies.update({
                            title: req.body.title ,
                            genre_id: req.body.genre ,
                            actor_id: req.body.actors
                        },

                        {
                            where: { id }
                        })
    
                            .then(() => {
                                res.redirect('/')
                            })
                    })
        } else { 
            db.movies.findAll()
                .then(movies => {return res.render('edit' , {movies , errors: errors.mapped() , oldFormData: req.body})});
        }

                  
    },

    delete (req, res) {  
        
        db.movies.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(res.redirect('/'))
    } ,

    list (req, res) {
        db.movies.findAll({attributes: ['id', 'title']})
            .then(movies => res.render('index' , { movies }));
    } ,

    detail (req, res) {
        db.movies.findByPk(req.params.id , {
            include: ["genre" , "actor"]
        })
            .then(movie => res.render('detail' , { movie }));
    } ,

    registerForm(req, res) {
        db.users.findAll()
            .then((users) => res.render('userRegister' , { users }))
    } ,

    register (req, res) {
        let errors = validationResult(req)
        let passwordHash = bcrypt.hashSync(req.body.password, 10) 

        if (errors.isEmpty()) {
            db.users.create({
                name: req.body.name , 
                email: req.body.email ,
                password: passwordHash ,
                rol: req.body.rol
            })

            res.redirect('/');
        }else{
            db.users.findAll()
                .then(user => {return res.render('userRegister' , {user , errors: errors.mapped() , oldFormData: req.body})});
        }
        
    },

    login (req, res) {
        res.render('login');
    } ,
    loginAuth (req ,res) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            
            db.users.findOne({
                where: {
                    email: req.body.email
                }
            })
            
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)){
                        req.session.user = user
                        return res.redirect('/');
                            
                    } else {
                        res.render('login', {
                            errors: {
                                password: {
                                    value: '',
                                    msg: 'el email o la contraseña son incorrectos ',
                                    param: 'password',
                                    location: 'body'
                                  }
                            },
                        })
    
                    }
                    
                } else {
                    res.render('login', {
                        errors: {
                            password: {
                                value: '',
                                msg: 'el email o la contraseña son incorrectos',
                                param: 'email',
                                location: 'body'
                              }
                        },
                        oldFormData: req.body
                    })
                }
            })

        } else {
            res.render('login', { 
            errors: errors.mapped(),
            oldFormData: req.body
            });
    }
        
    } ,

    logout (req, res) {
        req.session.destroy()
        res.redirect ('/')
    },

    userDetail (req, res) {
        db.users.findByPk(req.params.id)
            .then(user => res.render('userDetail', { user }));
    }
    
}