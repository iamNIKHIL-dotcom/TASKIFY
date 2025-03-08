const express = require("express")
const { Todo } = require("../db")

const {authenticateJwt } = require("../middleware/user");
const { route } = require("./user");

const router = express.Router();
router.use(authenticateJwt)


router.post("/", (req,res) = {

})

router.get("/" , (req,res) => {

})

router.put("/:id", (req, res) => {

})

module.exports = router;