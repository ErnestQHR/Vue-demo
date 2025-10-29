# WordPress 配置指南

本项目支持从 WordPress REST API 获取内容。本文档说明如何配置 WordPress 以提供数据。

---

## 📋 前提条件

- WordPress 5.0+ （支持 REST API）
- 管理员权限
- 基础 PHP 和 WordPress 知识

---

## 🔧 第一步：安装必要插件

### 1. Advanced Custom Fields (ACF) Pro
用于添加自定义字段（封面图、徽章、外链等）。

**安装方式：**
- 在 WordPress 后台 → 插件 → 安装插件 → 搜索 "Advanced Custom Fields"
- 或从 [ACF 官网](https://www.advancedcustomfields.com/) 下载

### 2. Custom Post Type UI (CPT UI)
用于创建自定义文章类型 `ai-tool` 和分类法 `ai-tool-category`。

**安装方式：**
- 后台 → 插件 → 安装插件 → 搜索 "Custom Post Type UI"

### 3. JWT Authentication for WP-API
用于登录和 token 认证。

**安装方式：**
- 从 [GitHub](https://github.com/Tmeister/wp-api-jwt-auth) 下载
- 或使用 Composer: `composer require tmeister/wp-api-jwt-auth`

---

## 🗂️ 第二步：创建自定义文章类型

使用 **Custom Post Type UI** 插件创建 `ai-tool`：

### 创建 Post Type

1. 后台 → CPT UI → Add/Edit Post Types
2. 填写以下信息：
   - **Slug**: `ai-tool`
   - **Plural Label**: AI Tools
   - **Singular Label**: AI Tool
   - **Has Archive**: Yes
   - **Show in REST**: **Yes** ✅（重要！）
   - **REST Base**: `ai-tools`

### 创建 Taxonomy（分类法）

1. 后台 → CPT UI → Add/Edit Taxonomies
2. 填写：
   - **Slug**: `ai-tool-category`
   - **Plural Label**: AI Tool Categories
   - **Singular Label**: AI Tool Category
   - **Attach to Post Type**: `ai-tool` ✅
   - **Show in REST**: **Yes** ✅
   - **REST Base**: `ai-tool-categories`

---

## 🎨 第三步：配置 ACF 自定义字段

在 **ACF** 中为 `ai-tool` 添加以下字段组（Field Group）：

### 字段组名称：AI Tool Meta

**字段列表：**

| 字段标签        | 字段名称        | 字段类型    | 说明                          |
|-----------------|-----------------|-------------|-------------------------------|
| Cover Image     | `cover_image`   | Image       | 封面图（返回 URL）            |
| Badges          | `badges`        | Repeater    | 徽章列表（如"编辑推荐"）      |
| External Link   | `external_link` | URL         | 官网链接                      |
| Vendor          | `vendor`        | Text        | 厂商名称（如"字节跳动"）      |

**字段组位置规则：**
- Post Type is equal to `ai-tool`

**REST API 支持：**
- 在字段组设置中，勾选 "Show in REST API" ✅

---

## 🔐 第四步：配置 JWT 认证

### 1. 生成密钥

在 `wp-config.php` 中添加：

```php
define('JWT_AUTH_SECRET_KEY', 'your-top-secret-key-here');
define('JWT_AUTH_CORS_ENABLE', true);
```

### 2. 配置 .htaccess（Apache）

在 WordPress 根目录 `.htaccess` 中添加：

```apache
RewriteEngine On
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
```

### 3. 测试 JWT Token

**请求登录 Token：**

```bash
curl -X POST https://your-site.com/wp-json/jwt-auth/v1/token \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your-password"}'
```

**响应示例：**

```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user_email": "admin@example.com",
  "user_display_name": "Admin"
}
```

---

## 🌐 第五步：启用 CORS（跨域支持）

### 方法一：插件方式

安装 **WP CORS** 插件并配置允许的域名。

### 方法二：代码方式

在 `functions.php` 中添加：

```php
function add_cors_http_header(){
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");
}
add_action('rest_api_init', 'add_cors_http_header');
```

**注意：** 生产环境应限制 `Access-Control-Allow-Origin` 为具体域名！

---

## 📄 第六步：添加测试数据

### 创建一个 AI Tool 示例

1. 后台 → AI Tools → Add New
2. 填写：
   - **Title**: 扣子空间
   - **Content**: 字节跳动推出的 AI 智能体开发与协作平台...
   - **Cover Image**: 上传一张封面图
   - **Badges**: 添加 "编辑推荐"、"完全免费"
   - **External Link**: https://www.coze.cn/
   - **Vendor**: 字节跳动
   - **Categories**: 选择 "AI智能体"

3. 点击 **Publish**

---

## 🔍 第七步：验证 API 端点

### 测试工具列表

```bash
curl https://your-site.com/wp-json/wp/v2/ai-tools
```

### 测试单个工具

```bash
curl https://your-site.com/wp-json/wp/v2/ai-tools/{id}
```

### 测试分类列表

```bash
curl https://your-site.com/wp-json/wp/v2/ai-tool-categories
```

**成功响应示例：**

```json
[
  {
    "id": 1,
    "title": {"rendered": "扣子空间"},
    "content": {"rendered": "<p>字节跳动推出的...</p>"},
    "acf": {
      "cover_image": "https://your-site.com/wp-content/uploads/cover.jpg",
      "badges": ["编辑推荐", "完全免费"],
      "external_link": "https://www.coze.cn/",
      "vendor": "字节跳动"
    },
    "ai-tool-categories": [5]
  }
]
```

---

## 🚀 第八步：前端配置

### 1. 创建 `.env` 文件

在项目根目录创建 `.env`（参考 `env.example.txt`）：

```env
VITE_WP_API_URL=https://your-site.com/wp-json/wp/v2
VITE_USE_WORDPRESS=true
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 验证数据加载

打开浏览器，检查首页是否显示来自 WordPress 的数据。

---

## 🐛 常见问题

### Q1: API 返回 401 Unauthorized

**原因：** JWT 配置不正确或 `.htaccess` 未生效。

**解决：**
- 检查 `JWT_AUTH_SECRET_KEY` 是否设置
- 确认 `.htaccess` 配置（Apache）或 Nginx 配置

### Q2: API 返回 CORS 错误

**原因：** 跨域请求被阻止。

**解决：**
- 按照第五步配置 CORS
- 生产环境限制 `Access-Control-Allow-Origin` 为前端域名

### Q3: ACF 字段不显示在 REST API 中

**原因：** ACF 字段组未启用 REST API。

**解决：**
- ACF 编辑字段组 → REST API → 勾选 "Show in REST API"

### Q4: 自定义文章类型不可见

**原因：** 未启用 "Show in REST"。

**解决：**
- CPT UI → 编辑 Post Type → 勾选 "Show in REST"

---

## 📚 参考资源

- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [ACF Documentation](https://www.advancedcustomfields.com/resources/)
- [JWT Authentication Plugin](https://github.com/Tmeister/wp-api-jwt-auth)
- [Custom Post Type UI](https://wordpress.org/plugins/custom-post-type-ui/)

---

## ✅ 完成清单

- [ ] 安装 ACF, CPT UI, JWT 插件
- [ ] 创建 `ai-tool` 自定义文章类型
- [ ] 创建 `ai-tool-category` 分类法
- [ ] 配置 ACF 自定义字段
- [ ] 设置 JWT 密钥和 .htaccess
- [ ] 启用 CORS
- [ ] 添加至少 3 个测试数据
- [ ] 验证 API 端点正常返回
- [ ] 配置前端 .env 文件
- [ ] 测试前端数据加载

---

**支持：** 如有问题，请提交 [GitHub Issue](https://github.com/ErnestQHR/Vue-demo/issues)

