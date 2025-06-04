const {z} = require('zod')

const registerSchema = z.object({
    username: z
    .string({required_error: "name is required"})
    .min(3, {message: "name must have 3 chars"})
    .max(30, {message: "name cannot have more than 30 chars"})
    .trim(),

    email: z
    .string({required_error: "email is required"})
    .trim()
    .email({message: "this is not a email"}),

    password: z
    .string({required_error: "password is required"})
    .trim()
    .min(5, {message: "minimum 5 chars in the password"})
    .max(32, {message: "maximum 32 chars in the password"}),    
})

module.exports = {registerSchema}