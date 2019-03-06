const Ad = require("./models").Advertisement;

module.exports = {

//#1
  getAllAds(callback){
    return Ad.all()

//#2
    .then((ads) => {
      callback(null, ads);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addAd(newAd, callback){
    return Ad.create({
      title: newAd.title,
      description: newAd.description
    })
    .then((ad) => {
      callback(null, ad);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getAd(id, callback){
    return Ad.findById(id)
    .then((ad) => {
      callback(null, ad);
    })
    .catch((err) => {
      callback(err);
    })
  },
  deleteAd(id, callback){
    return Ad.destroy({
      where: {id}
    })
    .then((ad) => {
      callback(null, ad);
    })
    .catch((err) => {
      callback(err);
    })
  },
  updateAd(id, updatedAd, callback){
    return Ad.findById(id)
    .then((ad) => {
      if(!ad){
        return callback("Topic not found");
      }

  //#1
      ad.update(updatedAd, {
        fields: Object.keys(updatedAd)
      })
      .then(() => {
        callback(null,ad);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
}
