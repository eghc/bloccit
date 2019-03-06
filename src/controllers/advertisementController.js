const advertisementQueries = require("../db/queries.advertisements.js");

module.exports = {
  index(req, res, next){
    advertisementQueries.getAllAds((err, ads) => {
      if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("advertisements/index", {ads});
        }
      });
  },
  new(req, res, next){
    res.render("advertisements/new");
  },
  create(req, res, next){
    let newAd = {
      title: req.body.title,
      description: req.body.description
    };
    advertisementQueries.addAd(newAd, (err, ad) => {
      if(err){
        res.redirect(500, "/advertisements/new");
      } else {
        res.redirect(303, `/advertisements/${ad.id}`);
      }
    });
  },
  show(req, res, next){

//#1
     advertisementQueries.getAd(req.params.id, (err, ad) => {

//#2
       if(err || ad == null){
         res.redirect(404, "/");
       } else {
         res.render("advertisements/show", {ad});
       }
     });
   },
  destroy(req, res, next){
    advertisementQueries.deleteAd(req.params.id, (err, ad) => {
      if(err){
        res.redirect(500, `/advertisements/${ad.id}`)
      } else {
        res.redirect(303, "/advertisements")
      }
    });
  },
  edit(req, res, next){
    advertisementQueries.getAd(req.params.id, (err, ad) => {
      if(err || ad == null){
        res.redirect(404, "/");
      } else {
        res.render("advertisements/edit", {ad});
      }
    });
  },
  update(req, res, next){

  //#1
    advertisementQueries.updateAd(req.params.id, req.body, (err, ad) => {

  //#2
      if(err || ad == null){
        res.redirect(404, `/advertisements/${req.params.id}/edit`);
      } else {
        res.redirect(`/advertisements/${ad.id}`);
      }
    });
  }
}
