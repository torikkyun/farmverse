# Nest Boilerplate

## 🚀 Cài đặt dự án

```bash
pnpm add -g degit
degit torikkyun/nest-boilerplate my-app
cd my-app
pnpm install
```

## ⚙️ Cấu hình môi trường

1. **Tạo file cấu hình môi trường:**

   ```bash
    cp .env.development .env.development.local
   ```

2. **Chỉnh sửa file `.env.development.local` theo nhu cầu:**

   ```bash
    PORT=3000
    NODE_ENV=development
    SWAGGER_TITLE='Nest Boilerplate'
    SWAGGER_PATH=swagger

    MYSQL_HOST=localhost
    MYSQL_PORT=3307
    MYSQL_ROOT_USERNAME=torikkyun
    MYSQL_ROOT_PASSWORD=thisisapassword
    MYSQL_DATABASE=data_nest_boilerplate
    MYSQL_URL=mysql://${MYSQL_ROOT_USERNAME}:${MYSQL_ROOT_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}

    POSTGRES_HOST=localhost
    POSTGRES_PORT=5433
    POSTGRES_USER=torikkyun
    POSTGRES_PASSWORD=thisisapassword
    POSTGRES_DB=data_nest_boilerplate
    POSTGRES_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}

    # MongoDB Atlas
    MONGODB_URL=mongodb+srv://username:password@host:port/database?authSource=admin
   ```

## 🐳 Chạy database bằng Docker

**Lưu ý:**

### PostgreSQL

```bash
docker-compose -f docker-compose.dev.yml --env-file .env.development.local up -d --build postgresql
```

### MySQL

```bash
docker-compose -f docker-compose.dev.yml --env-file .env.development.local up -d --build mysql
```

### MongoDB

> **Chú ý:** Nếu dùng MongoDB Atlas, connection string phải trỏ tới cluster đã bật replica set và thêm `authSource=admin`.
> Tham khảo: [Prisma MongoDB Replica Set](https://www.prisma.io/docs/orm/overview/databases/mongodb#replica-set-configuration)

## 🛠️ Chạy dự án

Chế độ phát triển:

```bash
pnpm start:dev
```
