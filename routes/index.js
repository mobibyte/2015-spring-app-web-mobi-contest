var express = require('express');
var router = express.Router();
var parse = require('parse').Parse;
parse.initialize("SNDo9ItaiD4Ae9GFI4LucsTTriYG9WfkUcUxh3Ez", "i04RRWl8ZThEtnjdSuvYrQPYM4O5TL40qMpvrAP6");

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

	if(isMobile.any()) {
		res.send('segmentation fault 11');
	} else {
		res.render('index', { 
	  	title: 'Mobi Sticker Challenge',
	  	onMobileDevice: isMobile.any()
	  });
	}
	
});

router.post('/submit', function(req, res) {
	//Sanitize data
  var firstName = req.body.first_name.replace(/(<([^>]+)>)/ig,"");
  var lastName = req.body.last_name.replace(/(<([^>]+)>)/ig,"");
  var fact = req.body.fact.replace(/(<([^>]+)>)/ig,"");

  //Validate data
  if(firstName != '' && lastName != '' && fact != '') {
  	var TestObject = parse.Object.extend("users");
		var testObject = new TestObject();
		testObject.save(
			{
				first_name: firstName,
				last_name: lastName,
				fact: fact
			}
		).then(function(object) {
		  //Set cookie which expires in 24 hours
		  res.cookie('submitted', firstName, { expires: new Date(Date.now() + 86400) });
		  res.redirect('/submit');
		});
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

router.get('/winner', function(req, res) {
	var User = parse.Object.extend("users");

	var query = new parse.Query(User);
	query.find({
	  success: function(data) {
	  	var keyArray = Object.keys(data);
	  	var rand = Math.floor(Math.random() * keyArray.length-1);

	  	var winner = data[rand];

	  	res.send(winner);
	  }

	});
});

router.get('/admin', function(req, res) {
	res.render('winner');
});

module.exports = router;
