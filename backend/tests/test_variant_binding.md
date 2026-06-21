# 型号绑定测试说明

验证 `selected_variant_id` 存在于当前系列，且报告、材料、图片、创意、批次、镜头和任务包均绑定同一目标型号。验证批次、镜头和任务包的 `product_series_id + variant_id + batch_id` 完全一致，跨型号数据必须拒绝。
