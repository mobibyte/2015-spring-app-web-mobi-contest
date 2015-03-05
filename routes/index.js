var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	if(req.cookies.submitted !== undefined) {
		res.redirect('/submit');
	}

	res.render('index', { 
	  	title: 'Mobi Sticker Challenge'
	  });
	
});

router.post('/submit', function(req, res, next) {
  //res.send(req.body);
  var firstName = req.body.first_name.replace(/(<([^>]+)>)/ig,"");
  var lastName = req.body.last_name.replace(/(<([^>]+)>)/ig,"");
  var fact = req.body.fact.replace(/(<([^>]+)>)/ig,"");

  //Expires in a day
  res.cookie('submitted', firstName, { expires: new Date(Date.now() + 86400) });

  res.render('submit', { 
  	name: req.cookies.submitted
  });
});

module.exports = router;
