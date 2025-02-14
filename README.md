# svg-wasm

🎚️ A WASM-powered library for converting SVG images to WebP and JPEG formats.

Install:

```sh
npm i svg-wasm
```

Usage:

```typescript
(async () => {
  if (!SvgWasm.initialized) {
    await SvgWasm.initialize(fetch('https://unpkg.com/svg-wasm/svg_wasm_bg.wasm'));
  }

  const svg = `<svg>...</svg>`;
  
  await SvgWasm.svg2jpeg(svg); // Uint8Array
  await SvgWasm.svg2webp(svg); // Uint8Array
})()
```
