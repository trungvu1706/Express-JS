const isValidPersonName = name => {
    // nâng cấp lên tí

    if (!name || name.length < 4 || name.length > 15) {
        return false;
    }

    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(name);
}

//vl chua export=

module.exports = isValidPersonName;