# 爆款素材库规则

> 本文档来源于 `00_design.md` 第 18 章，仅用于阅读，不是权威源；如与 `00_design.md` 冲突，以 `00_design.md` 为准。

## 素材库定位

素材库是解释“为什么停留、如何留人、如何互动/转化、能否迁移及迁移风险”的结构化知识库，不是收藏夹或照抄清单。可迁移的是结构、节奏、情绪触发和镜头逻辑；不可迁移的是人物设定、台词、版权元素、具体剧情、原画面、品牌和创作者表达。

## viral_pattern_card

每条入库素材必须形成 `viral_pattern_card`，至少记录 `pattern_id`、`source_platform`、`source_region`、`source_category`、可选来源引用、`pattern_name`、原内容摘要、`attention_trigger`、`first_3_seconds_mechanism`、`retention_mechanism`、`emotional_payload`、时间结构、`transferable_elements`、`non_transferable_elements`、适合/不适合商品类型和 `risk_flags`。

## 创意模式分类

- 冲突反转：误会、身份反差、弱者翻盘、普通方法失败、轻量生活冲突。
- 爽感释放：清理、收纳、整理、前后变化。
- 尴尬救场：出门前、朋友上车、约会前、宠物弄乱等高压生活时刻。
- 身份代入：车主、上班族、宝妈、宠物主人、学生、户外、租房、懒人等明确人群。
- 低成本解决大麻烦：小体积/低成本解决烦人大问题。
- 测试挑战：脏角落、极限、普通工具对比、限时挑战或盲测。

## 素材入库规则

禁止只保存链接、截图、一句话灵感或“很火/可模仿”。入库必须填写来源平台/地区/类目、模式名、内容概括、前 3 秒/中段/结尾机制、情绪触发、可迁移/不可迁移元素、适合/不适合商品和风险。

## 素材来源

可来自 TikTok、TikTok Shop 达人、Douyin、小红书、快手、YouTube Shorts、Instagram Reels、竞品广告、达人口播或短剧热视频。必须记录平台和地区，不得默认国内模式直接适配美国市场；本规则不授权当前实现抓取任何平台。

## 淘汰规则

同类大量使用、观众疲劳、与商品弱相关、成本过高、文化/平台风险高、剧情压过产品或无法形成证明画面时，标记低优先级或淘汰。

## 知识库目录建议

后续可预留 `knowledge_base/viral_patterns/{cn_douyin,us_tiktok,xiaohongshu,youtube_shorts}/`、`adapted_patterns/`、`rejected_patterns/` 和 README。当前同步不创建真实知识库、爬虫或自动分析能力。

## 禁止事项

不得直接复制爆款、搬运短剧台词、使用未授权画面/人物/音乐/品牌/剧情细节、制造歧视羞辱性暗示或冒犯、硬套不适合商品的模式、让剧情压过产品，或把素材库当成免审来源。

## 通过条件

模式卡字段完整；注意力与留人机制已拆解；可迁移/不可迁移元素明确；来源和风险可追踪；只有继续通过跨文化适配、产品适配并生成 `product_adapted_pattern` 后，才可进入正式视频规划。
