# 皓然站 · AI 导航

> 探索与发现最新、热门的智能体与 AI 工具，助力学习、工作与创意。

[在线访问](https://ernestqhr.github.io/Vue-demo/) | [参考站点](https://gongke.net/)

---

## ✨ 特性

- 🌓 **深色/浅色主题切换**：支持一键切换暗黑/白天模式，偏好本地持久化
- 📱 **全端响应式布局**：完美适配 PC、平板、手机，桌面左侧栏 + 移动抽屉导航
- 🔌 **WordPress CMS 集成**：支持从 WordPress REST API 获取内容，降级到静态 JSON
- 🔑 **JWT 登录认证**：管理员可通过 JWT Token 登录，安全可靠
- 🚀 **快速搜索与分类**：顶部实时搜索，支持跨分类过滤与排序
- 📄 **详情页与外链跳转**：每个工具独立详情页，支持富文本内容与外链访问
- ⚡ **现代技术栈**：Vue 3 + Vite + TypeScript + Vue Router + Tailwind CSS + Axios

---

## 📦 技术栈

| 模块 | 技术 |
|------|------|
| 前端框架 | Vue 3 (Composition API) |
| 构建工具 | Vite 7 |
| 类型系统 | TypeScript 5 |
| 路由 | Vue Router 4 |
| 样式 | Tailwind CSS 3 (深色/浅色主题) |
| HTTP 客户端 | Axios |
| 内容管理 | WordPress REST API (可选) |
| 认证 | JWT Token |
| 部署 | GitHub Pages + GitHub Actions |

---

## 🚀 快速开始

### 环境要求
- Node.js ≥ 20.19.0（推荐 v22 LTS）
- npm ≥ 10.0.0

### 安装依赖
```bash
npm install
```

### 开发运行
```bash
npm run dev
```

访问 `http://localhost:5173/`

### 生产构建
```bash
npm run build
```

构建产物在 `dist/` 目录，可部署到任何静态服务器。

### 预览构建
```bash
npm run preview
```

---

## 📁 项目结构

```
/Users/ernestqiu/QKD/web/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署工作流
├── public/
│   └── vite.svg                # 静态资源
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── tailwind.css    # Tailwind 入口
│   ├── components/
│   │   ├── HeaderBar.vue       # 顶部搜索栏与汉堡按钮
│   │   ├── Sidebar.vue         # 侧边导航栏（含图标与激活态）
│   │   ├── FooterBar.vue       # 底部版权与链接
│   │   ├── SectionTitle.vue    # 分区标题组件
│   │   └── ToolCard.vue        # 工具卡片（支持外链）
│   ├── composables/
│   │   ├── useSearch.ts        # 客户端搜索逻辑封装
│   │   ├── useWordPress.ts     # WordPress API 数据获取（降级到静态）
│   │   └── useTheme.ts         # 深色/浅色主题切换逻辑
│   ├── data/
│   │   ├── tools.json          # 工具静态数据（20+条目，降级备份）
│   │   └── categories.json     # 分类静态数据
│   ├── layouts/
│   │   └── SiteLayout.vue      # 主布局（侧栏+抽屉+内容区+主题支持）
│   ├── pages/
│   │   ├── Home.vue            # 首页（Hero + 热门/最新）
│   │   ├── Category.vue        # 分类页（筛选+排序+分页）
│   │   ├── ToolDetail.vue      # 工具详情页（富文本+外链跳转）
│   │   └── Login.vue           # 登录页（JWT 认证）
│   ├── router/
│   │   └── index.ts            # Vue Router 配置
│   ├── services/
│   │   └── api.ts              # Axios + WordPress REST API 封装
│   ├── App.vue                 # 根组件
│   └── main.ts                 # 入口文件
├── index.html
├── package.json
├── tailwind.config.js          # Tailwind 配置（ESM）
├── postcss.config.js           # PostCSS 配置
├── vite.config.ts              # Vite 配置（dev: '/', build: '/Vue-demo/'）
└── tsconfig.json
```

---

## 🎯 功能路线图

- [x] Vue 3 + Vite + TypeScript 项目搭建
- [x] Tailwind CSS 3 深色/浅色双主题
- [x] 左侧侧栏 + 移动端抽屉导航（响应式）
- [x] 顶部搜索 → 分类页联动
- [x] 工具卡片外链直达
- [x] 静态 JSON 数据（20+ AI 工具）
- [x] GitHub Pages 自动部署
- [x] **WordPress REST API 对接**（含降级机制）
- [x] **深色/浅色主题切换**（localStorage 持久化）
- [x] **工具详情页**（富文本、外链、面包屑导航）
- [x] **JWT 登录认证**（管理员入口）
- [x] **PC/平板/手机全端响应式**
- [ ] 用户提交工具表单（前端）
- [ ] SEO/Sitemap 优化
- [ ] 收藏与点赞功能

---

## 🔌 WordPress 集成（可选）

本项目支持从 WordPress REST API 获取动态内容，也可以纯静态运行。

### 快速启用 WordPress

1. **配置环境变量**：复制 `env.example.txt` 为 `.env`，填入你的 WordPress API 地址：
   ```env
   VITE_WP_API_URL=https://your-wordpress.com/wp-json/wp/v2
   VITE_USE_WORDPRESS=true
   ```

2. **WordPress 后台配置**：参考 [`WORDPRESS_SETUP.md`](./WORDPRESS_SETUP.md) 完成以下步骤：
   - 安装插件：ACF、Custom Post Type UI、JWT Authentication
   - 创建自定义文章类型 `ai-tool`
   - 配置自定义字段（封面、徽章、外链、厂商）
   - 启用 CORS 跨域支持
   - 配置 JWT 密钥

3. **验证 API**：访问 `https://your-wordpress.com/wp-json/wp/v2/ai-tools` 确认返回数据

4. **重启开发服务器**：`npm run dev`，前端将自动从 WordPress 获取数据

**降级机制**：如果 WordPress API 不可用，系统会自动降级到静态 JSON 数据。

详细配置指南：📖 [WORDPRESS_SETUP.md](./WORDPRESS_SETUP.md)

---

## 🔧 部署说明

### GitHub Pages 配置
本项目使用 GitHub Actions 自动部署到 GitHub Pages。

1. **推送代码**到 `main` 分支后，Actions 自动触发构建。
2. **构建产物**（`dist/`）会被上传并部署到 GitHub Pages。
3. **访问地址**：https://ernestqhr.github.io/Vue-demo/

### 配置要求

部署成功需确保：
- **权限配置**：仓库 `Settings > Actions > General > Workflow permissions` 设置为 "Read and write permissions" ✅
- **Pages 启用**：`Settings > Pages > Source` 选择 "GitHub Actions"
- **base 路径**：`vite.config.ts` 中 `base: '/Vue-demo/'` 与仓库名一致

---

## 🤝 贡献指南

欢迎提交 Issue 或 Pull Request！

### 代码规范
- 使用 TypeScript 编写
- 遵循 Vue 3 Composition API 风格
- Tailwind 优先，避免手写 CSS
- 提交前确保 `npm run build` 无报错

### 分支管理
- `main`：主分支，保护分支
- `feature/*`：功能开发分支
- `fix/*`：Bug 修复分支

---

## 📄 许可证

MIT License

---

## 🙏 致谢

- 设计参考：[攻壳智能体](https://gongke.net/)
- 框架文档参考：[若依（RuoYi）](https://doc.ruoyi.vip/ruoyi/)
- 技术栈：Vue.js、Vite、Tailwind CSS

---

**Made with ❤️ by Ernest QHR**
