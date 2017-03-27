const multipart = require('connect-multiparty'),
      multipartMiddleware = multipart(),
      User = require('../controllers/sortFile.controller.js');

// API Server Endpoints
module.exports = (app) => { 
  app.get('/', User.displayForm);
  app.post('/upload', multipartMiddleware, User.uploadDownload);
}
