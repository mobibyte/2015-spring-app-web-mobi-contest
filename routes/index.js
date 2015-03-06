var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	var userAgent = req.headers['user-agent'];

	if(req.cookies.submitted !== undefined) {
		res.redirect('/submit');
	}

	var isMobile = {
    Android: function() {
        return userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

	res.render('index', { 
	  	title: 'Mobi Sticker Challenge',
	  	onMobileDevice: isMobile.any()
	  });
	
});

router.post('/submit', function(req, res) {
	//Sanitize data
  var firstName = req.body.first_name.replace(/(<([^>]+)>)/ig,"");
  var lastName = req.body.last_name.replace(/(<([^>]+)>)/ig,"");
  var fact = req.body.fact.replace(/(<([^>]+)>)/ig,"");

  //Validate data
  if(firstName != '' && lastName != '' && fact != '') {

  	//Set cookie which expires in 24 hours
	  res.cookie('submitted', firstName, { expires: new Date(Date.now() + 86400) });
	  res.redirect('/submit');
  } else {
  	res.send('All forms are required');
  }
});

router.get('/submit', function(req, res) {
	if(req.cookies.submitted == undefined) {
		res.redirect('/');
	}

	res.render('submit', { 
  	name: req.cookies.submitted
  });
});

module.exports = router;
