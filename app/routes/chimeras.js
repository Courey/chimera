/* jshint unused: false*/
'use strict';

var Mongo = require('mongodb');



exports.index = (req, res)=>{
  var chimeras = global.nss.db.collection('chimeras');

  chimeras.find().toArray((err, records)=>{
    res.render('chimeras/index', {chimeras: records, title: 'Chimera Index'});
  });
};

exports.show = (req, res)=>{
  var chimeras = global.nss.db.collection('chimeras');
  var _id = Mongo.ObjectID(req.params.id);

  chimeras.findOne({_id:_id}, (err, record)=>{
    res.render('chimeras/show', {chimera: record, title: 'Chimeras'});
  });
};

exports.new = (req, res)=>{
  res.render('chimeras/new', {title: 'New Chimera'});
};

exports.filter = (req, res)=>{
  var chimeras = global.nss.db.collection('chimeras');

  var part = req.query.part;
  var pony = req.query.pony;
  var image = pony+part+'.png';
  var obj = {};
  obj[part] = pony;
  console.log(image);

  chimeras.find(obj).toArray((err, records)=>{
    res.render('chimeras/filtered', {chimeras: records, title: 'Chimera Index'});
  });
};

exports.destroy = (req, res)=>{
  var chimeras = global.nss.db.collection('chimeras');
  var _id = Mongo.ObjectID(req.params.id);
  chimeras.findAndRemove({_id: _id}, (err, record)=>{
    res.redirect('/chimeras');
  });
};

exports.create = (req, res)=>{
  var head;
  var body;
  var tail;

  switch(req.body.head){
  case 'twilight':
    head = 'twilight';
    break;
  case 'rainbow':
    head = 'rainbow';
    break;
  case 'derpy':
    head = 'derpy';
    break;
  case 'applejack':
    head = 'applejack';
  }

  switch(req.body.body){
  case 'twilight':
    body = 'twilight';
    break;
  case 'rainbow':
    body = 'rainbow';
    break;
  case 'derpy':
    body = 'derpy';
    break;
  case 'applejack':
    body = 'applejack';
  }

  switch(req.body.tail){
  case 'twilight':
    tail = 'twilight';
    break;
  case 'rainbow':
    tail = 'rainbow';
    break;
  case 'derpy':
    tail = 'derpy';
    break;
  case 'applejack':
    tail = 'applejack';
  }
  req.body.head = head;
  req.body.body = body;
  req.body.tail = tail;
  var chimeras = global.nss.db.collection('chimeras');
  chimeras.save(req.body, (err, obj)=>{
    res.redirect(`/chimeras/${obj._id}`);
  });
};
