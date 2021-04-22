const express = require(`express`)
const router = express.Router()
const Controller = require(`../controllers/controller`)
const {Landlord} = require(`../models/index`)

function auth(req, res, next){
    Landlord.findAll({
        where : {
            email : req.body.email,
            password : req.body.password
        }
    })
    .then(data=>{
        if(data.length==1){ //Kalau ada maka bisa masuk
            req.session.name = data[0].name //Session properti name mengambil nama pemilik kost
            req.session.email = data[0].email //Session properti email mengambil email pemilik kost
            req.session.role = "landlord" //Session properti role mengambil sebagai "landlord"
            console.log(req.session)
            next()
        } else {
            next()
        }
    })
    .catch(err=>{
        console.log(err);
        res.send(err)
    })
}

router.route(`/`)
.post(auth, Controller.mainPageLandlordPost)
.get(Controller.mainPageLandlordGet)

router.route(`/ads/add/:id`)
.get(Controller.adAddGet)
.post(Controller.adAddPost)

router.route(`/ads/delete/:id`)
.get(Controller.deleteAd)

router.route(`/ads/update/:id`)
.get(Controller.adUpdateGet)
.post(Controller.adUpdatePost)

router.route(`/ads/addFacilities/:id`)
.post(Controller.addFacilities)

router.route(`/logout`)
.get(Controller.logoutLandlord)

module.exports = router