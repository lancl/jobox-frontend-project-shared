var express = require('express');
var router = express.Router();

/**
 * GET /api/qa
 * @returns a list of all Q&A sessions {results: [array of sessions]}
 */
router.get('/qa', (req, res, next) => {
  var mockResponse = {
    results: [
      {
        qaId: 0,
        topic: 'How \'bout them apples?',
        user: {
          id: 7,
          name: 'Apple',
          picture: '/assets/apple.png'
        }
      },
      {
        qaId: 1,
        topic: 'Fruit ninja',
        user: {
          id: 11,
          name: 'Avocado',
          picture: '/assets/avocado.png'
        }
      }
    ]
  };

  return res.status(200).send(mockResponse);
});

/**
 * GET /api/qa/:id
 * @returns a single Q&A session
 */
router.get('/qa/:id', (req, res, next) => {
  var id = ''+req.params.id;

  var mockResponse = {};

  if(id === '0') {
    mockResponse = {
      qaId: 0,
      topic: 'How \'bout them apples?',
      user: {
        id: 7,
        name: 'Apple',
        picture: '/assets/apple.png'
      },
      questions: [
        {
          qid: 0,
          text: 'Why are you so delicious?',
          user: {
            id: 8,
            name: 'Banana',
            picture: '/assets/banana.png',
            location: 'Palo Alto, US'
          },
          answer: 'I\'m full of fructose!'
        },
        {
          qid: 1,
          text: 'What is your nutritional value?',
          user: {
            id: 10,
            name: 'Grape',
            picture: '/assets/grape.png',
            location: 'Seattle, US'
          },
          answer: 'Great question! I\'m packed with Vitamin C.'
        }
      ]
    };

    return res.status(200).send(mockResponse);
  } else if(id === '1') {
    mockResponse = {
      qaId: 1,
      topic: 'Fruit ninja',
      user: {
        id: 11,
        name: 'Avocado',
        picture: '/assets/avocado.png'
      },
      questions: [
        {
          qid: 3,
          text: 'What\'s your high score?',
          user: {
            id: 10,
            name: 'Grape',
            picture: '/assets/grape.png',
            location: 'Seattle, US'
          },
          answer: 'Eleventy million!!'
        },
        {
          qid: 4,
          text: 'Are you even a fruit?',
          user: {
            id: 8,
            name: 'Banana',
            picture: '/assets/banana.png',
            location: 'Palo Alto, US'
          },
          answer: 'I plead the fif.'
        }
      ]
    };

    return res.status(200).send(mockResponse);
  } else {
    mockResponse = {
      error: 'Not found'
    };

    return res.status(404).send(mockResponse);
  }
});

module.exports = router;
