const topicQueries = require("../db/queries.topics.js");
const http = require("http");

const Authorizer = require("../policies/topic");


module.exports = {
  index(req, res, next){
    topicQueries.getAllTopics((err, topics) => {
      if(err){
          res.redirect(500, "static/index");
        } else {
          //console.log(topics);
          res.render("topics/index", {topics});
        }
      });
  },
   new(req, res, next){
     const authorized = new Authorizer(req.user).new();

     if(authorized) {
       http.get(req.protocol+"://"+req.get('host')+"/flairs/get/all", (resp) => {
         let data = '';

         // A chunk of data has been recieved.
         resp.on('data', (chunk) => {
           data += chunk;
         });
         //console.log(data);

         // The whole response has been received. Print out the result.
         resp.on('end', () => {
             let flairs = JSON.parse(data);
             //console.log(flairs);
             res.render("topics/new", {flairs});
         });
       });
     } else {
       req.flash("notice", "You are not authorized to do that.");
       res.redirect("/topics");
     }

  },
  create(req, res, next){
    const authorized = new Authorizer(req.user).create();
    if(authorized){
      let newTopic = {
        title: req.body.title,
        description: req.body.description,
        flairId: req.body.flairId
      };
      topicQueries.addTopic(newTopic, (err, topic) => {
          if(err){
            res.redirect(500, "/topics/new");
          } else {
            res.redirect(303, `/topics/${topic.id}`);
          }
      });
    }else{
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/topics");
    }
  },
  show(req, res, next){

//#1
     topicQueries.getTopic(req.params.id, (err, topic) => {
       if(err || topic == null){
         res.redirect(404, "/");
       } else {
         if(topic.flairId != null){
           http.get(req.protocol+"://"+req.get('host')+"/flairs/get/"+topic.flairId, (resp) => {
             let data = '';
             // A chunk of data has been recieved.
             resp.on('data', (chunk) => {
               data += chunk;
             });
             //console.log(data);

             resp.on('end', () => {
                 let flair = JSON.parse(data);
                 //console.log(flair);
                 res.render("topics/show", {topic:topic, flair:flair});
             });
           });
         }else{
           res.render("topics/show", {topic:topic, flair:null});
         }
       }
     });
   },
  destroy(req, res, next){
    topicQueries.deleteTopic(req, (err, topic) => {
      if(err){
        res.redirect(500, `/topics/${topic.id}`)
      } else {
        res.redirect(303, "/topics")
      }
    });
  },
  edit(req, res, next){
    topicQueries.getTopic(req.params.id, (err, topic) => {
      if(err || topic == null){
        res.redirect(404, "/");
      } else {
        const authorized = new Authorizer(req.user, topic).edit();
        if(authorized){
          http.get(req.protocol+"://"+req.get('host')+"/flairs/get/all", (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
              data += chunk;
            });
            //console.log(data);

            resp.on('end', () => {
                let flairs = JSON.parse(data);
                //console.log(flair);
                if(topic.flairId != null){

                  res.render("topics/edit", {topic:topic, flairs:flairs, fId: topic.flairId});
                }else{
                  res.render("topics/edit", {topic:topic, flairs:flairs, fId: null});
                }

              });
          });
        }else{
          req.flash("You are not authorized to do that.");
          res.redirect(`/topics/${req.params.id}`);
        }
      }
    });
  },
  update(req, res, next){
  //#1
    topicQueries.updateTopic(req, req.body, (err, topic) => {
      if(err || topic == null){
        res.redirect(404, `/topics/${req.params.id}/edit`);
      } else {
        res.redirect(`/topics/${topic.id}`);
      }
    });
  }
}
