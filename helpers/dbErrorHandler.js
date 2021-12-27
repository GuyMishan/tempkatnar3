


exports.errorHandler = error => {
    let message = "";

    if(error.code){
        switch (error.code) {
            case 11000:
            case 11001:
                message = "המייל כבר קיים";
                break;
            default:
                message = "משהו הלך לא כשורה"
        }
    } else {
        for (let errorName in error.errorors) {
            if( error.errorors[errorName].message)
                message = error.errorors[errorName].message;
        }
    }
    return message;
}