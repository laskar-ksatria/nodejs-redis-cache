const bcr = require('bcryptjs');

function hashPass(pass) {
    let salt = bcr.genSaltSync(10);
    return  bcr.hashSync(pass, salt);
};

function checkPass(pass, hashPass) {
    return bcr.compareSync(pass, hashPass);
};

module.exports = {
    hashPass,
    checkPass
};