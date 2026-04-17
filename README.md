# 未来智酷·创见未来 - React项目

这是一个基于React + TypeScript + Vite的现代化Web应用，集成了3D图形、动画和丰富的UI组件。

## 项目启动

### 前提条件
- Node.js (v18+)
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或使用 yarn
yarn install
```

### 启动开发服务器
由于系统PATH配置问题，推荐使用以下命令启动：

```bash（启动）

node node_modules/vite/bin/vite.js
```

或者使用npm/yarn（如果PATH配置正确）：
```bash

npm run dev
# 或
yarn dev
```

开发服务器启动后，在浏览器中访问：http://localhost:5173/

### 构建项目
```bash

npm run build
# 或
yarn build
```

### 预览生产版本
```bash

npm run preview
# 或
yarn preview
```

## 技术栈
- React 19 + TypeScript
- Vite 7.3.0
- Tailwind CSS + shadcn/ui组件库
- Three.js + @react-three/fiber (3D图形)
- GSAP (动画库)
- React Hook Form + Zod (表单验证)

## 项目结构
```
Futurix-AI/
├── src/
│   ├── components/     # 可复用组件
│   ├── sections/       # 页面区块组件
│   ├── lib/           # 工具函数
│   └── hooks/         # 自定义Hooks       
└── package.json       # 依赖配置
```