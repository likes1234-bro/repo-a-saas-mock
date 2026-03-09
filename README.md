# repo-a-saas-mock

SaaS repository mock for testing cross-repository code synchronization.

## Overview

This repository simulates a SaaS product codebase that contains both:
- **Generic validation logic** - reusable code that should be synced to the open-source version
- **SaaS-specific logic** - tenant validation, enterprise features that should NOT be synced

## Structure

```
repo-a-saas-mock/
├── src/
│   ├── validators/
│   │   └── username.js          # Mixed: generic + SaaS logic
│   └── saas/
│       └── tenant-validator.js  # Pure SaaS logic
├── tests/
│   └── validators/
│       └── username.test.js
└── .github/workflows/
    └── sync-trigger.yml         # Triggers sync to repo-b
```

## Usage

### Running Tests

```bash
npm install
npm test
```

### Triggering Sync

1. Go to Actions tab in GitHub
2. Select "Trigger Sync to OSS Repo" workflow
3. Click "Run workflow"
4. Enter PR number to sync
5. Click "Run workflow" button

This will automatically trigger the sync process in `repo-b-oss-mock`.

## Sync Mechanism

When triggered, this workflow:
1. Generates a sync task JSON with instructions
2. Sends it to `repo-b-oss-mock` via `repository_dispatch`
3. repo-b receives the task and uses Claude API to apply changes

## Configuration

Required GitHub Secret:
- `REPO_DISPATCH_TOKEN` - Personal Access Token with `repo` scope
