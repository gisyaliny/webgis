---
trigger: always_on
---

# Tutorial Generation Guidelines

This document outlines the standard rules and workflow for generating learning tutorials (e.g., React, ES6) in this workspace. All new tutorials should follow these guidelines to ensure consistency and quality.

## 1. Directory & File Structure

### Directory
- Create a dedicated folder for the topic in `docs/` (e.g., `docs/ES6`, `docs/Python`).

### File Naming
- Use numbered prefixes to order modules logically.
- Use capitalized words separated by underscores or hyphens.
- Format: `XX_Topic_Name.md`
- **Examples**:
  - `01_Introduction.md`
  - `02_Data_Handling.md`
  - `03_Advanced_Patterns.md`

## 2. Content Structure (Per Module)

Each tutorial file should generally follow this structure:

### A. Header
- **H1 Title**: `"# Topic Module X: Module Name"`
- **Introduction**: Brief summary (2-3 sentences) of what this module covers and why it matters.

### B. Core Sections
- Use **H2** for main topics (`## 1. Topic Name`).
- Use **H3** for subtopics (`### Subtopic`).
- **Explain-then-Show**: Provide a brief explanation followed immediately by a code block.
- **Comparison**: Where possible, show "Old vs. New" or "Wrong vs. Correct" examples.
  - Use `❌ Wrong` / `✅ Correct` indicators.

### C. Formatting Standards
- **Code Blocks**: Always specify the language (e.g., `javascript`, `python`).
- **Emphasis**: Use **bold** for key terms and `backticks` for inline code/variable names.
- **Best Practices**: Explicitly call out best practices vs. anti-patterns.

### D. Interactive Quiz (Mandatory)
- End each module with a **Quiz section**.
- **Header**: `## 🔴 Quiz: Topic Name`
- **Format**: Multiple-choice questions (Q1, Q2, Q3...).
- **Answers**: Hide answers inside a collapsible `<details>` block.

#### Quiz Template:
```markdown
## 🔴 Quiz: Module Name

**Q1: Question text here?**
A) Option A
B) Option B
C) Option C

<details>
<summary><strong>See Answers</strong></summary>

**A1: B.** Explanation of why B is correct.
</details>
```

## 3. Style & Tone
- **Comprehensive**: Cover edge cases and common pitfalls.
- **Modern**: Teach modern standards (e.g., ES6+ over var, Functional React over Class).
- **Practical**: Use realistic variable names (`user`, `isLoggedIn`) rather than `foo`/`bar` where possible.

## 4. Verification
- Ensure code examples are syntactically correct.
- Verify that standard links or references (if any) are valid.
- Check that the quiz answers match the content taught in the module.
