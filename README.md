# TACHKILA_V2
1. Update your feature branch with dev
git fetch origin
git checkout feat/tracability2
git pull origin feat/tracability2
git merge origin/dev


This brings the latest dev changes into your feature branch while preserving your work.
2. Resolve conflicts if necessary
If Git reports conflicts, resolve them in the affected files, then run:
git add .
git commit


If Git completes the merge automatically, you don't need to run git commit manually.
3. Push your feature branch
git push origin feat/tracability2


4. Merge your feature branch into dev
Switch to dev and update it first:
git checkout dev
git pull origin dev
git merge feat/tracability2


Then push the updated dev branch:
git push origin dev