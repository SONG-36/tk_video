# 商品分类规则

> 本文档来源于 `00_design.md`，仅用于阅读，不是权威源；如与 `00_design.md` 冲突，以 `00_design.md` 为准。
>
> 来源章节：第 10 章。

分类针对当前 `selected_variant_id` 执行。同系列不同型号若尺寸、结构或拍摄依赖不同，可以得到不同结论。

## 小件标品

- 覆盖：Phones & Electronics、Beauty & Personal Care、Automotive & Motorcycle、Fashion Accessories、Tools & Hardware、Home Supplies、Household Appliances、Luggage & Bags、Home Improvement、Toys & Hobbies、Pet Supplies、Computers & Office Equipment。
- 评分：拍摄容易度 5、种草容易度 4、消费决策容易度 3。
- 特征：拍摄成本低、场景简单、空间要求小、通常不需外模、体积较小、功能明确、价格相对低。
- 风险：同类多、竞争集中、需要差异化、低价质量质疑、需要视频建立信任。

## 非标品

- 覆盖：Womenswear & Underwear、Jewelry Accessories & Derivatives、Menswear & Underwear、Shoes、Food & Beverages。
- 评分：拍摄容易度 3、种草容易度 4、消费决策容易度 4。
- 特征：款式和设计差异明显，适合真人、场景和故事种草，情绪价值强，消费决策关注风格匹配。
- 风险：拍摄成本和本地化要求较高，可能需要外模，颜色材质细节要求高，主观偏好差异大，需要精细人群定位。

## 大件标品

- 覆盖：Sports & Outdoor、Furniture、Kitchenware、Textiles & Soft Furnishings。
- 评分：拍摄容易度 2、种草容易度 4、消费决策容易度 3。
- 特征：痛点与场景明确，适合展示规格、材质、功能，短视频帮助理解价值。
- 风险：需要大空间或专业设备，单价和决策成本较高，用户关注性价比、售后、安装、运输和维修。
