const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const {User} = require('./models/User');
const config = require('./config/key');



app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://hsKim:hsKim@kim.dalle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('Mongo DB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요')
})

app.post('/register', (req, res) => {
  const user = new User(req.body) //bodyParser를 통해 client의 아이디, 비번을 req.body로 받음

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({   //200이 성공했다는 의미
      success: true
    })
  })
})

//회원 가입 할때 필요한 정보들을 client에서 가져오면
//그것들을 데이터 베이스에 넣어준다.

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

