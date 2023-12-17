export default function userSignupValidator(request , response , next)
{
    request.check('name' , 'name is mandatory').notEmpty();
    request.check('email' , 'email should be between 3 to 32 characters')
    .matches(/.+\@.+\..+/)
    .withMessage('email must contain @')
    .isLength({
        min : 4,
        max : 32
    });

    request.check('password' , 'password is mandatory').notEmpty();
    request.check('password')
    .isLength({
        min : 6
    })
    .withMessage('password must contain atleast 6 characters')
    .matches(/\d/)
    .withMessage('password must contain atleast one digit')

    const errors = request.validationErrors();

    if(errors)
    {
        const firstError = errors.map(error => error.msg)[0]
        return response.status(400).json({error : firstError});
    }
    next();
}