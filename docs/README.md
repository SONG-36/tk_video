# docs 阅读版目录

> 本文档来源于 `00_design.md`，仅用于阅读，不是权威源；如与 `00_design.md` 冲突，以 `00_design.md` 为准。
>
> 来源章节：第 1、3、22 章。

## 负责什么

`docs/` 按主题拆分权威源，便于阅读和定位；`docs/rules/` 保存规则阅读版 Markdown，`docs/examples/` 保存案例阅读版，`docs/99_design_issues.md` 只记录问题。

## 不负责什么

本目录不定义新规则、不覆盖 `00_design.md`、不承载机器可读规则或实现代码。根目录 `rules/` 才保存机器可读 JSON 规则，但同样不是权威源。

## 同步方式

任何变更必须先进入 `00_design.md`，确认后再同步对应阅读版。正式路径为 `docs/rules/`、`docs/examples/` 和 `docs/99_design_issues.md`；不使用旧编号目录。
