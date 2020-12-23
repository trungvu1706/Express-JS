const isVietnamesePhoneNumber = require('../helpers/check-phone-number');
const isValidPersonName = require('../helpers/check-person-name');
const isValidateEmail = require('../helpers/check-email');

module.exports.postCreate = function(req, res, next) {
    var errors = [];
    if (!req.body.name) {
        errors.push('Name is required');
    }

    if (!isValidPersonName(req.body.name)) {
        errors.push('Name is invalid')
    }

    if (!req.body.phone) {
        errors.push('Phone is required');
    }

    if (!isVietnamesePhoneNumber(req.body.phone)) {
        errors.push('Phone is invalid');
    }

    if (!isValidateEmail(req.body.email)) {
        errors.push('Email is invalid');
    }

    // controller

    if (errors.length) {
        return res.render('users/create', {
            errors: errors,
            values: req.body
        });
    }

    next();
};

module.exports.postUpdate = function(req, res, next) {
    var errors = [];
    console.log(req.body)

    if (!isValidPersonName(req.body.name)) {
        errors.push('Name is invalid')
    }

    if (!isVietnamesePhoneNumber(req.body.phone)) {
        errors.push('Phone is invalid');
    }

    if (errors.length) {
        return res.render('users/update', {
            errors: errors,
            values: req.body,
            user: {
                id: req.params.userId
            }
        });
    }

    next();

}