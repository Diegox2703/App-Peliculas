import z from 'zod'

const userSchema = z.object({
    user: z.string().min(8,{
        message: 'Usuario incompleto'
    }),
    password: z.string().min(8, {
        message: 'Contraseña incompleta'
    })
})

function loginValidation (object) {
    return userSchema.safeParse(object)
}

export default loginValidation