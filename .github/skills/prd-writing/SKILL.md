---
name: prd-writing
description: Guides the user through a discovery interview to produce a high-quality PRD.
---

## Workflow
### Step 1: Context Gathering
Interview the user by asking no more than 10 clarifying questions to define:
1. **Problem Statement**: What specific pain point are we solving?
2. **Target Users**: Who is this for?
3. **Business Goals**: What metric are we moving? (e.g., Conversion, Retention)
4. **Constraints**: What are the technical or timeline limitations?

### Step 2: Analysis
Explore the codebase to identify existing modules or integration points that will be affected by this new feature.

### Step 3: Generation
Use the standard template to generate the document in `tasks/prd-[feature-name].md`.

## PRD Template Structure
1. **Introduction**: High-level summary of the feature.
2. **User Stories**: A numbered list using the format: "As a [user], I want [feature], so that [benefit]".
3. **Functional Requirements**: Detailed breakdown of expected behaviors.
4. **Technical Constraints**: Integration points and performance requirements.
5. **Success Metrics**: Measurable goals (e.g., "Reduce X by 50%").
6. **Out of Scope**: Explicitly state what will NOT be built.

## Constraints & Rules
- **No Jargon**: Be explicit and unambiguous for junior developers.
- **Brevity**: Limit the PRD to 800-1200 words to ensure clarity.
- **Formatting**: Use valid Markdown. Do not use horizontal rules.
- **Draft Status**: Clearly label the status as [Draft/Planning/Approved].
