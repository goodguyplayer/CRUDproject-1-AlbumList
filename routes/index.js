var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:page?', async function(req, res) {
  const page = parseInt(req.params.page || "1");
  const docs = await global.db.findAll(page);
  const count = await global.db.countAll();
  const qtdPaginas = Math.ceil(count / global.db.PAGE_SIZE);
  res.render('index', { title: 'Albums of bands', docs, count, qtdPaginas, page });
})

router.get('/new', function(req, res, next) {
  res.render('new', { title: 'New album', doc: {"name":"","artist":""}, action: '/new' });
});

router.post('/new', function(req, res) {
  var name = req.body.name;
  var artist = req.body.artist;
  global.db.insertOne({name, artist}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/');
      })
});

router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('new', { title: 'Edit album', doc: docs[0], action: '/edit/' + docs[0]._id });
    });
});

router.post('/edit/:id', function(req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var artist = req.body.artist;
  global.db.update(id, {name, artist}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/');
    });
});

router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});

module.exports = router;
