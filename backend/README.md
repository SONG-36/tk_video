# backend 后端职责

后端是 `00_design.md` 定义的规则判断器和文件生成器，负责类目候选、型号管理、分类分型、检查、报告、规划、任务包生成、输出读取及未来校验。

后端不是大模型服务，不定义新规则，不直接调用 Codex、Seedance / 即梦、OCR、VLM 或其他外部模型，也不包含数据库、API、登录和队列。

未来实现必须只读取 `rules/*.json`，使用 `backend/schemas/*.schema.json` 约束数据，并由 validators 保护状态闸门、目标型号和三类 ID。README 仅描述边界，不表示功能已实现。
