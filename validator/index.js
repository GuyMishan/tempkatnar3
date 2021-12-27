exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'נדרש שם ').notEmpty()

    req.check('lastname', 'נדרש שם משפחה').notEmpty()

    req.check('number', 'נדרש מספר פלאפון').notEmpty()

    req.check('personalnumber', 'נדרש מספר אישי').notEmpty()
    req.check('personalnumber')
        .isLength(7)
        .withMessage('מספר אישי חייב להכיל 7 מספרים בדיוק')

    req.check('password', 'נדרשת סיסמא').notEmpty()
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('הסיסמא חייבת להכיל לפחות 6 אותיות')
        .matches(/\d/)
        .withMessage('הסיסמא חייבת להכיל מספר')


    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.tipulmakingValidator = (req, res, next) => {
    req.check('number', 'נדרש מס פלאפון').notEmpty()
    req.check('tipuldate', 'נדרש תאריך טיפול').notEmpty()
    req.check('cartype', 'נדרש סוג רכב').notEmpty()
    req.check('tipultype', 'נדרש סוג טיפול').notEmpty()
    req.check('egadtypeid', 'נדרש מתקן אחזקה').notEmpty()
    req.check('carnum', 'נדרש מס רכב').notEmpty()
   

    console.log(req.body);

    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({ error: firstError });
    }
    next();
};