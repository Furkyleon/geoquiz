var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController.js");

router.get("/", userController.list);
router.get("/:id", userController.show);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = router;
