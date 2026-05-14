#!/bin/bash
# SessionStart hook — Liby ingest backlog 알림
# CLAUDE.md "Liby ingest" 정의 § 참조. backlog 누락 방지용 reflexive 알림.
set -euo pipefail

cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0

# git 사용 가능·repo인지 확인
git rev-parse --git-dir >/dev/null 2>&1 || exit 0

# 마지막 bundle.js commit
BUNDLE_COMMIT=$(git log -1 --format=%H -- src/knowledge-bundle.js 2>/dev/null) || exit 0
[ -z "$BUNDLE_COMMIT" ] && exit 0

BUNDLE_DATE=$(git log -1 --format=%ad --date=short "$BUNDLE_COMMIT" 2>/dev/null) || exit 0

# 그 이후 변경된 knowledge entry md 카운트 (by-disease·by-drug·guidelines만 — meta·myth·obsidian 제외)
BACKLOG=$(git diff --name-only "$BUNDLE_COMMIT"..HEAD -- \
  'knowledge/by-disease/*.md' \
  'knowledge/by-drug/*.md' \
  'knowledge/guidelines/*.md' 2>/dev/null | wc -l | tr -d ' ')

if [ "$BACKLOG" -ge 5 ]; then
  echo "⚠ Liby ingest backlog: $BACKLOG entries since $BUNDLE_DATE — \`liby ingest\` 권장 (knowledge/*.md → src/knowledge-bundle.js 미컴파일)"
elif [ "$BACKLOG" -ge 1 ]; then
  echo "Liby ingest backlog: $BACKLOG entry/entries (since $BUNDLE_DATE)"
fi
# 0건 → silent
