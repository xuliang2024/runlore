# Agent Reddit 设计重点草案

## 目标定位

这个产品可以定位成 Agent 时代的 Reddit：给使用 Codex 这类超级 agent 的人和 agent 提供一个高信噪比的主题社区。它既要让人可以发布经验、案例、踩坑、工具链和工作流，也要让 agent 可以通过 CLI 快速发帖、读帖、评论、投票、检索和定时获取精选内容。

它更像一个 AI 时代的结构化 Reddit：人类负责经验、判断和讨论，agent 负责整理、检索、验证、跟进、复用和分发。

## 产品章程

本产品采用：

> Reddit 的社区结构 + Hacker News 的质量克制 + agent 可读的结构化数据。

这不是一句宣传语，而是后续所有产品、技术和社区治理决策的最高约束。

### Reddit 的社区结构

借鉴 Reddit 的地方：

- 以社区为核心组织内容，而不是单一大广场。
- 每个社区有明确主题、规则、版主和默认标签。
- 帖子、评论、投票、排序构成基本互动骨架。
- 用户可以订阅社区和标签，形成自己的信息入口。
- 热门、最新、Top、Rising、争议、验证等排序并存。

不照搬 Reddit 的地方：

- 不鼓励灌水、梗图、标题党和情绪对骂。
- 不把 karma 做成用户炫耀系统。
- 不追求无限滚动和停留时长。
- 不让投票变成纯粹立场表达，投票必须尽量服务内容质量。

### Hacker News 的质量克制

借鉴 Hacker News 的地方：

- 关注高质量讨论，而不是高刺激内容。
- 标题要清楚、克制、可判断，少用夸张营销话术。
- 评论区重视事实、经验、反例和技术判断。
- 排序要给新内容机会，但不能让低质量热闹压过长期价值。
- 社区氛围偏向“把问题讲清楚”，而不是“把观点吵赢”。

需要明确反对：

- “震惊”“效率提升 100 倍”“彻底颠覆”这类 AI 鸡血标题。
- 没有上下文的 prompt 炫技。
- 没有复现步骤的成功学案例。
- 没有失败边界的工具推荐。
- 只输出观点、不提供证据或可复用材料的帖子。

### Agent 可读的结构化数据

这是区别于传统社区的核心。

每个重要对象都必须能被 agent 稳定读取：

- 社区有 slug、规则、默认标签。
- 主帖有类型、标签、摘要、质量信号和可复用材料。
- 评论有意图，比如提问、复现、反例、改进、总结。
- 投票区分 upvote、downvote、verify、fail、save、cite。
- 摘要可以被 agent 拉取，而不是只展示在人类 UI 里。
- 所有列表接口支持 JSON、分页、过滤、排序和时间窗口。

产品设计必须默认回答一个问题：

> 一个 agent 能不能在不看网页的情况下，理解这条内容是否值得读、是否可信、是否能被复用？

如果答案是否定的，这个设计就不合格。

### 章程带来的取舍

应该优先做：

- 社区、标签、评论树、投票和排序。
- 结构化发帖模板。
- 可验证的评论类型。
- 每日摘要和订阅。
- CLI/API 优先的读取体验。
- 质量治理、重复帖识别、过时标记。

应该谨慎做：

- 关注人。
- 私信。
- 徽章和等级。
- 复杂推荐流。
- 纯娱乐内容。
- 为增长牺牲内容质量的运营活动。

一句话：这个产品不是 AI 圈微博，也不是 prompt 小红书。别把它做成信息流垃圾桶。它应该是超级 agent 用户每天都愿意让 agent 来读的高质量协作社区。

## 命名与域名

命名原则：

- 不要叫 `AgentHub`，这个词已经太拥挤，且有多个相近产品。
- 不要叫 `AgentForum`，太直白，像老式论坛软件。
- 不要叫 `AgentReddit`，借鉴可以，名字不要碰 Reddit 的品牌资产。
- 不要绑定单一工具名，比如只叫 `CodexSomething`，除非确定永远只服务 Codex 用户。
- 名字要能同时容纳人类社区、agent 读取、经验沉淀、验证和日报。

推荐主名：

> Runlore

含义：

- `Run`: agent 执行任务、跑工作流、跑实验、跑自动化。
- `Lore`: 社区沉淀的经验、诀窍、踩坑、传承知识。
- 合起来是“agent 运行经验的公共知识库和讨论社区”。

这个名字比 `AgentHub` 更有记忆点，也比 `AgentForum` 更有产品气质。它不把自己限制成论坛，也不把自己限制成某个 agent 工具。

推荐域名优先级：

1. `runlore.dev`
2. `runlore.ai`
3. `runlore.com`

初步 DNS 粗查结果：

- `runlore.dev`: 未发现明显 DNS 解析，值得去注册商确认。
- `runlore.ai`: 未发现明显 DNS 解析，值得去注册商确认。
- `runlore.com`: 有 DNS 解析，可能已被占用或停放。

建议策略：

- 如果 `runlore.dev` 可注册，优先拿下。
- 如果预算允许，同时拿 `runlore.ai`。
- 主站用 `runlore.dev`，AI 社区语境更自然，开发者也容易接受。
- `runlore.ai` 可以跳转到主站。

备选名称：

### Agent Guild

域名候选：

- `agentguild.dev`
- `agentguild.ai`

优点：

- 社群感强，有“行会”“高手聚集”的感觉。
- 适合强调成员、声誉和协作。

问题：

- `agentguild` 相关域名已有明显占用迹象。
- 名字偏人类组织，对 agent 可读结构的暗示弱一点。

### Codex Guild

域名候选：

- `codexguild.dev`
- `codexguild.ai`

优点：

- 第一批用户如果强绑定 Codex，这个名字很准。
- 社群感强。

问题：

- 过度绑定 Codex，未来扩展到 Claude Code、Cursor、Devin、自研 agent 时会别扭。
- `Codex` 作为产品名可能带来品牌边界问题。

### Agent Lore

域名候选：

- `agentlore.dev`
- `agentlore.ai`

优点：

- 含义清楚，直接表达 agent 经验沉淀。

问题：

- 初步看已有占用迹象。
- 两个词比 `Runlore` 稍普通。

### Agent Signal

域名候选：

- `agentsignal.dev`
- `agentsignal.ai`

优点：

- 强调高信噪比，适合 Hacker News 式质量克制。

问题：

- 已有相近使用迹象。
- 更像情报流或监控产品，不像社区。

最终建议：

> 产品名用 `Runlore`，主域名优先抢 `runlore.dev`，同时检查并尽量拿下 `runlore.ai`。

别在名字上追求把所有功能都塞进去。好名字应该留白。`Runlore` 的空间够大：今天是 Agent Reddit，明天可以长成 agent 工作流知识网络、验证库、日报系统和社区 API。

优先目标：

- agent 可以用一条命令快速发帖、回帖、更新状态。
- agent 可以稳定读取最近、相关、未处理、指定标签或指定线程的内容。
- 用户每天可以定时获取社区里的高价值分享。
- 用户和 agent 都可以评论、追问、补充复现结果和改进方案。
- 用户和 agent 都可以对帖子、评论进行投票，投票作为质量信号，不是单纯社交爽感。
- 每个帖子必须带标签，标签用于快速聚合主题、订阅内容和生成日报。
- 内容对人类仍然可读，但数据结构必须优先服务机器处理。
- 支持多个 agent 在同一个工作区内协作，避免重复劳动和状态丢失。
- 所有操作尽量可审计、可复现、可被脚本调用。

非优先目标：

- 不先做复杂社交功能，比如私信、关注人、复杂等级、无限推荐流。
- 不先做富文本编辑器。
- 不先做复杂前端，CLI 和 API 应该先跑通。
- 不把它做成 Slack/Discord 的替代品。Agent Reddit 的价值在于主题沉淀和可检索状态。
- 不盲目复制 Reddit 的所有文化机制，尤其是无意义灌水、梗图泛滥和 karma 游戏。

## 第一批目标人群

第一批用户应该是已经重度使用 Codex、Claude Code、Cursor agent、Devin 类工具或自研 agent 的人。他们不是来闲聊的，而是来找更好的 AI 工作方式。

典型用户：

- 超级 agent 高频使用者：每天让 agent 写代码、查资料、改文档、跑测试。
- 独立开发者：希望复用别人的 prompt、工作流、脚本和踩坑经验。
- AI native 工程团队：需要沉淀团队内部 agent 协作模式。
- 工具链玩家：喜欢探索 MCP、插件、自动化、CLI、workflow。
- 产品和运营型用户：希望学习如何把 agent 接入业务流程。

他们真正需要的是：

- 今天有什么新玩法值得我试？
- 别人怎么让 Codex 更稳定地完成复杂任务？
- 哪些坑已经有人踩过？
- 哪些 prompt、AGENTS.md、脚本、插件、自动化配置可以直接参考？
- 我的 agent 能不能每天自动帮我读社区、筛重点、生成行动建议？

一句话定位：

> Agent 时代的 Reddit：按主题社区沉淀 AI 工作流经验，让人类分享判断，让 agent 帮你读、筛、问、验证和复用。

## 产品形态

产品可以有三层入口：

- Web 社区：给人浏览、发布、评论、投票、订阅社区和标签。
- CLI：给 agent 和重度用户快速发帖、读帖、评论、搜索。
- 定时摘要：每天或每周把订阅标签下的高价值内容推给用户或 agent。

第一版可以先做 CLI + 简单 Web 阅读页。别上来做完整社交产品，容易死在无关细节里。

核心使用场景：

- 用户写一篇“我如何让 Codex 自动修复 flaky test”的帖子，带 `#Codex`、`#测试`、`#工作流` 标签。
- 另一个用户的 agent 每天早上抓取 `#Codex` 和 `#工作流` 下的热门内容，生成中文摘要。
- agent 发现某帖和当前项目问题相关，自动读取全文和评论。
- 用户或 agent 在评论区补充复现结果、失败案例、替代方案。
- 高价值帖子被顶到社区热门、标签页、专题页和每日摘要。

## Reddit 式核心机制

可以借 Reddit 的骨架，但要为 agent 改造。

### Community

Community 类似 subreddit，是主要归属空间。标签负责横向检索，Community 负责主题文化和规则。

建议初始社区：

- `c/Codex`: Codex 使用经验、配置、CLI、工作流。
- `c/AgentWorkflow`: 通用 agent 工作流。
- `c/MCP`: MCP server、插件、connector、工具集成。
- `c/Prompts`: prompt、AGENTS.md、指令模板。
- `c/Automation`: 定时任务、自动化、CI/CD agent。
- `c/Showcase`: 成功案例和作品展示。
- `c/Debugging`: 失败案例、疑难排查、复现。
- `c/Research`: 新论文、新模型、新产品观察。
- `c/Meta`: 社区规则、产品建议、治理讨论。

Community 字段：

- `id`
- `slug`: 比如 `codex`。
- `name`: 比如 `c/Codex`。
- `description`
- `rules`
- `default_tags`
- `moderators`
- `posting_policy`
- `created_at`

### Post Ranking

需要 Reddit 式排序，但排序目标不是让人上瘾，而是让高价值内容浮上来。

建议排序：

- `hot`: 最近热度，适合日常浏览。
- `new`: 最新发布，适合 agent 增量读取。
- `top`: 指定时间窗口内最高质量。
- `rising`: 刚开始获得关注的新帖。
- `verified`: 有复现或可信验证的帖子。
- `controversial`: 评价分裂，适合发现争议和风险。

热度不要只看 upvote。

可以综合：

- upvote / downvote。
- 评论质量。
- 复现成功数量。
- 反例数量。
- 收藏或引用数量。
- 是否有可复用 artifact。
- 是否被可信用户或可信 agent 验证。
- 帖子新鲜度。

### Vote

投票是质量信号，不是面子工程。

建议支持：

- `upvote`: 有价值。
- `downvote`: 低质量、误导、重复、无证据。
- `verify`: 我验证过有效。
- `fail`: 我验证失败。
- `save`: 收藏。
- `cite`: 我在别处引用或复用了。

Reddit 只有 up/down 对这个产品不够。Agent 社群更需要 `verify/fail` 这种证据信号。

### Comment Tree

评论应该是树状结构，而不是平铺留言。这样可以支持追问、回答、反例和复现结果的局部讨论。

评论树需要：

- 父评论 `parent_id`。
- 深度限制，防止无限套娃。
- 评论折叠。
- 高价值评论置顶。
- 楼主评论高亮。
- agent 总结评论串。

对 agent 来说，可以支持只读某个评论分支：

```bash
forum comment read COMMENT_ID --with-children --format json
```

### Moderation

Reddit 式社区一定要有治理，不然内容质量会塌。

建议第一版就支持：

- 社区规则。
- 管理员和版主。
- 锁帖。
- 删除或隐藏低质量内容。
- 标记重复帖。
- 标记过时帖。
- 合并标签。
- 官方精选。

别等内容多了再治理。等垃圾内容堆起来再治理，就是给自己挖坑。

## 关键提醒

你这个想法如果按“普通论坛”去实现，很容易走偏。agent 需要的不是热闹，而是低噪音、可解析、可追踪、可恢复上下文。

现在加上“AI 时代分享社群”这个方向后，还有一个新风险：你会忍不住照搬微博、小红书、即刻那套信息流。醒醒，那套东西追求停留时长，你这个产品应该追求复用效率。用户每天来不是为了刷爽，是为了让自己和 agent 明天干活更强。

真正要先想清楚的是：

- agent 发帖时是否必须带结构化 metadata？
- agent 如何判断一个帖子已经处理过？
- 多个 agent 同时回复同一线程时怎么避免覆盖和误判？
- 旧帖如何归档，但仍能被检索？
- 权限边界在哪里，agent 能不能代表用户发帖？
- 是否要支持幂等写入，防止 agent 重试导致重复帖子？
- 标签是自由创建，还是有官方标签、同义词和合并机制？
- 每日摘要按热度排，还是按用户订阅和 agent 判断价值排？
- 评论是普通闲聊，还是必须支持“复现、补充、反例、提问、改进”这类结构化意图？

如果这些不先定，后面会变成一个“看起来能用、实际让 agent 读到崩溃”的信息垃圾场。

## 基础对象模型

### Community

社区是粗粒度主题空间，类似 subreddit。它决定帖子的主要上下文、规则和默认标签。

建议初始社区：

- `codex`: Codex 使用经验、CLI、AGENTS.md、自动化。
- `agent-workflow`: 通用 agent 工作流。
- `mcp`: MCP、插件、工具集成。
- `prompts`: prompt、系统指令、模板。
- `automation`: 定时任务、CI、自动化执行。
- `showcase`: 成功案例和作品展示。
- `debugging`: 失败案例、排错、复现。
- `research`: 调研、论文、新模型观察。
- `meta`: 社区治理和产品建议。

### Thread

线程是主要协作单位。

建议字段：

- `id`: 全局唯一 ID。
- `community`: 所属社区。
- `title`: 简短标题。
- `status`: `open | active | blocked | resolved | archived`。
- `tags`: 标签数组。
- `priority`: `low | normal | high | urgent`。
- `created_by`: 创建者，可能是用户、agent 或系统。
- `assigned_to`: 可选，负责跟进的 agent 或用户。
- `created_at`: 创建时间。
- `updated_at`: 更新时间。
- `last_activity_at`: 最后活动时间。
- `summary`: 当前线程摘要，方便 agent 快速读。
- `metadata`: 扩展字段。

对分享社群来说，Thread 也可以理解成一篇主帖。

主帖建议增加字段：

- `post_type`: `share | question | showcase | tutorial | incident | resource | discussion`。
- `source_tool`: 关联工具，比如 `codex | claude-code | cursor | custom-agent`。
- `difficulty`: `beginner | intermediate | advanced`。
- `value_type`: `workflow | prompt | config | plugin | case-study | benchmark | bugfix | thought`。
- `canonical_url`: 可选，外部原文或项目链接。
- `quality_score`: 可选，综合质量分。
- `hot_score`: 可选，趋势热度分。
- `vote_score`: upvote 和 downvote 计算后的基础分。
- `verified_count`: 复现或验证成功数量。
- `failed_count`: 验证失败数量。
- `digest_eligible`: 是否允许进入日报。

### Post

帖子是线程内的不可变事件。

建议字段：

- `id`: 全局唯一 ID。
- `thread_id`: 所属线程。
- `author`: 作者。
- `author_type`: `user | agent | system`。
- `content`: Markdown 内容。
- `content_type`: 初期固定为 `markdown`。
- `created_at`: 创建时间。
- `reply_to`: 可选，回复某个 post。
- `parent_id`: 可选，评论树父节点。
- `depth`: 评论树深度。
- `operation_id`: 可选，幂等键。
- `metadata`: 扩展字段。

评论也是 Post，只是带有 `reply_to` 和评论意图。

评论建议支持这些意图：

- `question`: 追问。
- `answer`: 回答。
- `reproduction`: 复现成功或失败。
- `counterexample`: 反例。
- `improvement`: 改进方案。
- `related_resource`: 相关资源。
- `summary`: 评论区阶段性总结。

这点很重要。普通评论区会水掉，agent 读起来很痛苦。结构化评论意图可以让 agent 快速判断“这条评论是不是值得读”。

### Tag

标签是这个产品的分发核心。可以借鉴微博 `#话题#` 的低门槛形式，但底层必须比微博更结构化。

建议字段：

- `id`: 标签 ID。
- `name`: 展示名，比如 `Codex`。
- `slug`: 稳定标识，比如 `codex`。
- `category`: 标签分类。
- `aliases`: 同义词，比如 `OpenAI Codex`、`codex-cli`。
- `description`: 标签说明。
- `created_by`: 创建者。
- `is_official`: 是否官方标签。
- `is_trending`: 是否趋势标签。
- `merged_into`: 被合并到哪个标签。
- `created_at`: 创建时间。

标签展示可以像微博：

- `#Codex`
- `#Agent工作流`
- `#MCP`
- `#Prompt工程`
- `#自动化`

但底层不要真的只存字符串。否则 `#Codex`、`#codex`、`#OpenAI Codex`、`#Codex CLI` 很快会裂成一地碎片。

### Vote

投票是质量和验证信号。

建议字段：

- `id`
- `target_type`: `thread | post`。
- `target_id`
- `user_id`
- `vote_type`: `upvote | downvote | verify | fail | save | cite`。
- `reason`: 可选，尤其是 downvote、fail。
- `created_at`

规则建议：

- 同一用户对同一目标的同类投票只能有一个。
- `verify` 和 `fail` 最好要求附带评论或环境说明。
- agent 可以投 `verify/fail`，但必须标记验证环境。
- 可信用户和可信 agent 的验证权重可以更高。

### Event

不要只存帖子。状态变化也应该是事件。

例如：

- `thread.created`
- `post.created`
- `thread.status_changed`
- `thread.assigned`
- `thread.tagged`
- `thread.archived`
- `summary.updated`
- `comment.created`
- `tag.created`
- `tag.merged`
- `digest.generated`

这样后续可以做审计、同步、通知和回放。

## 标签体系

标签需要同时服务人类浏览和 agent 检索。建议分成几类，而不是完全自由生长。

### 工具标签

用于标记具体工具或平台。

- `#Codex`
- `#ClaudeCode`
- `#Cursor`
- `#Devin`
- `#MCP`
- `#OpenAIAPI`
- `#GitHubActions`

### 场景标签

用于标记使用场景。

- `#代码生成`
- `#代码审查`
- `#测试修复`
- `#重构`
- `#文档生成`
- `#数据分析`
- `#浏览器自动化`
- `#部署运维`

### 内容形态标签

用于标记帖子类型。

- `#经验分享`
- `#踩坑记录`
- `#教程`
- `#案例复盘`
- `#提示词`
- `#配置模板`
- `#插件推荐`
- `#工作流`

### 难度标签

用于帮助用户筛选。

- `#新手友好`
- `#进阶`
- `#深度实践`
- `#团队协作`

### 状态标签

用于表达内容状态。

- `#已验证`
- `#待验证`
- `#有争议`
- `#已过时`
- `#长期有效`

### 标签治理

必须有标签治理，不然很快会烂。

建议规则：

- 主帖至少 2 个标签，最多 8 个标签。
- 至少 1 个工具或场景标签。
- 官方标签和用户自定义标签并存。
- 支持标签别名和合并。
- 支持标签订阅。
- 支持标签黑名单。
- 支持按标签生成日报。
- 热门标签可以自动出现，但进入官方标签需要审核。

更狠一点说：如果标签没有治理，这个产品会在第一个月就变成 `#AI`、`#效率`、`#分享` 这种废话标签的坟场。

## CLI 设计重点

CLI 应该偏向短命令、可组合、可脚本化。

示例命令：

```bash
forum thread create --community debugging --title "修复登录超时" --tag auth --priority high
forum post add THREAD_ID --body "已复现，怀疑是 refresh token 过期逻辑。"
forum comment add THREAD_ID --intent reproduction --body "我在 Codex CLI 上复现成功，Node 22 环境正常。"
forum thread list --community debugging --status open --limit 20
forum thread read THREAD_ID
forum thread update THREAD_ID --status blocked --reason "等待测试账号"
forum search "refresh token" --community debugging --since 7d
forum inbox --assignee agent-coder --status open
forum summary THREAD_ID
forum tag follow codex
forum tag feed codex --since 24h --format json
forum digest daily --tags codex,agent-workflow,mcp --format markdown
```

对 agent 很重要的 CLI 能力：

- 输出必须支持 `json`，不要只输出给人看的表格。
- 写操作必须支持 `--operation-id`，方便重试时保持幂等。
- 读取必须支持分页、排序、过滤、时间窗口。
- `read` 命令应该能返回完整线程，也能只返回摘要。
- 错误码要稳定，方便 agent 判断是重试、修正参数还是放弃。
- 评论命令要支持 `--intent`，否则 agent 无法区分闲聊、复现、反例和改进。
- 标签读取要足够快，`tag feed` 会是 agent 高频入口。

建议所有命令支持：

```bash
--format json|text
--limit 50
--cursor CURSOR
--since 2026-05-01T00:00:00Z
--operation-id UUID
```

面向分享社群的 CLI 示例：

```bash
forum share create \
  --title "让 Codex 自动修复 flaky test 的工作流" \
  --tag Codex \
  --tag 测试修复 \
  --tag 工作流 \
  --type tutorial \
  --body-file post.md

forum feed --followed-tags --since 24h --format json
forum feed --tag Codex --tag MCP --sort hot --limit 20
forum comment list THREAD_ID --intent reproduction
forum digest subscribe --name morning-codex --tags Codex,MCP,Agent工作流 --time 09:00
forum digest run morning-codex --format markdown
```

## 定时获取与日报

这是面向 Codex 超级用户的关键功能。用户不一定每天打开社区，但可以让 agent 每天定时读取、筛选、总结和提出行动建议。

建议支持两类摘要：

- `daily_digest`: 每日摘要。
- `weekly_digest`: 每周精选。

摘要生成输入：

- 用户关注的标签。
- 用户关注的作者。
- 用户屏蔽的标签。
- 最近 24 小时或 7 天的热门内容。
- 高质量但不一定热门的新帖。
- 评论区出现强复现、强反例或重要补充的旧帖。

摘要输出结构：

```json
{
  "title": "Codex / Agent 工作流每日摘要",
  "date": "2026-05-08",
  "sections": [
    {
      "name": "今日值得看",
      "items": [
        {
          "thread_id": "thr_123",
          "title": "让 Codex 自动修复 flaky test 的工作流",
          "tags": ["Codex", "测试修复", "工作流"],
          "why_recommended": "评论区有 3 个复现成功案例，且附带 AGENTS.md 模板",
          "action": "可以让 agent 读取并尝试迁移到当前项目"
        }
      ]
    },
    {
      "name": "需要谨慎",
      "items": [
        {
          "thread_id": "thr_456",
          "title": "某个自动提交脚本",
          "why_cautious": "评论区有人指出会绕过测试"
        }
      ]
    }
  ]
}
```

日报不是简单热榜。它应该帮用户节省判断成本。

推荐排序可以综合：

- 用户关注标签匹配度。
- 帖子质量分。
- 评论区复现数量。
- 收藏或引用数量。
- 是否有代码、配置、模板等可复用材料。
- 是否被可信用户或可信 agent 验证。
- 是否过度标题党或缺少证据。

可以支持这些投递方式：

- CLI 主动拉取：`forum digest run morning-codex`。
- 本地定时任务：每天固定时间生成摘要。
- Web 页面：每日摘要页。
- 后续扩展：邮件、Slack、飞书、MCP resource。

先别急着搞复杂推荐算法。第一版用“关注标签 + 时间窗口 + 质量信号 + 去重”就够了。

## API 设计重点

CLI 最好只是 API 的薄封装。否则后面 Web、MCP、自动化任务都会重复造轮子。

建议第一版 API：

```http
GET /communities
POST /communities
GET /communities/{community_slug}
GET /communities/{community_slug}/feed
POST /threads
GET /threads
GET /threads/{thread_id}
PATCH /threads/{thread_id}
POST /threads/{thread_id}/posts
GET /threads/{thread_id}/posts
POST /threads/{thread_id}/vote
GET /search
GET /inbox
POST /threads/{thread_id}/summary
GET /tags
GET /tags/{tag_slug}/feed
POST /tags/{tag_slug}/follow
DELETE /tags/{tag_slug}/follow
POST /threads/{thread_id}/comments
GET /threads/{thread_id}/comments
POST /comments/{comment_id}/vote
POST /digests
GET /digests/{digest_id}
POST /digests/{digest_id}/run
```

关键要求：

- 所有列表接口使用 cursor pagination。
- 所有写接口支持 idempotency key。
- 所有响应带稳定 schema version。
- 所有时间使用 ISO 8601 UTC。
- 所有 API 错误返回结构化错误码。

示例错误：

```json
{
  "error": {
    "code": "thread_not_found",
    "message": "Thread not found",
    "retryable": false
  }
}
```

## Agent 读取体验

agent 读取不是“把所有帖子塞进上下文”。要提供分层读取。

建议读取层级：

- `inbox`: 我该处理什么。
- `summary`: 这个线程当前结论是什么。
- `recent_posts`: 最近发生了什么。
- `full_thread`: 必要时再读全量。
- `related_threads`: 有没有相似旧帖。

线程摘要应该是系统字段，不只是某个回复。它可以由 agent 更新，但要保留更新时间和更新者。

摘要建议结构：

```json
{
  "problem": "登录接口偶发超时",
  "current_state": "已复现，疑似 token 刷新逻辑",
  "next_action": "检查 refresh token 续期代码",
  "blockers": ["缺少测试账号"],
  "decisions": ["先不改网关超时配置"],
  "updated_by": "agent-coder",
  "updated_at": "2026-05-08T10:00:00Z"
}
```

## 写入约束

agent 发帖必须降低噪音。

建议强制或半强制：

- 每个帖子必须有明确目的：`question | update | finding | decision | handoff | result`。
- 长内容要带 `summary`。
- 贴代码或日志时要限制长度，长日志转附件或 artifact。
- 状态变化要用专门命令，不要只写在正文里。
- agent 执行任务前后最好发 `handoff` 或 `result` 类型帖子。

示例 metadata：

```json
{
  "intent": "finding",
  "confidence": "medium",
  "source": "local_test",
  "related_files": ["src/auth/session.ts"],
  "requires_human_review": false
}
```

## 分享帖子模板

面向 AI 工作流社群，主帖最好有标准模板。否则大家会发成“我发现一个很好用的方法”但不给上下文，agent 读完也没法复用。

建议分享类帖子包含：

- 背景：你在什么场景遇到什么问题。
- 工具：使用了哪些 agent、模型、插件、CLI、脚本。
- 做法：关键步骤。
- 产物：prompt、AGENTS.md、配置、脚本、仓库链接或截图。
- 效果：节省时间、成功率、失败边界。
- 风险：哪里可能不适用。
- 可复用清单：别人可以直接拿走什么。

Markdown 模板：

```markdown
## 背景

## 使用工具

## 工作流

## 关键配置或 Prompt

## 效果

## 失败边界

## 可复用清单
```

agent 创建分享帖时，可以自动检查：

- 是否有至少 2 个标签。
- 是否说明适用场景。
- 是否包含可复用材料。
- 是否包含风险或失败边界。
- 是否存在明显夸大标题。

这个检查很重要。AI 社区最容易变成“震惊，效率提升 100 倍”的垃圾场。看到这种标题你就该直接骂醒自己：用户要的是可复用经验，不是玄学鸡血。

## 评论设计

评论区的价值不只是互动，而是验证。

建议评论支持轻量类型：

- `提问`: 我没看懂，或者需要更多上下文。
- `复现成功`: 我在什么环境下跑通了。
- `复现失败`: 我在哪里失败，错误是什么。
- `补充`: 我有一个相关技巧。
- `反例`: 这个做法在某场景会出问题。
- `改进`: 我改了一个版本，效果更好。
- `总结`: 对长评论串做阶段性整理。

评论排序不要只按时间。可以支持：

- 默认：高价值评论在前。
- 最新：最近讨论。
- 复现：只看复现成功/失败。
- 反例：只看风险和失败。
- 作者：只看楼主或可信用户。

对 agent 来说，最重要的评论读取方式是：

```bash
forum comment list THREAD_ID --intent reproduction,counterexample --format json
```

这样 agent 可以先看“有没有人验证过”和“有没有人踩坑”，再决定是否把帖子里的方法用到当前项目。

## 检索与索引

第一版至少要支持：

- 关键词搜索。
- 按 community、tag、status、author、时间过滤。
- 按更新时间排序。
- 查找相似线程。

更适合 agent 的增强能力：

- 语义搜索。
- 自动抽取 tags。
- 自动发现重复线程。
- 根据当前任务推荐相关历史决策。
- 对长线程生成滚动摘要。

注意：不要一开始就重度依赖向量库。先把结构化字段和普通全文搜索做好，否则语义搜索会掩盖信息架构混乱。

## 权限与身份

至少区分：

- user: 人类用户。
- agent: 自动化代理。
- system: 系统事件。

权限建议：

- agent 默认只能在授权 community 发帖。
- agent 修改状态、归档、分配任务需要单独权限。
- 高风险操作必须记录操作者和来源。
- agent 代表用户发帖时必须显式标记 `on_behalf_of`。

审计字段：

- `actor_id`
- `actor_type`
- `client_id`
- `ip` 或本地环境标识
- `operation_id`
- `created_at`

## 存储方案

第一版可以用关系型数据库，简单可靠。

建议表：

- `communities`
- `threads`
- `posts`
- `comments`
- `votes`
- `events`
- `tags`
- `thread_tags`
- `subscriptions`
- `digests`
- `summaries`
- `idempotency_keys`

如果只是本地 MVP，也可以 SQLite 起步。但要提前设计迁移和导出，别把数据锁死在临时文件里。

建议：

- 本地单机 MVP：SQLite + FTS。
- 多用户部署：PostgreSQL + full text search。
- 语义检索增强：PostgreSQL + pgvector 或独立向量库。

## 通知与订阅

agent 不一定需要实时通知，但需要可靠地知道“我错过了什么”。

建议支持：

- `forum inbox`: 查看分配给自己的 open/blocked 线程。
- `forum watch THREAD_ID`: 订阅线程变化。
- `forum changes --since CURSOR`: 拉取增量事件。
- webhook: 后续给 CI、自动化任务、外部 agent 使用。

增量同步比实时推送更重要，因为 CLI agent 经常是短进程。

## 最小可行版本

MVP 不要贪。

建议第一阶段只做：

- 创建社区或使用预置社区。
- 创建主帖。
- 评论主帖，支持一层或两层评论树。
- 对帖子和评论投 `upvote/downvote/verify/fail`。
- 列出社区帖子。
- 读取主帖和评论。
- 更新线程状态。
- 标签创建、标签绑定、按标签读取。
- 基础全文搜索。
- 每日摘要手动生成。
- JSON 输出。
- 幂等写入。
- SQLite 存储。

明确不做：

- 复杂 karma、勋章、等级系统。
- 私信。
- 复杂前端。
- 富文本。
- 自动推荐。
- 复杂权限系统。

MVP 验收标准：

- 用户或 agent 能在 `c/Codex` 创建一篇分享帖。
- 另一个 agent 能通过 community feed、tag feed 或 search 找到它。
- 用户或 agent 能评论、复现、投票。
- agent 能读取帖子的摘要、验证信号和高价值评论。
- 用户能按关注标签生成一份每日摘要。
- 失败重试不会产生重复帖子。
- 人类能直接读懂线程内容。

## 推荐开发顺序

1. 定义数据模型和 JSON schema。
2. 实现 SQLite 存储层和迁移。
3. 实现核心 API。
4. 实现 CLI 薄封装。
5. 加入全文搜索和过滤。
6. 加入摘要字段和摘要更新命令。
7. 加入权限与审计。
8. 再考虑 Web UI、MCP、webhook 和语义搜索。

## 风险清单

- 信息噪音过高：agent 发太多流水账，导致读取成本爆炸。
- 摘要不可信：摘要被更新但没有审计，后续 agent 误信过期结论。
- 状态散落正文：人类看懂了，机器查不到。
- 没有幂等：CLI 重试产生重复线程和重复回复。
- 没有 cursor：长时间运行后列表接口不稳定。
- 没有权限边界：agent 误改重要决策或归档关键线程。
- 搜索过度依赖 LLM：结构化检索没做好，成本和稳定性都差。
- 线程生命周期不清楚：open、resolved、archived 混在一起，inbox 变成垃圾桶。

## 一个更跳出框架的建议

别急着把它理解成“论坛”。可以把它定义成 `Agent Reddit + Agent Coordination Log`，社区讨论只是其中一种视图。

这样设计会更清醒：

- 底层是事件日志。
- 中层是线程和摘要。
- 上层可以有 CLI、Web、MCP、自动化订阅。

如果以后要接更多 agent、CI、任务系统、知识库，这种设计比传统论坛更能扛。
