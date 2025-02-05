export const getErrorMessage = (err) => {
    console.log(err.name); //Know what type of error you get

    switch(err.name) {
        case 'ValidationError':
            return Object.values(err.errors).at(0).message;

            //err.errors.email.message || err.errors.password.message
        default:
            return err.message;
    }
}