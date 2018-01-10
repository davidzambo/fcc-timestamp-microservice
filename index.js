const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  
  res.writeHead(200, {
    'Content-Type' : 'text/html; charset=utf-8'
  });
	res.send('index.html');

});

app.get('/:time', (req, res) => {
  
  let input = req.params.time,
      time = new Date(input),
      options = {
        month: 'long',
        day: 'numeric', 
        year: 'numeric',
      }
      timeStamp = {};

 
  //  Input can be:
  //  1) convert to number -> unix timestamp -> OK for us
  //      example: 212312413
  //
  if (input.match(/^\d+$/)) {
    // SUCCESS
    timeStamp = {
      unixTimeStamp: Number(input),
      natural: new Date(Number(input)).toLocaleDateString('en-US', options),
      // test: 'number',
      // condition: new Date(Number(input)).getTime()
    };
  
  } else {
    // 2) string, which is a valid date -> OK for us
    //     example:  '2012 dec 10',
    //               '2012-12-10',
    
    if ( !isNaN(new Date(input).getTime()) ) {
      // SUCCESS
      timeStamp = {
        unixTimeStamp: new Date(input).getTime(),
        natural: new Date(input).toLocaleDateString('en-US', options),
        // test: 'date',
        // condition: new Date(input).getTime(),
        // year: new Date(input).getFullYear()
      };
  
    } else {
      // FAIL
      timeStamp = {
        unixTimeStamp: null,
        natural: null,
        // test: 'error',
        // condition: new Date(input).getTime()      
      };
  }
  
    
  }

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify(timeStamp));

});

app.listen(80);

