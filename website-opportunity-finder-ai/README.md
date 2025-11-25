## Website Opportunity Finder AI – Build Plan Site

This repository hosts a static implementation of the **Website Opportunity Finder AI** architecture and delivery blueprint. The site renders a detailed execution plan covering acquisition strategy, scoring rubric, data models, runtime orchestration, and roadmap required to deliver the agent.

### Project Structure

- `site/` – authoring source for the static site (HTML, CSS, JS).
- `scripts/` – lightweight Node.js utilities for build, local preview, and validation.
- `dist/` – generated output after running `npm run build` (ignored until build).
- `public/`, `src/` – residual placeholders kept for potential future Next.js port.

### Commands

```bash
npm install       # optional (no external dependencies)
npm run build     # copies site/ into dist/
npm run test      # validates the generated artifacts
npm run dev       # serve site/ with live reload-friendly static server
npm start         # serve dist/ (after build)
```

### Deployment

The project is static and deploys cleanly to Vercel using the `dist/` directory produced by the build step. Use the included deployment script or run `vercel deploy --prod` from the repository root once build/tests pass.
