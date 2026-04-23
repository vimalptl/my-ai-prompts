---
name: republic-react-project
description: "Use when: creating or scaffolding a baseline React 18 project in this workspace using Webpack 5, PrimeReact, React Router v6, Axios, React Hook Form, shared layouts, environment-specific services, utils, and global styles. Ignore Vue migration tasks and focus only on baseline project setup"
---

# Republic React Project

## Purpose

Use this skill when the user wants to create or refresh a baseline React 18 application for this repository.

This skill is only for baseline setup. 

This skill must be self-contained. Do not depend on runtime access to files outside this skill directory when scaffolding a new project.
## Scope

Always ask for the project name or target folder before doing any setup work.
Do not assume any existing folder unless the user explicitly names it.
Confirm whether the target folder already exists or whether a new folder should be created, and scaffold the baseline React application only in that confirmed location.
The baseline must include:

- React 18 with Webpack 5
- PrimeReact with PrimeIcons and global style setup
- React Router v6 application shell and starter routing
- Axios-based service layer
- Development and production service configuration files
- Root-level `verify-services.js` script for service-file verification
- Shared utility file
- Baseline layouts and reusable shell components
- React Hook Form baseline integration for forms
- Do not use react-script for project scaffolding; set up Webpack 5 for bundling and development server support.


## Non-Goals

Do not do any of the following unless the user explicitly asks for them:

-TBD

## Required Inputs

If the user does not provide details, do not proceed.

Project name or target folder is a required input. Ask for it every time before taking action.

If a required choice is unclear, ask only the minimum necessary question.

## Required Dependencies

Use these dependencies unless the repository already has an equivalent approved package:

- `react`
- `react-dom`
- `react-router-dom`
- `axios`
- `react-hook-form`
- `primereact`
- `primeicons`

Use Webpack 5 and related loaders/plugins required for:

- JavaScript transpilation
- HTML entry generation
- CSS and SCSS handling
- Asset loading
- Development server support

Webpack configuration must follow the reference behavior defined by this skill's bundled templates:

- log the active webpack mode during build
- log which service file is being used for the build
- alias `services/services.admin` to the correct file based on mode
- verify the expected service file exists before compile fails later
- keep the service-switching behavior explicit and visible in build output

Use the bundled template files in this skill folder as the starting point for these conventions.

Package scripts should also follow the bundled template conventions when practical:

- `start` runs webpack dev server in development mode
- `build` runs webpack in production mode
- `build:dev` runs webpack in development mode
- `verify:services` runs `node verify-services.js`
- `verify:prod` runs production verification for the selected service file

## Baseline Folder Structure

Use or align to this structure:

```text
<project-name>/
  verify-services.js
  public/
    index.html
  src/
    components/
      layout/
      common/
    hooks/
    pages/
    services/
      services.admin.js
      services.admin.dev.js
      api.js
      index.js
    styles/
      main.scss
      _variables.scss
      _layout.scss
    utils/
      utils.js
    App.js
    index.js
```

Do not add folders that are not needed for a clean baseline.

## Implementation Rules

1. Use React 18 functional components only.
2. Use JavaScript, not TypeScript.
3. Use named exports for shared components and utilities. Use default exports only for page components when it improves route readability.
4. Use React Router v6 for routing.
5. Prefer a data-router-ready structure, but keep the baseline simple if loaders are not yet needed.
6. Set up a reusable top-level layout so future pages can plug into a consistent shell.
7. Use PrimeReact components for visible UI elements when suitable.
8. Set up a centralized Axios instance in `src/services/api.js`.
9. Keep development and production endpoint configuration separate using `src/services/services.admin.dev.js` and `src/services/services.admin.js`.
10. Webpack must resolve a stable import such as `services/services.admin` to the correct environment-specific file.
11. Add a root-level `verify-services.js` script that reports the selected service file, verifies both files exist, and exits non-zero on invalid configuration.
12. Make the active environment configuration obvious in build or startup output.
13. Add a shared `src/utils/utils.js` file for cross-cutting helper functions.
14. Add a baseline loading component or page-state helper for future API screens.
15. Configure PrimeReact theme and global style imports in the application entry path.
16. Include React Hook Form in the baseline with at least one simple reusable pattern or starter form page.
17. Preserve existing repository style where files already exist; otherwise keep the implementation minimal and readable.

## Webpack And Service Convention

New React projects created with this skill must follow the same service-selection behavior defined by this skill's bundled templates.

The implementation source for this behavior must come from the bundled template files in this skill directory.

## Bundled Template Assets

This skill includes local scaffold assets under `template/`.

Use these files as the baseline source when creating a new project:

- `template/webpack.config.js`
- `template/verify-services.js`
- `template/public/index.html`
- `template/src/App.js`
- `template/src/index.js`
- `template/src/components/AppNavigation.js`
- `template/src/pages/MyPolicies.js`
- `template/src/pages/MyPolicies.css`
- `template/src/services/api.js`
- `template/src/services/index.js`
- `template/src/services/services.admin.dev.js`
- `template/src/services/services.admin.js`
- `template/src/styles/main.scss`
- `template/src/utils/utils.js`

These files are examples and should be adapted to the user-confirmed project name, folder structure, and package setup.

### webpack.config.js

The generated `webpack.config.js` should:

- detect development versus production mode from webpack arguments
- print the selected mode to the console
- print the selected service file to the console
- create an alias for `services/services.admin` that points to:
  - `src/services/services.admin.dev.js` in development
  - `src/services/services.admin.js` in production
- use a compile-time verification hook that fails early if the expected service file does not exist

### verify-services.js

The generated root-level `verify-services.js` should:

- determine the effective environment from `NODE_ENV`
- identify the selected service file for that environment
- print the current environment, selected file name, and full path
- verify that both service files exist
- verify that the selected file exists
- exit with a failing status if verification does not pass

### package.json scripts

The generated `package.json` should include scripts that support the same workflow as the bundled templates, including:

- `start`
- `build`
- `build:dev`
- `verify:services`
- `verify:prod`

### src/services folder

The generated `src/services` folder should follow this pattern:

- `services.admin.dev.js` contains hard-coded development URLs, development token setup, request logging, and a visible PrimeReact request indicator
- `services.admin.js` contains production relative URLs, cookie-based auth setup, no-cache behavior, and a visible PrimeReact request indicator
- `index.js` provides the preferred import surface for app code when appropriate
- if the project uses direct alias imports, the code should import from `services/services.admin` so webpack can switch files by mode
- sample exported methods should follow the same style as the existing project, such as `CurrentUser`, `GetMyPolicies`, `AddPhUser`, `EditPhUser`, and `ResetPhPassword`

The skill should preserve this convention in all newly scaffolded React projects so service switching behaves the same way across projects.

## Baseline Deliverables

Create or verify these baseline pieces:

### 1. App Entry

- `src/index.js`
- React root initialization
- router mounting
- PrimeReact and global style imports
- include a working starter route setup from the bundled templates

### 2. App Shell

- `src/App.js`
- top-level router or layout composition
- placeholder routes for home and not-found states
- include a navigation link to a working `MyPolicies` sample route

### 3. Layout Components

Create a minimal but reusable layout system such as:

- app shell layout
- page container
- header area
- content area
- loading overlay or busy state component

These do not need final product styling. They should provide a clean structure for future feature pages.

### 4. Services Layer

Create:

- `src/services/api.js` for the Axios instance and interceptors
- `src/services/services.admin.dev.js` for development endpoints
- `src/services/services.admin.js` for production endpoints
- `src/services/index.js` to expose the active service configuration and shared API helpers
- `verify-services.js` at the project root to validate environment-specific service selection

Start from the sample service files bundled in `template/src/services/`.

Service expectations:

- use one import surface for consumers
- centralize base request behavior
- keep environment selection explicit and easy to trace
- avoid embedding business-specific migration code
- align webpack alias and verification behavior to the bundled templates in this skill
- include representative hard-coded local development URLs in the dev sample
- include direct Axios default header setup and request/response interceptors
- include sample PrimeReact loading indicator behavior during requests

### 5. Utilities

Create `src/utils/utils.js` with a few safe, general-purpose helpers only, such as formatting, empty-state guards, or environment checks.

### 6. Styling

Create a baseline PrimeReact styling setup with:

- theme import
- PrimeIcons import
- global SCSS entry
- layout variables for spacing, colors, and shell sizing
- page-level sample styling for `MyPolicies.css`

Keep the styling neutral and production-ready enough for internal admin tooling.

### 7. Forms Baseline

Provide a minimal example of React Hook Form integration so future forms share a consistent pattern.

Acceptable examples:

- a starter settings form page
- a search form shell
- a reusable input wrapper pattern

### 8. Routed Sample Page

Create a working sample page using the bundled templates:

- `src/pages/MyPolicies.js`
- `src/pages/MyPolicies.css`

This sample should be routable from the application navigation and should keep the app functional even when live services are unavailable by showing fallback sample data.

### 9. Verification

When asked to perform the setup, finish by:

- installing dependencies
- running `node verify-services.js`
- running the development build or server
- validating that the app renders without compile errors

## Execution Workflow

When using this skill, follow this order:

1. Ask the user for the project name or target folder.
2. Confirm whether that folder already exists or must be created.
3. Inspect the confirmed target folder to avoid replacing useful existing work.
4. Install or verify baseline dependencies.
5. Scaffold the baseline from the bundled files in this skill's `template/` folder.
6. Configure Webpack 5 for development and production builds, including service-file aliasing and compile-time service verification.
7. Create `verify-services.js` from the bundled template and adapt it to the target project.
8. Set up PrimeReact, global styles, and the application entry point.
9. Create the app shell, starter routes, and layout components.
10. Create the centralized service layer with dev and production sample service files.
11. Add the utilities file.
12. Add a small React Hook Form example or reusable form primitive.
13. Run service verification, then run the development server or build to verify the baseline.
14. Summarize what was created and note any intentionally deferred migration work.

## Output Expectations

When completing a baseline setup task with this skill:

- clearly state that only baseline scaffolding was created
- call out the environment service setup
- call out the webpack service alias and `verify-services.js` behavior
- mention any placeholders added for future pages
- explicitly note that migration work was intentionally excluded

## Guardrails

- Do not create a new workspace unless the user explicitly requests it.
- Do not start implementation until the user has provided and confirmed the project name or target folder.
- Do not rely on copying files from outside this skill directory at execution time; use the bundled templates in this skill directory.
- Do not use Create React App.
- Do not introduce TypeScript unless the user explicitly requests it.
- Do not overbuild state management; prefer React built-in primitives.
- Do not add feature-specific API wrappers unless needed for the baseline.
- Do not claim feature parity with the Vue app.
- Do not silently skip dependency installation or validation when the user asked for actual setup.
