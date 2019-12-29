const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director');

/*router.get('/', (req, res, next) => {
  res.json({ title: 'Express' });
});*/

router.post('/', (req, res, next) => {
  const director = new Director(req.body);
  const promise = director.save();

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

router.get('/', (req, res, next) => {
  //dönen dataın atanacağı => as
  const promise = Director.aggregate([
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name,',
        surname: '$_id.surname',
        movies: '$movies'
      }
    }
  ]); //join aggregate

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/director_id', (req, res, next) => {
  // $match ile kısıtlama yapıyoruz
  const promise = Director.aggregate([
    {
      $match: {
        '_id': mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name,',
        surname: '$_id.surname',
        movies: '$movies'
      }
    }
  ]); //join aggregate

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});


module.exports = router;
