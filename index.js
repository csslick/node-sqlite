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
  // 클라이언트 요청 글 번호
  let id = req.params.id;
  // 요청글(id) 서버에서 가져옴
  const getPost = await Posts.findOne({ where: { id: id } })
  console.log(getPost.post);
  res.render('update.ejs', { 
    data: { id: id , post: getPost.post }
  })
})

app.post('/update/:id', async function(req, res) {
  let post = req.body.post;
  let id = req.params.id;
  // id에 해당하는 글 수정
  await Posts.update({ post: post }, {
    where: {
      id: id
    }
  });
  res.redirect('/');
})

app.listen(8080);
console.log('Server is listening on port 8080');