# How to contribute to SOT_PAGES
1. Clone the repo.
2. We use the `Feature-branch` Gitflow.
3. When you're going to create a variant page, create a branch like `Variant-Descriptive-Name`.

# Considerations
**We are always going to work on a Control Page.**

When working on the SOT team, you have some posibilities like:
1. Create a new page.
2. Do a variant of the current Control Page.
3. Create a reusable component that we eventually can use even if the variant loses.

**IMPORTANT:** When you create a Pull Request you need to add on the description the link of the Jira Ticket. 

Also the Pull Request can have a prefix like:

1. **WIP - Title** Work in Progress.
2. **AB Test - Title** Meaning that we are still waiting for results related to if the AB test is a winner or a losser.
3. **Title** Means that the branch is ready to be merged into master.

# Commit messages

## A variant is the new control
Write a commit message like `UPDATING CONTROL - {TICKET-NUMBER} {Variant-Name}`

## Deleting a variant
Write a commit message like `DELETE - {TICKET-NUMBER} {Variant-Name}`