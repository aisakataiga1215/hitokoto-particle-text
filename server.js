const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public')); // 让前端文件可访问

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// 代理 hitokoto API，解决 CORS 问题
app.get('/hitokoto', async (req, res) => {
    try {
        const response = await axios.get('https://v1.hitokoto.cn/?encode=json');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: '获取一言失败' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
