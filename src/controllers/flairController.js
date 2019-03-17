const flairQueries = require("../db/queries.flair.js");

module.exports = {
  index(req, res, next){
    flairQueries.getAllFlairs((err, flairs) => {
      if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("flairs/index", {flairs});
        }
      });
  },
  new(req, res, next){
    res.render("flairs/new");
  },
  create(req, res, next){
    let newFlair = {
      name: req.body.name,
      color: req.body.color
    };
    console.log(newFlair);
    flairQueries.addFlair(newFlair, (err, flair) => {
      if(err){
        res.redirect(500, "/flairs/new");
      }
      else{
        res.redirect(303, `/flairs/${flair.id}`);
      }
    });
  },
  show(req, res, next){
     flairQueries.getFlair(req.params.id, (err, flair) => {
       //console.log(flair);
       if(err || flair == null){
         res.redirect(404, "/");
       } else {
         res.render("flairs/show", {flair});
       }
     });
   },
  destroy(req, res, next){
    flairQueries.deleteFlair(req.params.id, (err, flair) => {
      if(err){
        res.redirect(500, `/flairs/${flair.id}`);
      } else {
        res.redirect(303, "/flairs");
      }
    });
  },
  edit(req, res, next){
    flairQueries.getFlair(req.params.id, (err, flair) => {
      if(err || flair == null){
        res.redirect(404, "/");
      } else {
        res.render("flairs/edit", {flair});
      }
    });
  },
  update(req, res, next){

  //#1
    flairQueries.updateFlair(req.params.id, req.body, (err, flair) => {

  //#2
      if(err || flair == null){
        res.redirect(404, `/flairs/${req.params.id}/edit`);
      } else {
        res.redirect(`/flairs/${flair.id}`);
      }
    });
  },
  getAll(req, res, next){
    flairQueries.getAllFlairs((err, flairs) => {
      if(err){
        //console.log(err);
          res.send(err);
        } else {
          res.send(flairs);
          res.end();
          //return newFlairs;
        }
      });

  },
  getOne(req, res, next){
    flairQueries.getFlair(req.params.id, (err, flair) => {
      if(err || flair == null){
        res.send(err);
      } else {
        res.send(flair);
        res.end();
      }
    });
  }
}
