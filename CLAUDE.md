@AGENTS.md

## 接手先读（交接）

新会话开工前先读这几份，读完再动手：
1. 本仓库 `docs/HANDOFF-2026-10-13.md` —— 当前要上的站、要改的代码、上线清单。
2. 研究库（私有仓库 `CharlesHarry7/seo-research-library`，本地克隆 `~/Desktop/seo-repo`，没有就 `gh repo clone CharlesHarry7/seo-research-library ~/Desktop/seo-repo`）的 `16-session-logs/README.md`（结论速查）和同目录完整会话记录。
3. 找词方法与判断门槛：研究库 `08-site-keyword-loop/`。


## Claude Code specifics

- Use **plan mode** for any change under `src/lib/billing/` or
  `src/lib/credits/` — money and ledger code gets a reviewed plan first.
- Scoped rules load automatically from `.claude/rules/` (billing, database,
  design). Follow them; they restate the invariants that matter most.
- Skills for common jobs — prefer them over improvising:
  - `/add-feature` — scaffold a page + server action + test the repo way.
  - `/add-ai-provider` — implement `src/lib/ai/provider.ts` for a new provider.
  - `/db-migration` — schema change → generated migration → review → apply.
- The `code-reviewer` agent (`.claude/agents/code-reviewer.md`) reviews
  auth/billing/ledger diffs read-only. Run it before committing changes there.
- Hooks: Prettier runs after every file edit; `pnpm typecheck` runs when you
  stop — a type error blocks completion, fix it before finishing.
