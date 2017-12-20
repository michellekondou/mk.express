var nunjucks = require('nunjucks');
var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MK Express' });
});

// /* GET about page. */
router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About' });
});

var path = 'src/data/projects.json';
var jsondata = JSON.parse(fs.readFileSync(path, 'utf8'));

var getProjects = function (name, callback) {
  // Perform database query that calls callback when it's done
  // This is our fake database
  if (jsondata) {
    for (var project in jsondata) {
      if (jsondata[project].project_slug === name) {
        console.log('got a match!');
        return callback(null, jsondata[project]);
      }
    }
  }

  if (!jsondata) {
    return callback(new Error(
      'Data cannot be retrieved at the moment '
    )
    );
  }

  if (!jsondata[name]) {
    return callback(new Error(
      'No case matching ' + name
    )
    );
  }

};

router.get('/project/:name', function (req, res, next) {
  var name = req.params.name;
  getCases(name, function (error, point) {
    if (error) return next(error);
    return res.render('case', project);
  });
});

module.exports = router;
