#### Open Task Workflow

- provide task_id
- check for task with that id
- get task name
- convert task name
    - 30 characters max
    - all punctuation is _s
    - all lowercase
- create branch
- if branch exists error
- checkout branch
- set task to active
- add github branch link to custom field

#### Switch Task Workflow

- provide task_id or branch name
- if starts with # or number assume task_id
    - get task name
    - convert to branch name
    - checkout branch name
- else
    - checkout branch name

#### Submit Task Workflow

- create PR
- prompt for PR message