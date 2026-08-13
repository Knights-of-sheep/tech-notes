---
title: MySQL 索引优化要点
date: 2026-07-15
tags: [mysql, sql]
description: 索引类型、最左前缀与常见失效场景。
---

# MySQL 索引优化要点

索引是数据库查询性能的关键。

## 要点

- **最左前缀原则**：联合索引 `(a, b, c)` 只有用到 `a` 时才能命中。
- **避免失效**：对索引列做函数运算、隐式类型转换会导致索引失效。
- **覆盖索引**：查询字段都在索引内时，无需回表。

## 查看执行计划

```sql
EXPLAIN SELECT * FROM users WHERE name = 'alice';
```

关注 `type`、`key`、`rows` 三个字段。
