import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const today = new Date();
  let day = today.getDay();
  let title = 'Working day';
  let adv = 'It is time to work hard';
  const date = today.toDateString();
  if (day === 0 || day === 6) {
    title = "the weekend";
    adv = "it's time to have some fun";
  }
  res.render('practice.ejs', 
    {  message: title,
       advice:adv,
       dy: date
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});