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
