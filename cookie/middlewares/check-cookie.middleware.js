var count = 0;

var checkCookie = (req, res, next) => {
    if (req.cookies.userId) {
        count++;
    } else {
        res.cookie('userId', 1234);
    }

    console.log('userId' + ':' + count);

    next();
};

module.exports = checkCookie;