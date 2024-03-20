const path = require('path');
const getPath = (file) => path.join(__dirname, '..', file);
module.exports = { getPath };
