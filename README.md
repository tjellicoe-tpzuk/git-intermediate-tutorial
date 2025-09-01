# Git Intermediate Tutorial

- [Git Intermediate Tutorial](#git-intermediate-tutorial)
  - [Overview](#overview)
  - [Setup](#setup)
  - [Step-by-Step Instructions](#step-by-step-instructions)
    - [1. Branch Management Exercise](#1-branch-management-exercise)
    - [2. Bisect Exercise](#2-bisect-exercise)
    - [3. Blame Exercise](#3-blame-exercise)
    - [4. Reflog Exercise](#4-reflog-exercise)
    - [5. Rebase Exercise](#5-rebase-exercise)
    - [6. Stash Exercise](#6-stash-exercise)
    - [7. Cherry-pick Exercise](#7-cherry-pick-exercise)
    - [8. Tagging Exercise](#8-tagging-exercise)
    - [9. Conflict Resolution Exercise](#9-conflict-resolution-exercise)
    - [10. Amend Exercise](#10-amend-exercise)
    - [11. Remote Collaboration Exercise](#11-remote-collaboration-exercise)
    - [12. Squash Commits Exercise](#12-squash-commits-exercise)
    - [13. Revert Exercise](#13-revert-exercise)
    - [14. GPG Signing Exercise](#14-gpg-signing-exercise)
    - [15. Advanced Log and Diff Exercise](#15-advanced-log-and-diff-exercise)

## Overview

This repository is designed for hands-on learning of intermediate Git commands:

- `git bisect`: Find which commit introduced a bug.
- `git blame`: Identify who made a change and why.
- `git reflog`: Recover lost commits.
- `git rebase`: Integrate changes and rewrite history.
- `git stash`: Save and restore work-in-progress changes.
- `git cherry-pick`: Apply a specific commit from another branch.
- `git tag`: Mark releases and important points in history.
- `git merge/rebase` conflicts: Practice resolving conflicts.
- `git commit --amend`: Amend the last commit.
- Remote collaboration: Push, pull, and handle remote changes.
- Branch management: Create, rename, and delete branches.

Follow the exercises in this README and use the commit history to practice each command.

## Setup

Clone this repo and follow the instructions for each section below.

## Step-by-Step Instructions

### 1. Branch Management Exercise

Create, rename, and delete branches.

**How to use:**

- After switching branches, run `yarn start` or `npm start` to see the code in that branch.

1. Create: `git branch new-feature`
1. Rename: `git branch -m old-name new-name`
1. Delete: `git branch -d branch-name` (use `-D` to force delete)
1. Push: `git push origin main`
1. Pull: `git pull origin main`
1. Handle conflicts as needed.

### 2. Bisect Exercise

At some point in the commit history, a bug was introduced in the `divide` function. Use `git bisect` to find the commit that broke the calculator's `divide` function.

**How to use:**

- Run `yarn test:divide` or `npm run test:divide` to check if `divide` is working in the current commit.

1. Run: `git bisect start`
1. Mark current commit as bad: `git bisect bad`
1. Find a commit where `divide` worked, and mark it as good: `git bisect good <commit-hash>`
1. Git will check out commits between. For each commit, run `yarn test:divide` or `npm run test:divide`:
  - If the output is "Correct: error thrown for divide by zero.", mark the commit as good: `git bisect good`
  - If the output is "No error thrown! BUG: divide by zero not handled.", mark the commit as bad: `git bisect bad`
  - Repeat until Git identifies the first bad commit.
1. Finish: `git bisect reset`

### 3. Blame Exercise

Find out who changed the `multiply` function to use a different algorithm, and ask them why.

**How to use:**

- Run `yarn test:multiply` or `npm run test:multiply` to see the current behavior.
- Use `git blame` to find who changed it.

1. Run: `git blame src/calculator.js`
1. Find the line for `multiply` and note the author and commit.
1. Use: `git show <commit-hash>` to see the commit message and details.

### 4. Reflog Exercise


Recover a lost commit after an accidental `git reset --hard HEAD~1`.

**Step-by-step instructions:**

1. Make sure you are on the `lost-work` branch:
   ```sh
   git checkout lost-work
   ```
1. Run the reset command:
   ```sh
   git reset --hard HEAD~1
   ```
1. To recover the lost commit, use:
   ```sh
   git reflog
   ```
1. Find the commit before the reset (look for an entry like **reset: moving to ...**).
1. Restore it:
   ```sh
   git checkout -b <recovery-branch> <commit-hash>
   ```
1. After recovery, run `yarn start` or `npm start` to verify the restored code works as expected.

**Notes:**
- Reflog entries are temporary and may disappear after certain git operations or after some time (e.g., branch deletion, garbage collection).
- If you cannot find the reflog entry, it may have expired or been cleaned up by git.
- There is far more to this command of course, but this is a major usage of it and maybe the most useful.

### 5. Rebase Exercise

Rebase your feature branch onto main, and fix a typo in an old commit without creating a new one.

**How to use:**

- After rebasing and fixing typos, run `yarn start` or `npm start` to verify the code.

1. Switch to your feature branch: `git checkout feature/sum-feature`
1. Rebase onto main: `git rebase main`
1. To fix a typo in an old commit: `git rebase -i HEAD~N` (N = number of commits back)
1. Mark the commit as `edit`, fix the typo, then:
   - `git commit --amend`
   - `git rebase --continue`
1. To fix a typo in an old commit: `git rebase -i HEAD~N` (N = number of commits back)
1. Mark the commit as `edit`, fix the typo, then:
	- `git commit --amend`
	- `git rebase --continue`

### 6. Stash Exercise

Make a change to `utils.js`, stash it, and then apply it back.

**How to use:**

- Make a change, stash it, and run `yarn start` or `npm start` to see the effect before and after applying the stash.

1. Make a change to `src/utils.js`.
1. Stash it: `git stash`
1. List stashes: `git stash list`
1. Apply the stash: `git stash apply`

### 7. Cherry-pick Exercise

Apply a commit from `feature/sum-feature` to `main` using cherry-pick.

**How to use:**

- After cherry-picking, run `yarn start` or `npm start` to verify the change is present in `main`.

1. Find the commit hash on `feature/sum-feature`.
1. Switch to `main`: `git checkout main`
1. Run: `git cherry-pick <commit-hash>`

### 8. Tagging Exercise

Create a tag for the first release and list all tags.

**How to use:**

- Use tags to mark important points. After tagging, you can check out a tag and run `yarn start` or `npm start` to see the code at that release.

1. Create a tag: `git tag v1.0.0 -m "First release"`
1. List tags: `git tag`
1. Show tag details: `git show v1.0.0`

### 9. Conflict Resolution Exercise

Edit `src/conflict.txt` in two branches to create a conflict, then resolve it during merge or rebase.

**How to use:**

- After resolving the conflict, run `yarn start` or `npm start` to verify the code is working and the conflict is resolved.

1. Edit `src/conflict.txt` in two branches with different content.
1. Merge or rebase one branch into the other: `git merge <branch>` or `git rebase <branch>`
1. Resolve the conflict in the file, then:
   - `git add src/conflict.txt`
   - `git commit` (or `git rebase --continue`)

### 10. Amend Exercise

Amend the last commit to fix a message or add a file.

**How to use:**

- After amending, run `yarn start` or `npm start` to verify your changes are included in the last commit.

1. Make a change or add a file.
1. Run:
   - `git add <file>`
   - `git commit --amend`
1. Edit the commit message if needed.

### 11. Remote Collaboration Exercise

Practice pushing, pulling, and handling remote changes.

**How to use:**

- After pushing or pulling, run `yarn start` or `npm start` to verify your local code matches the remote.

1. Add a remote: `git remote add origin <url>`
1. Push: `git push origin main`
1. Pull: `git pull origin main`
1. Handle conflicts as needed.
	- `git add <file>`
	- `git commit --amend`
1. Edit the commit message if needed.

### 12. Squash Commits Exercise

Squash multiple commits into one for a cleaner history.

**How to use:**

- After squashing, run `yarn start` or `npm start` to verify the code still works and history is cleaner.

1. Run: `git rebase -i HEAD~N` (N = number of commits to squash)
1. In the editor, change `pick` to `squash` (or `s`) for the commits to combine.
1. Save and follow prompts to edit the commit message.
1. Finish: `git rebase --continue`

1. Create: `git branch new-feature`
2. Rename: `git branch -m old-name new-name`
3. Delete: `git branch -d branch-name` (use `-D` to force delete)

### 13. Revert Exercise

Undo a specific commit without rewriting history.

**How to use:**

- After reverting, run `yarn start` or `npm start` to verify the code is back to the desired state.

1. Find the commit hash to revert.
1. Run: `git revert <commit-hash>`
1. Edit the commit message if needed and complete the revert.

Squash multiple commits into one for a cleaner history.

1. Run: `git rebase -i HEAD~N` (N = number of commits to squash)
1. In the editor, change `pick` to `squash` (or `s`) for the commits to combine.

### 14. GPG Signing Exercise

Sign commits and tags for verification.

**How to use:**

- After signing, you can share your commit/tag and others can verify its authenticity. Run `yarn start` or `npm start` to check the code at a signed commit/tag.

1. Generate a GPG key: `gpg --full-generate-key`
1. List keys: `gpg --list-secret-keys --keyid-format LONG`
1. Configure Git to use your key:
  - `git config --global user.signingkey <key-id>`
  - `git config --global commit.gpgsign true`
1. Make a signed commit: `git commit -S -m "Signed commit"`
1. Sign a tag: `git tag -s v1.0.0 -m "Signed tag"`
1. Find the commit hash to revert.
1. Run: `git revert <commit-hash>`
1. Edit the commit message if needed and complete the revert.

### 15. Advanced Log and Diff Exercise

Explore advanced logging and diffing, including comparing branches.

**How to use:**

- Use these commands to analyze history and differences. After inspecting, run `yarn start` or `npm start` to see the code in the branch or commit you’re investigating.

1. Show commits in `main` not in your branch:
  - `git log ..main`
1. Show commits in your branch not in `main`:
  - `git log main..`
1. Show commit graph:
  - `git log --oneline --graph --all --decorate`
1. Show file changes between branches:
  - `git diff main..your-branch`
1. Show changes for a specific file:
  - `git log -p src/calculator.js`
1. Show summary of changes:
  - `git diff --stat main..your-branch`
1. Show who changed what and when:
  - `git shortlog -sne`
