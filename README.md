# 皓然站 · AI 导航

> 探索与发现最新、热门的智能体与 AI 工具，助力学习、工作与创意。

[在线访问](https://ernestqhr.github.io/Vue-demo/) | [参考站点](https://gongke.net/)

---

## ✨ 特性

- 🎨 **现代深色主题**：基于 Tailwind CSS 3 的暗黑风格，视觉舒适
- 📱 **PC/H5 响应式**：桌面端左侧栏 + 移动端抽屉导航，适配全设备
- 🚀 **快速搜索与分类**：顶部实时搜索，支持跨分类过滤
- 🔗 **外链直达**：卡片直接跳转到各 AI 工具官网
- ⚡ **静态优先**：基于 JSON 数据，后续可扩展 WordPress REST API
- 🛠️ **技术栈**：Vue 3 + Vite + TypeScript + Vue Router + Tailwind CSS

---

## 📦 技术栈

| 模块 | 技术 |
|------|------|
| 前端框架 | Vue 3 (Composition API) |
| 构建工具 | Vite 7 |
| 类型系统 | TypeScript 5 |
| 路由 | Vue Router 4 |
| 样式 | Tailwind CSS 3 |
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
│   │   └── useSearch.ts        # 客户端搜索逻辑封装
│   ├── data/
│   │   ├── tools.json          # 工具静态数据（20+条目）
│   │   └── categories.json     # 分类静态数据
│   ├── layouts/
│   │   └── SiteLayout.vue      # 主布局（侧栏+抽屉+内容区）
│   ├── pages/
│   │   ├── Home.vue            # 首页（Hero + 热门/最新）
│   │   ├── Category.vue        # 分类页（筛选+排序+分页）
│   │   └── ToolDetail.vue      # 详情占位页
│   ├── router/
│   │   └── index.ts            # Vue Router 配置
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
- [x] Tailwind CSS 3 深色主题集成
- [x] 左侧侧栏 + 移动端抽屉导航
- [x] 顶部搜索 → 分类页联动
- [x] 工具卡片外链直达
- [x] 静态 JSON 数据（20+ AI 工具）
- [x] GitHub Pages 自动部署
- [ ] WordPress REST API 对接（可选扩展）
- [ ] 深色/浅色主题切换
- [ ] 工具详情页完善
- [ ] 用户提交工具表单
- [ ] SEO/Sitemap 优化

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
