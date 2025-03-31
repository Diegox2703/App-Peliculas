import express from 'express'
import registerValidation from '../schemas/register_validation.js'
import loginValidation from '../schemas/login_validation.js'
import users from '../db/users.json' assert {type: 'json'}

const router = express.Router()
router.use(express.json())

router.post('/register', (req, res) => {
    const result = registerValidation(req.body)
    const {user, email, number} = req.body

    const userValidation = users.find(usr => usr.user === user)
    const emailValidation = users.find(user => user.email === email)
    const numberValidation = users.find(user => user.number === number)

    if (result.error) return res.status(400).send({status: 'Error', errorMessage: JSON.parse(result.error.message)})
    if (userValidation) return res.status(400).send({status: 'Error', errorMessage: 'Usuario ya registrado'})
    if (emailValidation) return res.status(400).send({status: 'Error', errorMessage: 'Correo ya registrado'})
    if (numberValidation) return res.status(400).send({status: 'Error', errorMessage: 'numero ya registrado'})
    res.status(200).send({status: 'ok', route: '/movies'})

    users.push(result.data)
    console.log(users)
})

router.post('/login', (req, res) => {
    const result = loginValidation(req.body)
    const {user, password} = req.body

    const userValidation = users.find(usr => usr.user === user)
    const passwordValidation = users.find(pass => pass.password === password)

    if (result.error) return res.status(400).send({status: 'Error', errorMessage: JSON.parse(result.error.message)})
    if (!userValidation) return res.status(400).send({status: 'Error', errorMessage: 'Usuario no encontrado'})
    if (!passwordValidation) return res.status(400).send({status: 'Error', errorMessage: 'Contraseña incorrecta'})
    res.status(200).send({status: 'ok', route: '/movies'})
})

export default router