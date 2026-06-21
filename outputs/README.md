# outputs 目录职责

本目录是未来 Codex 内容资产的输出根。任务 07 只定义读取目标结构和边界，不读取真实业务内容，也不生成任何真实输出。

未来读取根严格为：

```text
outputs/{product_series_id}/{batch_id}/
```

读取必须限制在指定批次根内，并以已确认 `video_batch_plan` 的 `video_id` 白名单为准。未规划目录和历史残留目录不得读取或展示；文件缺失只标记缺失，不自动补齐、修复、重命名或复制。

本任务不创建商品目录、批次目录、视频目录、镜头资产、图片资产、任务包产物、output index、missing files 或 viewer payload，也不写入 `outputs/`。

本目录不保存规则、输入数据或任务指令，不是业务定义来源；目录结构和内容始终服从根目录 `00_design.md`。
