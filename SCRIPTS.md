# Project Scripts & Tooling Notes

### TypeScript Compilation & Bundling

- **Building for Production:** `npm run build` clears out old artifacts and compiles your TypeScript explicitly using your configuration.
    ```json
    "build": "rm -rf dist && tsc -p tsconfig.json"
    ```
- **Explicit Execution:** The `-p` flag explicitly points `tsc` to look for your `tsconfig.json`.

### Direct TypeScript Execution via `tsx`

- **Direct Execution:** In environments where a separate pre-bundled artifact isn't required, `tsx` handles TypeScript execution directly on the fly.
    ```json
    "start": "tsx src/app.ts"
    ```
- **Alternatives:** If you choose to switch to a strict compiled workflow, `start` can alternatively map to executing your compiled JavaScript bundle via `node dist/app.js`.
