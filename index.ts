import init, { Converter, createConverter, InitInput } from "../pkg/svg2webp";
import { ConverterOptions, ConvertOptions, Svg2webp } from "./types";

let initialized = false;

/**
 * Initialize WASM module
 * @param mod WebAssembly Module or WASM url
 */
export const initialize = async (
  mod: Promise<InitInput> | InitInput
): Promise<void> => {
  if (initialized) {
    throw new Error(
      "Already initialized. The `initialize` function can be used only once."
    );
  }
  await init(await mod);
  initialized = true;
};

/**
 * @param opts Converter options (e.g. font settings)
 * @returns svg2webp converter
 */
export const createSvg2webp = (opts?: ConverterOptions): Svg2webp => {
  if (!initialized)
    throw new Error(
      "WASM has not been initialized. Call `initialize` function."
    );
  let converter: Converter | undefined;
  converter = createConverter(
    opts?.defaultFontFamily?.serifFamily,
    opts?.defaultFontFamily?.sansSerifFamily,
    opts?.defaultFontFamily?.cursiveFamily,
    opts?.defaultFontFamily?.fantasyFamily,
    opts?.defaultFontFamily?.monospaceFamily
  );
  for (const font of opts?.fonts ?? []) {
    converter.registerFont(font);
  }

  const svg2webp = (svg: string, options?: ConvertOptions) =>
    new Promise<Uint8Array>((resolve, reject) => {
      try {
        const result = converter?.convert_to_webp(
          svg,
          options?.scale,
          options?.width,
          options?.height,
          options?.backgroundColor
        );
        if (result) resolve(result);
        else throw new Error("Converter already disposed.");
      } catch (e) {
        if (e instanceof Error) reject(e);
        else reject(new Error(`${e}`));
      }
    });

  svg2webp.dispose = () => {
    converter?.free();
    converter = undefined;
  };
  svg2webp.getLoadedFontFamilies = () => converter?.list_fonts() ?? [];

  return svg2webp;
};

/**
 * @param opts Converter options (e.g. font settings)
 * @returns svg2webp converter
 */
export const createSvg2jpeg = (opts?: ConverterOptions): Svg2webp => {
  if (!initialized)
    throw new Error(
      "WASM has not been initialized. Call `initialize` function."
    );
  let converter: Converter | undefined;
  converter = createConverter(
    opts?.defaultFontFamily?.serifFamily,
    opts?.defaultFontFamily?.sansSerifFamily,
    opts?.defaultFontFamily?.cursiveFamily,
    opts?.defaultFontFamily?.fantasyFamily,
    opts?.defaultFontFamily?.monospaceFamily
  );
  for (const font of opts?.fonts ?? []) {
    converter.registerFont(font);
  }

  const svg2jpeg = (svg: string, options?: ConvertOptions) =>
    new Promise<Uint8Array>((resolve, reject) => {
      try {
        const result = converter?.convert_to_jpeg(
          svg,
          options?.scale,
          options?.width,
          options?.height,
          options?.backgroundColor
        );
        if (result) resolve(result);
        else throw new Error("Converter already disposed.");
      } catch (e) {
        if (e instanceof Error) reject(e);
        else reject(new Error(`${e}`));
      }
    });

  svg2jpeg.dispose = () => {
    converter?.free();
    converter = undefined;
  };
  svg2jpeg.getLoadedFontFamilies = () => converter?.list_fonts() ?? [];

  return svg2jpeg;
};

export const svg2webp = (
  svg: string,
  opts?: ConverterOptions & ConvertOptions
): Promise<Uint8Array> => {
  const convert = createSvg2webp(opts);
  return convert(svg, opts).finally(() => convert.dispose());
};

export const svg2jpeg = (
  svg: string,
  opts?: ConverterOptions & ConvertOptions
): Promise<Uint8Array> => {
  const convert = createSvg2jpeg(opts);
  return convert(svg, opts).finally(() => convert.dispose());
};

// types re-export
export { ConverterOptions, ConvertOptions, Svg2webp };
