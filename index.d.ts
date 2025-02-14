export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;
export type DefaultFontFamily = {
	serifFamily?: string;
	sansSerifFamily?: string;
	cursiveFamily?: string;
	fantasyFamily?: string;
	monospaceFamily?: string;
};
export type ConverterOptions = {
	fonts?: Uint8Array[];
	defaultFontFamily?: DefaultFontFamily;
};
export type ConvertOptions = {
	scale?: number;
	width?: number;
	height?: number;
	backgroundColor?: string;
};
export type Svg2webp = ((svg: string, options?: ConvertOptions) => Promise<Uint8Array>) & {
	getLoadedFontFamilies: () => string[];
	dispose: () => void;
};
/**
 * Initialize WASM module
 * @param mod WebAssembly Module or WASM url
 */
export declare const initialize: (mod: Promise<InitInput> | InitInput) => Promise<void>;
/**
 * @param opts Converter options (e.g. font settings)
 * @returns svg2webp converter
 */
export declare const createSvg2webp: (opts?: ConverterOptions) => Svg2webp;
/**
 * @param opts Converter options (e.g. font settings)
 * @returns svg2webp converter
 */
export declare const createSvg2jpeg: (opts?: ConverterOptions) => Svg2webp;
export declare const svg2webp: (svg: string, opts?: ConverterOptions & ConvertOptions) => Promise<Uint8Array>;
export declare const svg2jpeg: (svg: string, opts?: ConverterOptions & ConvertOptions) => Promise<Uint8Array>;

export {};
