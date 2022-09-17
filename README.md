# koa-blog
yeyaoyao.icu


过于频繁操作需要禁止发送请求!


# ormconfig.json

> 原本的数据库账号密码
```json
{
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "123456",
    "database": "yeyaoyao.icu",
    "synchronize": true,
    "entities": ["src/db/*.ts"],
    "cli": {
        "entitiesDir": "src/db"
    }
}
```
