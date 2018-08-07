"use strict";

exports.addErrorHandling = app => {
  app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + " not found"})
  });
};
