# Hitokoto Particle Text 🎨✨

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0-brightgreen)](https://nodejs.org/)

🌟 **Hitokoto Particle Text** 是一个将「一言」句子转换为**动态粒子效果**的交互式网页应用。点击屏幕可在**粒子动画**与**完整文本**之间切换，带来独特的视觉体验。

![Demo Screenshot](https://raw.githubusercontent.com/aisakataiga1215/hitokoto-particle-text/main/demo.gif)

---

## 🌟 核心特性

| **功能**             | **描述**                              |
|---------------------|----------------------------------|
| 🎇 **粒子动画**       | 文字分解为动态粒子，随鼠标流动        |
| 🔄 **API 实时加载**   | 每次刷新获取新的 [Hitokoto.cn](https://hitokoto.cn) 句子 |
| 📲 **响应式设计**     | 适配桌面 & 移动端，体验丝滑           |
| 🌈 **平滑过渡**       | 文字与粒子动画之间的渐变转换         |
| 🕹️ **鼠标交互**   | 悬停或点击屏幕触发炫酷粒子效果       |

---

## 🚀 快速启动

### **环境要求**

- **Node.js** ≥ 14.x
- **npm** ≥ 6.x

### **本地运行**

```bash
# 1. 克隆项目
git clone https://github.com/aisakataiga1215/hitokoto-particle-text.git
cd hitokoto-particle-text

# 2. 安装依赖
npm install

# 3. 启动服务
npm start
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

✅ **解决方案**：

1. 确保 **3000 端口未被占用**。
2. 修改 `server.js` 里的端口号，例如：

   ```js
   const PORT = 4000;
   ```

3. 重新运行 `npm start`。

---

## 📂 项目结构

``` markdown
hitokoto-particle-text/
├── LICENSE            # MIT 许可证文件
├── demo.gif           # 演示动画（建议放在根目录）
├── server.js          # Express 服务端
├── package.json       # 依赖配置
├── README.md          # 项目文档
└── public/            # 静态资源
    ├── index.html     # 主页面
    ├── style.css      # 样式表
    └── script.js      # 粒子动画逻辑
```

---

## 📚 使用说明

1. **首次加载**：显示"加载中..."并初始化粒子。
2. **鼠标交互**：
   - **悬停** → 粒子随光标运动。
   - **点击屏幕** → 在粒子动画与完整文本间切换。
3. **窗口适配**：调整大小时自动重绘画布。

---

## 📡 API 依赖

本项目使用 **[Hitokoto.cn](https://hitokoto.cn/)** 提供的随机一句话 API。

请求示例：

```bash
https://v1.hitokoto.cn/?c=a&encode=json
```

返回示例：

```json
{
  "id": 123456,
  "hitokoto": "人生苦短，及时行乐。",
  "from": "某本书"
}
```

> **注意：** 请遵守 [Hitokoto API 使用规则](https://hitokoto.cn/usage)。如果 API 变更，请在 `server.js` 中修改请求地址。

---

## 🛠️ 开发指南

### **扩展功能建议**

- ✨ **粒子颜色渐变**：提升视觉冲击力。
- ✏️ **自定义文字输入**：用户可输入自定义句子。
- 🌐 **多语言 API**：支持古诗词、名人名言等。

### **贡献流程**

1. **Fork 仓库**
2. **创建特性分支**

   ```bash
   git checkout -b feature/your-feature
   ```

3. **提交更改**

   ```bash
   git commit -m 'feat: add awesome feature'
   ```

4. **推送代码**

   ```bash
   git push origin feature/your-feature
   ```

5. **创建 Pull Request**

---

## ❓ 常见问题 (FAQ)

### ❔ `npm install` 失败？

✅ **解决方案**：请确保你的 Node.js 版本 >= 14，并尝试执行：

```bash
npm install --force
```

### ❔ `npm start` 运行后无法访问？

✅ **解决方案**：

1. 确保 **3000 端口未被占用**。
2. 修改 `server.js` 里的端口号，例如：

   ```js
   const PORT = 4000;
   ```

3. 重新运行 `npm start`。

---

## 🌟 开源协议

本项目采用 **MIT 许可证**，完整协议详见 [LICENSE](LICENSE)。

你可以自由：

- ✍️ **修改代码并二次开发**
- 🚀 **用于商业或个人项目**
- 🏷️ **需保留原始版权声明**

---

💪 **如果你喜欢这个项目，欢迎 Star & Fork！** 🌟
