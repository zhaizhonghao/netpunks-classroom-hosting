# NETPUNKS 系统 UML 图册

基于当前 Vue、Express 与 Hardhat 项目的实际实现绘制，整理日期：2026-10-20。

- [打开完整图册](index.html)：14 张图，支持目录跳转、放大、打印和文字流程阅读，离线可用。
- [可编辑 UML 源文件](NETPUNKS-UML.drawio)：用 draw.io / diagrams.net 打开，底部标签切换各页。
- `png/`：适合插入需求文档、报告和演示文稿的图片，内嵌对应页的可编辑 XML。
- `svg/`：可缩放的矢量图，内嵌对应页的可编辑 XML。
- `pages/`：每张图的独立 `.drawio` 源文件。
- [两份合约的独立流程图源文件](NETPUNKS-CONTRACT-FLOWS.drawio)：仅含图 13—14，便于单独编辑和导出。

图册顶部固定显示“简体中文 / English”切换按钮，切换语言后保留当前图表编号。两种语言分别提供对应的图片、文字流程和可编辑源文件；将整个 `docs/uml/` 文件夹保存在一起，也可离线切换。

## 图表目录

| 编号 | 图表 | 覆盖内容 | 图片 |
| --- | --- | --- | --- |
| 01 | 系统用例图 | 访客、钱包用户、发行管理员及角色泛化 | [PNG](png/01-system-use-cases.png) · [SVG](svg/01-system-use-cases.svg) |
| 02 | 市场交易用例图 | 上架、改价、取消、购买、出价、接受、撤回、提现 | [PNG](png/02-market-use-cases.png) · [SVG](svg/02-market-use-cases.svg) |
| 03 | 系统使用总流程 | 公开浏览、收藏、语言、主题；通用交易确认与结果刷新 | [PNG](png/03-overall-activity.png) · [SVG](svg/03-overall-activity.svg) |
| 04 | 钱包连接流程 | MetaMask、本地体验账户、网络检查、会话、断开 | [PNG](png/04-wallet-activity.png) · [SVG](svg/04-wallet-activity.svg) |
| 05 | 铸造流程 | 数量、总价、累计配额、发行上限、顺序铸造 | [PNG](png/05-mint-activity.png) · [SVG](svg/05-mint-activity.svg) |
| 06 | 挂单流程 | 条件授权、公开或指定买家上架、改价、取消 | [PNG](png/06-listing-activity.png) · [SVG](svg/06-listing-activity.svg) |
| 07 | 购买流程 | 有效挂单、预期价格、买家限制、成交与旧出价退款 | [PNG](png/07-buy-activity.png) · [SVG](svg/07-buy-activity.svg) |
| 08 | 出价流程 | 全额托管、提高出价、旧出价退款、撤回最高出价 | [PNG](png/08-bid-activity.png) · [SVG](svg/08-bid-activity.svg) |
| 09 | 接受出价流程 | 条件授权、最低接受价、NFT 交割、卖家收入 | [PNG](png/09-accept-bid-activity.png) · [SVG](svg/09-accept-bid-activity.svg) |
| 10 | 市场提现流程 | 待提现余额、清零后付款、失败回滚 | [PNG](png/10-withdraw-activity.png) · [SVG](svg/10-withdraw-activity.svg) |
| 11 | 转赠流程 | 接收地址、ERC-721 安全接收、原挂单失效 | [PNG](png/11-transfer-activity.png) · [SVG](svg/11-transfer-activity.svg) |
| 12 | 发行管理流程 | owner 权限、发行开关与单价、独立提取铸造收入 | [PNG](png/12-admin-activity.png) · [SVG](svg/12-admin-activity.svg) |
| 13 | NetPunks 智能合约流程 | 部署初始化、铸造、发行设置、发行提款、授权版本、两步管理员交接与查询 | [PNG](png/13-netpunks-contract-flow.png) · [SVG](svg/13-netpunks-contract-flow.svg) |
| 14 | NetPunksMarket 智能合约流程 | 挂单有效性、上架、撤销、购买、出价、撤回、接受、提款与内部退款 | [PNG](png/14-market-contract-flow.png) · [SVG](svg/14-market-contract-flow.svg) |

## 头像生成原理说明

图册新增[头像生成原理](index.html#avatar-generation)，图 05 和图 13 也有跳转入口。说明包含由当前 `shared/art.js` 实际生成的 #0、#1、#42 与再次生成的 #42 对照。不同编号得到不同外观，同一编号在算法与素材不变时保持一致；当前机制是确定性计算，不使用链上随机数。

修改头像生成器后，先运行 `node docs/uml/generate-avatar-examples.mjs` 更新离线样例，再重新发布中英文图册。

## UML 约定

用例图的外框表示整个 NETPUNKS 系统，包含前端、查询服务和智能合约，所以没有把系统内部合约重复画成外部参与者。实线表示参与关系，空心三角指向一般角色；“已连接钱包用户”继承访客能力，“发行管理员”继承钱包用户能力。持有者、买家、出价者和待提现余额用户表示同一钱包在不同场景中的角色。

功能使用流程采用 **UML 活动图**：实心圆为初始节点，靶心圆为活动终止节点，圆角矩形为动作，菱形为判断或备选路径合并，箭头上的 `[条件]` 为守卫条件，右下角带耙形标记的动作表示调用子活动。不同备选路径通过合并节点汇合，不表示并发执行。钱包连接图中的“连接成功且网络匹配”菱形合并连接路径后继续判断。

图 13—14 是合约级分函数流程图：每个编号分区表示一次独立的函数调用，编号仅用于索引，并不表示顺序执行或并发；管理员交接的虚线明确表示两笔独立交易。图 13 包括继承的 ERC-721 查询和 Ownable2Step 交接；其他公开 getter 和 renounceOwnership 在文字说明中补充。

图 03 定义通用交易确认与刷新处理；图 05—12 展开各功能的业务规则。交易图按照**成功执行的逻辑步骤**展开同一笔交易内的状态更新，这些步骤具有原子性，不能当作多笔独立提交的交易。单枚 NFT 授权则是独立的前置交易，只在现有授权不足时执行。

## 与当前代码的对应关系

| 功能范围 | 代码依据 |
| --- | --- |
| 页面入口、筛选、收藏、主题、个人资产与刷新 | `src/App.vue` |
| 语言切换与本地记忆 | `src/lib/i18n.js`、`src/locales/zh-CN.js`、`src/locales/en.js` |
| 钱包连接、网络切换、签名、条件授权、错误说明 | `src/lib/wallet.js` |
| NFT、动态、统计与钱包查询 API | `server/app.js` |
| 链上事件同步、SQLite 索引、挂单有效性读取 | `server/indexer.js` |
| 铸造、累计额度、所有权与授权版本、发行管理 | `contracts/NetPunks.sol` |
| 挂单、购买、出价、接受、退款记账与市场提现 | `contracts/NetPunksMarket.sol` |

Express 负责查询与事件索引；资产交易由当前钱包直接调用链上合约。收藏、简体中文 / English 和主题写入本机浏览器存储；钱包选择写入当前浏览器会话。

## 流程中的关键业务规则

1. 总量固定 10,000 枚；每个地址累计最多铸造 5 枚，转出 NFT 不恢复额度。铸造支付金额必须精确等于交易执行时单价乘数量。
2. 挂单可指定买家；购买时检查挂单有效性、价格、持有者及授权版本。转出再转回或重新授权，都不会自动恢复已失效挂单。
3. 每枚 NFT 仅保留一笔最高出价。提高自己的出价也需要支付新金额全额，旧金额转入自己的待提现余额。
4. 接受出价锁定的是最低成交金额。执行时若出现更高出价，可以成交给新的最高出价者。
5. 成交收入、撤回出价及被替代出价先计入待提现余额，之后通过 `withdraw()` 转入钱包。转赠不会自动撤回已有出价。
6. 铸造收入属于 NFT 合约中的独立余额，由 owner 通过 `withdrawMintProceeds()` 提取。
7. 钱包拒绝或业务交易失败时按图 03 处理。已经成功的授权交易不会因后续业务失败而撤销；交易已确认但页面刷新失败时，应先核实链上结果。

## 再生成与校验

`generate.py` 用 Python 标准库生成多页及逐页 draw.io 源文件，`contract_flows.py` 以函数分区网格生成图 13—14；`publish.py` 将已经导出的 SVG 打包为自包含图册。重新生成会覆盖 `pages/` 和多页源文件，在 draw.io 中手工调整后应先保存副本。

```sh
python3 docs/uml/generate.py
python3 /Users/zhai/.codex/skills/drawio-skill/scripts/validate.py docs/uml/NETPUNKS-UML.drawio --score
```

本次结构校验结果：**0 错误、0 警告；未检测到节点重叠、连线穿过其他节点或连线交叉**。导出后另行检查中文标签、节点符号和主要分支排版。校验针对图文件，不代替系统运行测试。
