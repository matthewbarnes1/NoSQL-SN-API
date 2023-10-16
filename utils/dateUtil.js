const moment = require('moment'); 

function dateFormat(timestamp) {
    return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
}

module.exports = {
    dateFormat
};

