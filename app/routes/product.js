module.exports = app => {
    const { authJwt }   = require("../middlewares");
    const products      = require("../controllers/product.controller.js");
    var router          = require("express").Router();
    
    router.post("/",[authJwt.verifyToken], products.store);
    router.get("/",[authJwt.verifyToken], products.getAll);
    router.get("/:id",[authJwt.verifyToken], products.getOne);
    router.put("/:id",[authJwt.verifyToken], products.update);
    router.delete("/:id",[authJwt.verifyToken], products.delete);

    app.use('/api/product', router);
  };