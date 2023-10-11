// 使用依赖 + 创建应用 + jwt密钥
const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();
const jwtKey = 'sdfisndifoidsjdflsdflnsdfnsodnf' // 可以使用库crypto模块 来生成
// 解析JSON数据
app.use(express.json()) // app.use 是一个在使用 Node.js 的 Express 框架时常见的中间件配置。它的作用是告诉 Express 应用程序在处理传入的 HTTP 请求时使用 JSON 格式来解析请求体数据。
// 数据库用户
const database = { username: '帕岛男模', password: '投币点赞'}

// 登录生成JWT
app.post("/login", (req, res) => {
  const { username, password } = req.body
  if (username === database.username && password === database.password) {
    jwt.sign(
      { username }, // 负载 payload
      jwtKey, // 密钥
      { expiresIn: '30s'}, // 有效期
      (err, token) => {
          res.json({ username, message: '登录成功', token})
      }
    )

  }
})

// 登录后验证Token
app.get('/afterlogin', (req, res) => {
  const headers = req.headers
  console.log(headers);
  const token = headers['authorization'].split(' ')[1]
  console.log(token);

  jwt.verify(token, jwtKey, (err, payload) => {
    if (err) res.sendStatus(403)
    res.json({ message: '认证成功', payload})
  })
})

//绑定并侦听端口
app.listen(3000, () => console.log('端口3000已开启'))
