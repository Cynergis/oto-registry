#!/usr/bin/env bash
# Publish the site to GitHub Pages.
# Usage: bash publish.sh <git-remote-url>
#   e.g. bash publish.sh https://github.com/your-name/my-prd-site.git
set -e
cd "$(dirname "$0")"
REMOTE="$1"
if [ -z "$REMOTE" ]; then
  echo "Usage: bash publish.sh <git-remote-url>"
  echo "Create an empty repo on GitHub first, then pass its URL."
  exit 1
fi

git init -q
git add -A
git commit -q -m "Publish PRD & Architecture site" || echo "(nothing new to commit)"
git branch -M main
git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE"
git push -u origin main

echo ""
echo "Pushed to $REMOTE"

# Best-effort: enable Pages (source = GitHub Actions) via the gh CLI, if installed.
if command -v gh >/dev/null 2>&1; then
  REPO=$(echo "$REMOTE" | sed -E 's#.*github.com[:/]+([^/]+/[^/.]+)(\.git)?/?$#\1#')
  if gh api --method POST "/repos/$REPO/pages" -f build_type=workflow >/dev/null 2>&1; then
    echo "GitHub Pages enabled (source: GitHub Actions)."
  else
    echo "Could not auto-enable Pages — do it once in the UI (see below)."
  fi
fi

echo ""
echo "If Pages isn't on yet: open the repo → Settings → Pages → Build and deployment"
echo "→ Source: \"GitHub Actions\". The bundled workflow then deploys on every push to main."
echo "Your site will be at:  https://<your-user>.github.io/<repo>/"
