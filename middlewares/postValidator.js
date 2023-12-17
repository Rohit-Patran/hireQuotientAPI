export default function postValidator(request , response, next)
{
    request.check('title' , "Title of a Post is mandatory").notEmpty();
    request.check('content' , "Content cannot be empty").notEmpty();

    const errors = request.validationErrors();

    if(errors)
    {
        const firstError = errors.map(error => error.msg)[0]
        return response.status(400).json({error : firstError});
    }
    next();
}