# 类目确认页

- 页面目标：展示平台候选类目并取得人工确认。
- 输入字段：产品名、候选一/二级类目、置信度、推荐理由、风险提示、人工修改值。
- 输出数据：`category_detection`，含 `confirmed_by_user`。
- 通过条件：`platform_category` 已确认，必要时子类目已确认，用户点击确认。
- 状态依赖：基础信息完成后进入；`category_detected` 后人工推进到 `category_confirmed`。
