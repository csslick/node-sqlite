const express = require('express');
const { sequelize, Posts } = require('./database');

const app = express();

// ejs를 view 엔진으로 설정
app.set('view engine', 'ejs');
app.use(express.static("public"));

// post 요청 모듈
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Fake DB
// const posts = [];
sequelize.sync().then(function(res) {
  console.log("데이터 모델 연결됨");
});

// index page
app.get('/', async function(req, res) {
  // 모든 Post 가져오기
  const posts = await Posts.findAll();
  // console.log(JSON.stringify(posts, null, 2))
  res.render('index', { posts });
});

app.post('/create', async function(req, res){
  let post = req.body.post; 
  console.log(post);
  // posts.push(post);
  const newPost = await Posts.create({ post: post });
  console.log("auto-generated ID:", newPost.id);
  res.redirect('/');
})

app.get('/update/:id', async function(req, res) {
  const posts = await Posts.findAll(); // 글 가져옴
  let id = req.params.id;
  // :id(params)와 일치하는 post를 가져옴
  const getPost = posts.find(post => post.id == id)
  console.log(id, getPost.post);
  res.render('update.ejs', { 
    data: { id: id , post: getPost.post }
  });
})

app.listen(8080);
console.log('Server is listening on port 8080');