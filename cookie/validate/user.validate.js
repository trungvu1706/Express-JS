const isVietnamesePhoneNumber = require('../helpers/check-phone-number');
const isValidPersonName = require('../helpers/check-person-name');
const { values } = require('../db');

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

    if (errors.length) {
        return res.render('users/create', {
            errors: errors,
            values: req.body
        });
    }

    next();
};