var express = require('express');
var router = express.Router();
// var data = require('../public/javascripts/data');

// console.log(data)
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    posts: [{
        post: 'blog1',
        title: 'lorem ipsum dolor ist',
        details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et dolore blanditiis nobis explicabo minus, ',
        author: 'john doe',
      },
      {
        post: 'blog2',
        title: 'lorem ipsum dolor ist',
        details: 'hic quo animi! Alias sapiente facere cumque dignissimos inventore nisi iure.',
        author: 'john marry',
      },
      {
        post: 'blog3',
        title: 'lorem ipsum dolor ist',
        details: 'consequatur doloremque fugiat cumque, odit molestiae perspiciatis enim commodi libero nam iusto dicta ex officia ',
        author: 'john disk',
      },
      {
        post: 'blog4',
        title: 'lorem ipsum dolor ist',
        details: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et dolore blanditiis nobis explicabo minus,  ',
        author: 'john mark',
      }
    ]
  });
});

router.get('/blog', (req, res, next) => {
  res.render('index', {
      posts: 'welcome to creating a blog'
    }

  )
})

module.exports = router;
