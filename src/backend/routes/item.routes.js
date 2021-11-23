const express = require("express");
const itemController = require("../controller/item.controller");
const router = express.Router();

router.get("/", itemController.findAll);
router.post("/", itemController.create);
router.get("/:id", itemController.findById);
router.delete("/:id", itemController.delete);
router.put("/:id", itemController.update);

module.exports = router;