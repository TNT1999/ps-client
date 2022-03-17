### Commit messages

Each commit must have a `type` and `subject` and optionally, a `scope` and a `body`. Format:

```
type(scope?): subject
\n
body?
```

`type` is one of:

- feat: an end-user feature
- style: UI style change of an existing feature
- fix: a bug fix
- refactor: code change that does not fix a bug or add a feature, eg. renaming a variable
- perf: code change that improves performance of an existing feature
- revert: reverts a previous commit
- test: unit test or end-to-end test
- chore: misc changes, e.g. build scripts, dev tools, research etc.
- docs: changes to the documentation only

Examples:

```
feat: add circle drawing
style: change button border color
fix: remove broken confirmation message
refactor: share logic between 4d3d3d3 and flarhgunnstow
perf: speed up rect drawing
revert: revert 2b8c9a1
test: verify WebSocket handshake
chore: add Lerna start script
docs: add coding guideline
```

### Structure

- `components`: React components (pages, containers, components, routes etc.)
- `contexts`: React contexts and hooks
- `styles`: styling
- `utils`: various groups of utilities, e.g. dom, time, log etc.
- `app`: Redux setup.

### UI Component

https://nextui.org/

### Style

https://tailwindcss.com/

- Only style with Tailwind classes
