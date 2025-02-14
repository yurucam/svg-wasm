import init, { Converter, createConverter, InitInput } from "../pkg/svg_wasm";
import { ConverterOptions, ConvertOptions } from "./types";

export default class SvgWasm {
  public static initialized = false;

  public static async initialize(
    mod: Promise<InitInput> | InitInput
  ): Promise<void> {
    if (this.initialized) {
      throw new Error(
        "Already initialized. The `initialize` function can be used only once."
      );
    }
    await init(await mod);
    this.initialized = true;
  }

  private static async createConverter(
    opts?: ConverterOptions
  ): Promise<Converter> {
    if (!this.initialized) {
      throw new Error(
        "WASM has not been initialized. Call `initialize` function."
      );
    }

    const converter = createConverter(
      opts?.defaultFontFamily?.serifFamily,
      opts?.defaultFontFamily?.sansSerifFamily,
      opts?.defaultFontFamily?.cursiveFamily,
      opts?.defaultFontFamily?.fantasyFamily,
      opts?.defaultFontFamily?.monospaceFamily
    );

    for (const font of opts?.fonts ?? []) {
      converter.registerFont(font);
    }

    return converter;
  }

  static async svg2webp(
    svg: string,
    opts?: ConverterOptions & ConvertOptions
  ): Promise<Uint8Array> {
    const converter = await this.createConverter(opts);

    try {
      return converter.convert_to_webp(
        svg,
        opts?.scale,
        opts?.width,
        opts?.height,
        opts?.backgroundColor
      );
    } catch (e) {
      throw e;
    } finally {
      converter.free();
    }
  }

  static async svg2jpeg(
    svg: string,
    opts?: ConverterOptions & ConvertOptions
  ): Promise<Uint8Array> {
    const converter = await this.createConverter(opts);

    try {
      return converter.convert_to_jpeg(
        svg,
        opts?.scale,
        opts?.width,
        opts?.height,
        opts?.backgroundColor
      );
    } catch (e) {
      throw e;
    } finally {
      converter.free();
    }
  }
}
