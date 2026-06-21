# data 目录职责

本目录保存系统运行输入和中间数据：`products/` 为商品系列，`variants/` 为型号 / SKU，`reports/` 为判断报告，`image_assets/` 为图片标注，`creative_boards/` 为创意方向和画板，`video_batches/` 为视频批次，`shot_plans/` 为镜头计划，`tasks/` 为 Codex 任务包。

本目录不保存最终生成内容，不充当数据库，也不得混用不同型号的数据。

未来数据文件应接受 JSON Schema 校验，并明确携带适用的 `product_series_id`、`variant_id`、`batch_id`。
