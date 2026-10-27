# NETPUNKS UML Atlas — English Edition

This English edition contains the same **2 use case diagrams and 10 activity diagrams** as the original Chinese atlas. All Chinese files are retained. Diagram identities, relationships, branches, and business rules match the original; English labels use adjusted typography.

- [Open the English atlas](index.html): an offline gallery with navigation, zoom, printing, and text descriptions.
- [Editable English source](NETPUNKS-UML-EN.drawio): open in draw.io / diagrams.net and select a page using the bottom tabs.
- [Original Chinese atlas](../index.html).
- `png/`: document-ready images with embedded editable XML.
- `svg/`: scalable vector images with embedded editable XML.
- `pages/`: individual editable `.drawio` diagrams.

Use the fixed **Simplified Chinese / English** buttons at the top to switch editions while keeping the current diagram. Images, text descriptions, and downloads follow the selected language. Keep the complete `docs/uml/` folder together to use both editions offline.

Prepared on 2026-10-20 from the current Vue + Express + Hardhat implementation.

## Contents

| No. | Diagram | Scope | Exports |
| --- | --- | --- | --- |
| 01 | System Use Cases | Visitors, connected wallet users, issuance administrators, and role generalization | [PNG](png/01-system-use-cases.png) · [SVG](svg/01-system-use-cases.svg) |
| 02 | Market Use Cases | Listings, repricing, cancellation, purchases, bids, acceptance, and withdrawals | [PNG](png/02-market-use-cases.png) · [SVG](svg/02-market-use-cases.svg) |
| 03 | Overall Usage | Browsing, favorites, language, theme, transaction confirmation, and refresh | [PNG](png/03-overall-activity.png) · [SVG](svg/03-overall-activity.svg) |
| 04 | Wallet Connection | MetaMask, local demo accounts, chain checks, sessions, and disconnection | [PNG](png/04-wallet-activity.png) · [SVG](svg/04-wallet-activity.svg) |
| 05 | Minting | Quantity, exact payment, lifetime wallet allowance, and sequential IDs | [PNG](png/05-mint-activity.png) · [SVG](svg/05-mint-activity.svg) |
| 06 | Listings | Conditional approval, public or private listings, repricing, and cancellation | [PNG](png/06-listing-activity.png) · [SVG](svg/06-listing-activity.svg) |
| 07 | Purchase | Valid listings, expected price, buyer restrictions, settlement, and bid refunds | [PNG](png/07-buy-activity.png) · [SVG](svg/07-buy-activity.svg) |
| 08 | Bidding | Full ETH escrow, higher bids, prior-bid refunds, and bid withdrawal | [PNG](png/08-bid-activity.png) · [SVG](svg/08-bid-activity.svg) |
| 09 | Bid Acceptance | Conditional approval, minimum price, NFT delivery, and seller proceeds | [PNG](png/09-accept-bid-activity.png) · [SVG](svg/09-accept-bid-activity.svg) |
| 10 | Market Withdrawal | Pending balances, zero-before-payment, and failure rollback | [PNG](png/10-withdraw-activity.png) · [SVG](svg/10-withdraw-activity.svg) |
| 11 | NFT Transfer | Recipient validation, safe ERC-721 receipt, and listing invalidation | [PNG](png/11-transfer-activity.png) · [SVG](svg/11-transfer-activity.svg) |
| 12 | Mint Administration | Owner permissions, mint availability / price, and mint-proceeds withdrawal | [PNG](png/12-admin-activity.png) · [SVG](svg/12-admin-activity.svg) |

## UML Conventions

The use case boundary contains the Vue frontend, Express query service, and smart contracts. Internal contracts are therefore not external actors. Solid lines show participation; hollow triangles point to the general actor. Connected wallet users inherit visitor capabilities, and administrators inherit wallet-user capabilities. Holder, buyer, bidder, and pending-balance user are situational roles that may belong to one wallet.

Activity diagrams use a filled circle for the initial node, a bullseye for an activity final, rounded rectangles for actions, diamonds for decisions or alternative-path merges, and `[guards]` on branches. A rake marker indicates a call behavior action. Alternative paths merge without implying parallel execution. In Diagram 04, the connection-check diamond combines a merge with a decision.

Diagram 03 defines shared confirmation and refresh handling. Diagrams 05–12 expand business rules. Steps inside a single contract transaction are atomic; a failure reverts that transaction's state changes. NFT approval is a separate transaction and occurs only when existing approval is insufficient.

## Business Rules

1. The fixed collection cap is 10,000 NFTs. Each wallet may mint at most 5 NFTs over its lifetime; transferring NFTs out does not restore that allowance. Mint payment must equal the execution-time unit price multiplied by quantity.
2. Listings may restrict purchases to one buyer. Purchases recheck ownership, current approval, price, and ownership / approval version snapshots. Returning an NFT or reapproving the market does not automatically restore an invalid listing.
3. Each NFT has one active highest bid. Raising your own bid requires the entire new amount; the prior amount is credited to your pending balance.
4. Accepting a bid protects a minimum price, rather than locking a specific bidder. A replacement higher bid may be accepted at execution time.
5. Sale proceeds, withdrawn bids, and replaced bids become pending funds. A separate `withdraw()` transfers those funds to the wallet. NFT transfers do not automatically cancel existing bids.
6. Mint proceeds are tracked separately in the NFT contract and withdrawn by its owner through `withdrawMintProceeds()`.
7. A rejected or reverted business transaction follows Diagram 03. A separately completed approval remains effective. If a transaction confirms but refreshing fails, verify the resulting state before retrying.

Express provides queries and event indexing; the connected wallet calls contracts directly for asset transactions. Favorites, language, and theme use browser-local storage. The wallet choice uses session storage. Local demo accounts require a local hostname and Hardhat chain 31337.

## Code Mapping

| Scope | Source |
| --- | --- |
| Pages, filters, favorites, theme, portfolio, and refresh | `src/App.vue` |
| Language preferences and translations | `src/lib/i18n.js`, `src/locales/zh-CN.js`, `src/locales/en.js` |
| Connection, chain switching, signing, conditional approval, errors | `src/lib/wallet.js` |
| NFT, activity, statistics, and wallet APIs | `server/app.js` |
| Event synchronization, SQLite index, listing-state reads | `server/indexer.js` |
| Minting, lifetime limits, versions, and issuance administration | `contracts/NetPunks.sol` |
| Listings, purchases, bids, settlement, refunds, and withdrawal | `contracts/NetPunksMarket.sol` |

## Regeneration and Validation

`generate.py` reads the existing Chinese source and applies `labels.json` to create the English edition. It never rewrites Chinese artifacts. `publish.py` reuses the original gallery layout with English navigation and workflow descriptions.

```sh
python3 docs/uml/en/generate.py
python3 /Users/zhai/.codex/skills/drawio-skill/scripts/validate.py docs/uml/en/NETPUNKS-UML-EN.drawio --score
```

After exporting the individual English source pages into `png/` and `svg/`, run:

```sh
python3 docs/uml/en/publish.py
```

Structural validation covers endpoints, parents, overlaps, and routes through unrelated nodes. Visual review checks English text, symbols, branches, and readability. The Chinese and English graphs are also compared for identity and relationship parity. These document checks are separate from application runtime tests.

## Contract flowcharts (13–14)

- [13 — NetPunks](index.html#13-netpunks-contract-flow): minting, settings, mint proceeds, approval / ownership versions, two-step administrator handover and NFT queries.
- [14 — NetPunksMarket](index.html#14-market-contract-flow): valid listings, listing / cancellation, purchases, bids, bid withdrawal, acceptance, funds withdrawal and the internal refund routine.
- [Editable contract-only source](NETPUNKS-CONTRACT-FLOWS.drawio). PNG, SVG and individual draw.io files are available in the atlas.

Each numbered panel is an independent function flow, not a mandatory execution order. The handover explicitly spans two separate transactions. Any failure within a transaction reverts its state, transfers and logs. Prior approvals from separate transactions remain.

## Avatar generation explainer

[Read why minted avatars differ](index.html#avatar-generation). Examples #0, #1 and two identical #42 avatars come directly from `shared/art.js`. Different IDs produce different images; a fixed ID remains stable with unchanged generator code and assets. The current generator is deterministic and uses no on-chain randomness.

After changing the generator, run `node docs/uml/generate-avatar-examples.mjs` and republish both editions.
