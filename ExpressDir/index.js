const express = require('express'); // Ye express actually ek function hai jisse ham execute krte hai.
const app = express();
const port = 8080;

// console.log(app);

// app.use((req, res) => {
//   // console.log(res);
// })

app.get('/' , (req, res) => {
  res.send('You contacted root path!');
});

app.get('/apple/:color/:rupee', (req, res) => {
  let {color, rupee} = req.params;
  res.send(`You contacted apple path whose color is : ${color} and per apple at : ${rupee} rupee`);
});

app.get('/fruits', (req, res) => {
  let {fruit, color} = req.query;
  res.send(`You contacted fruits path. The fruit is : ${fruit} and its color is : ${color}`);
});

app.get("*", (req, res) => {
  res.send("this page does not exist");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



