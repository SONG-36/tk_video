# video_batch_planner

- 输入：三类 ID、批次目标、推荐分型、创意、材料图片能力和逐视频配置。
- 输出：绑定唯一型号的 3—5 条 `video_batch_plan`。
- 依赖规则：`rules/video_batch_rules.json`。
- 禁止行为：不得默认五条全 A，不得生成相同脚本变体，不得让不满足条件的视频进入 A 级。
