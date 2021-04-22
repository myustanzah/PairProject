const {Ad, Facility, Landlord, RoomFacility, Tenant} = require(`../models/index`)
const moneyformatter = require(`../helpers/moneyformatter`)

class Controller {
    static loginPage(req, res){
        if(req.session.email){
            if(req.session.role == "landlord"){
                res.redirect(`/landlord`)
            } else if (req.session.role == "tenant"){
                res.redirect(`/tenant`)
            }
        } else {
            res.render(`login`,{
                title : "Login"
            })
        }
    }

    static mainPageLandlordPost(req, res){
        if(req.session.email && req.session.role == "landlord"){ 
            res.redirect(`/landlord`)
        } else {
            res.redirect(`/`)
        }
    }

    static mainPageLandlordGet(req, res){
        if(req.session.email && req.session.role == "landlord"){  //Jika ada session user dan role nya adalah pemilik kost
            Landlord.findAll({ //maka diambil lah user sesuai email yang ada di session
                where : {
                    email : req.session.email
                },
                include : [
                    {
                        model : Ad
                    }
                ]
            })
            .then(data=>{
                res.render(`landlord`, {
                    title : "Main Page",
                    name : req.session.name,
                    landlord : data[0],
                    moneyformatter
                })
            })
            .catch(err=>{
                console.log(err);
                res.send(err)
            })
        } else {
            res.redirect(`/`)
        }
    }

    static logoutLandlord(req, res){
        req.session.destroy()
        res.redirect(`/`)
    }

    static adAddGet(req, res){
        if(req.session.email && req.session.role == "landlord"){
            Landlord.findByPk(req.params.id)
            .then(target=>{
                res.render(`addad`,{
                    title : "Tambah Iklan",
                    landlord : target,
                })
            })
            .catch(err=>{
                console.log(err)
                res.send(err)
            })
        } else {
            res.redirect(`/`)
        }
    }

    static adAddPost(req, res){
        req.body.LandlordId = req.params.id
        console.log(req.files, "ini di Controller")
        if(req.files){
            let imgfile = req.files.image;
		    req.body.image = imgfile.name;
            imgfile.mv(__dirname+`/../upload/`+imgfile.name)
        }
        console.log(req.body)
        Ad.create(req.body)
        .then(result=>{
            res.redirect(`/landlord`)
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        })
    }

    static adUpdateGet(req, res){
        if(req.session.email && req.session.role == "landlord"){
            let ad
            let landlord
            Ad.findAll({
                where : {
                    id : req.params.id
                },
                include : [{
                    model : Facility
                }]
            })
            .then(target=>{
                ad = target[0]
                console.log(ad)
                return Landlord.findAll({
                    where : {
                        email : req.session.email
                    }})
            })
            .then(target=>{
                landlord = target[0]
                return Facility.findAll()
            })
            .then(facilities=>{
                let notNullFac = ""
                if(req.query.notNullFac){
                    notNullFac = req.query.notNullFac
                }
                res.render(`adupdate`,{
                    title : "Edit Iklan",
                    landlord : landlord,
                    ad : ad,
                    facility : facilities,
                    notNullFac : notNullFac
                })
            })
            .catch(err=>{
                console.log(err);
                res.send(err)
            })
        } else {
            res.redirect(`/`)
        }
    }

    static adUpdatePost(req, res){
        Ad.update(req.body,{
            where : {
                id : req.params.id
            },
            individualHooks: true
        })
        .then(result=>{
            res.redirect(`/`)
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        })
    }

    static addFacilities(req, res){
        RoomFacility.findAll({
            where : {
                FacilityId : req.body.FacilityId,
                AdId : req.params.id
            }
        })
        .then(result=>{
            if(result.length>0){
                let notNullMsg = "Fasilitas yang ingin ditambah sudah ada"
                res.redirect(`/landlord/ads/update/${req.params.id}?notNullFac=${notNullMsg}`)
            } else {
                return RoomFacility.create({
                    FacilityId : req.body.FacilityId,
                    AdId : req.params.id
                })
            }
        })
        .then(result=>{
            res.redirect(`/landlord/ads/update/${req.params.id}`)
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        })
    }

    static deleteAd(req, res){
        if(req.session.email && req.session.role == "landlord"){
            Ad.destroy({
                where : {
                    id : req.params.id
                }
            })
            .then(result=>{
                res.redirect(`/landlord`)
            })
            .catch(err=>{
                console.log(err);
                res.send(err)
            })
        } else {
            res.redirect(`/`)
        }
    }

    static mainPageTenantPost(req, res){
        if(req.session.email && req.session.role == "tenant"){ 
            res.redirect(`/tenant`)
        } else {
            res.redirect(`/`)
        }
    }

    static mainPageTenantGet(req, res){
        if(req.session.email && req.session.role == "tenant"){  //Jika ada session user dan role nya adalah pemesan
            let tenant
            Tenant.findAll({ //maka diambil lah user sesuai email yang ada di session
                where : {
                    email : req.session.email
                }
            })
            .then(data=>{
                tenant=data[0]
                return Ad.findAll()
            })
            .then(ads=>{
                let msg = ""
                if(req.query.sudahbook){
                    msg = req.query.sudahbook
                }
                res.render(`tenant`, {
                    title : "Main Page",
                    name : req.session.name,
                    tenant : tenant,
                    ad : ads,
                    bookMsg : msg,
                    moneyformatter
                })
            })
            .catch(err=>{
                console.log(err);
                res.send(err)
            })
        } else {
            res.redirect(`/`)
        }
    }

    static adBookGet(req, res){
        if(req.session.email && req.session.role == "tenant"){ 
            Tenant.findByPk(req.params.tenant_id)
            .then(target=>{
                // console.log(target)
                if(target.AdId == null || target.AdId == false){
                    Tenant.update({
                            AdId : req.params.ad_id,
                            PendingBook : true
                    },{
                        where : {
                            id : req.params.tenant_id
                        }
                    })
                    .then(result=>{
                        res.redirect(`/tenant`)
                    })
                    .catch(err=>{
                        console.log(err);
                        res.send(err)
                    })
                } else {
                    let pesanBook = "Oops kamu sudah ada bookingan yang sedang berlangsung"
                    res.redirect(`/tenant?sudahbook=${pesanBook}`)
                }
            })
            .catch(err=>{
                console.log(err);
                res.send(err)
            })
            
        } else {
            res.redirect(`/`)
        }
    }

    static pendingBookGet(req, res){
        if(req.session.email && req.session.role == "tenant"){
            Tenant.findAll({
                where : {
                    id : req.params.tenant_id
                },
                include : [{
                    model : Ad
                }]
            })
            .then(target=>{
                // console.log(target[0].Ad)
                // console.log(target)
                res.render(`pendingbook`,{
                    title : "Pending Book",
                    ad : target[0].Ad,
                    tenant : target[0],
                    moneyformatter
                })
            })
            .catch(err=>{
                console.log(err);
                res.send(err)
            })
        } else {
            res.redirect(`/`)
        } 
    }

    static applyBook(req, res){
        if(req.session.email && req.session.role == "tenant"){
            Ad.decrement(`availableroom`,{
                    where : {
                        id : req.params.ad_id
                    }
            })
            .then(result=>{
                return Tenant.update({
                    AdId : null,
                    PendingBook : false
                },{
                    where : {
                        id : req.params.tenant_id
                    }
                })
            })
            .then(result=>{
                res.redirect(`/tenant`)
            })
            .catch(err=>{
                console.log(err);
                res.send(err)
            })
        } else {
            res.redirect(`/`)
        } 
    }

    static cancelBook(req, res){
        if(req.session.email && req.session.role == "tenant"){
            Tenant.update({
                AdId : null,
                PendingBook : false
            },{
                where : {
                    id : req.params.tenant_id
                }
            })
            .then(result=>{
                res.redirect(`/tenant`)
            })
            .catch(err=>{
                console.log(err);
                res.send(err)
            })
        } else {
            res.redirect(`/`)
        } 
    }

    static logoutTenant(req, res){
        req.session.destroy()
        res.redirect(`/`)
    }
}

module.exports = Controller