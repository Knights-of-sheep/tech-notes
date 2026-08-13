---
title: Docker 常用命令速查
date: 2026-07-28
tags: [docker, linux]
description: 镜像、容器、网络与数据卷的常用命令备忘。
---

# Docker 常用命令速查

日常开发中高频使用的 Docker 命令。

## 镜像

```bash
docker build -t myapp:latest .
docker images
docker rmi <image_id>
```

## 容器

```bash
docker run -d -p 8080:80 --name web myapp:latest
docker ps -a
docker logs -f web
docker exec -it web sh
```

## 清理

```bash
docker system prune -a
```
