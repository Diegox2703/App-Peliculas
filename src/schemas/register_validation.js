import z from 'zod'

const userSchema = z.object({
    user: z.string().min(8, {
        message: 'El usuario debe tener mas de 8 caracteres'
    }).max(12, {
        message: 'El usuario no debe tener mas de 12 caracteres'
    }),
    email: z.string().email({
        message: 'Email invalido'
    }),
    number: z.number({
        message: 'Numero de celular invalido'
    }).min(1000000000, {
        message: 'Numero de celular incompleto'
    }).max(10000000000, {
        message: 'Numero de celular invalido'
    }),
    password: z.string().min(8, {
        message: 'La contraseña debe tener mas de 8 caracteres'
    }).max(15, {
        message: 'La contraseña no debe tener mas de 15 caracteres'
    })
})

function registerValidation (object) {
    return userSchema.safeParse(object)
}

export default registerValidation