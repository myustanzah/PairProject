const express = require(`express`)
const router = express.Router()
const Controller = require(`../controllers/controller`)
const tenant = require(`./tenant`)
const landlord = require(`./landlord`)

router.route(`/`)
.get(Controller.loginPage)


router.use(`/tenant`, tenant)

router.use(`/landlord`, landlord)

module.exports = router
