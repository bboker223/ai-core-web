# BAMO 工业智能中枢平台部署文档 (v1.0)

## 一、 系统架构图 (逻辑层)

* **入口层 (Port 80)**：Nginx 网关（负责 Vue 静态资源、API 路由分发、MaxKB 隐身代理）。
* **业务层 (Port 9779)**：Java SpringBoot (ai-core) 负责权限校验、MES 登录代理、应用菜单动态生成。
* **数据层**：Redis (缓存权限 Token)、Neo4j (知识图谱/未来扩展)、PostgreSQL (MaxKB 原生数据)。
* **AI 引擎层 (Port 8080)**：MaxKB Pro (被隐藏在内网，仅通过网关暴露 `/chat` 接口)。

---

## 二、 目录结构规范

统一存放在 `/data/aicore-service` 下：

```bash
/data/aicore-service/
├── docker-compose.yml      # 编排中心
├── update.sh               # 自动化更新脚本
├── app/                    # 后端目录
│   ├── ai-core.jar         # Java 业务核心
│   └── logs/               # 应用日志
├── html/                   # 前端挂载根目录
│   └── dist/               # 解压后的前端产物 (含 index.html, static 等)
└── nginx/                  # 网关配置
    ├── conf.d/
    │   └── default.conf    # 路由转发核心配置
    └── logs/               # 网关访问与错误日志

```

---

## 三、 核心配置文件备份

### 1. Nginx 路由转发 (`nginx/conf.d/default.conf`)

**关键点**：`root` 必须指向容器内的 `dist` 目录，且 `/api/portal/` 必须在 `/api/` 之前定义。

```nginx
server {
    listen 80;
    server_name 192.168.8.141;

    location / {
        root   /usr/share/nginx/html/dist; # 对应宿主机 ./html/dist
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;  # 支持 Vue History 模式
    }

    # BAMO 业务接口
    location /api/portal/ {
        proxy_pass http://192.168.8.141:9779/api/portal/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # MaxKB 隐身代理 (对话窗 & 接口)
    location /chat/ { proxy_pass http://192.168.8.141:8080/chat/; }
    location /api/ { proxy_pass http://192.168.8.141:8080/api/; }
}

```

### 2. 容器编排 (`docker-compose.yml`)

**关键点**：`app-core` 必须同时加入双网络，Nginx 映射 `html` 级目录。

```yaml
services:
  app-core:
    image: ai-core:v1
    networks:
      - backend-net
      - maxkb_maxkb-network # 联通 MaxKB 容器云
  
  bamo-nginx:
    image: nginx:1.12.1
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html:ro
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./nginx/logs:/var/log/nginx
    networks:
      - backend-net

```

---

## 四、 发版与更新流程

### 1. 前端发布

1. 本地 `npm run build`。
2. **安全清理**：使用 `mv /data/aicore-service/html/dist /tmp/dist_bak_$(date +%Y%m%d)` 备份旧版本。
3. **上传**：将新的 `dist` 文件夹上传至 `/data/aicore-service/html/`。
4. **校验**：确保路径为 `/data/aicore-service/html/dist/index.html`。

### 2. 后端发布

1. 上传新的 `ai-core.jar` 到 `./app/`。
2. 执行 `./update.sh` 重启应用容器。

---

## 五、 运维
* **端口封锁 (防火墙策略)**：
* **开放**：`80` (全公司)。
* **限制**：`8080` (仅限 IT 管理员 IP)，防止员工越过外壳直接操作 MaxKB。


