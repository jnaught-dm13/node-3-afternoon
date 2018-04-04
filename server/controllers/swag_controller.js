const swag = require("../models/swag");

module.exports = {
  readSwag: (req, res, next) => {
    res.status(200).json(swag);
  }
};
