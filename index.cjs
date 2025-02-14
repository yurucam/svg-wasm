/**
 * @file This library uses [resvg](https://github.com/RazrFalcon/resvg), which is licensed unser MPL-2.0. The source code for resvg can be found [here](https://github.com/RazrFalcon/resvg).
 */
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  createSvg2jpeg: () => createSvg2jpeg,
  createSvg2webp: () => createSvg2webp,
  initialize: () => initialize,
  svg2jpeg: () => svg2jpeg,
  svg2webp: () => svg2webp
});
module.exports = __toCommonJS(lib_exports);

// pkg/svg2webp.js
var wasm;
var cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
if (typeof TextDecoder !== "undefined") {
  cachedTextDecoder.decode();
}
var cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
var WASM_VECTOR_LEN = 0;
function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1, 1) >>> 0;
  getUint8ArrayMemory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
var cachedTextEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder("utf-8") : { encode: () => {
  throw Error("TextEncoder not available");
} };
var encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function(arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8ArrayMemory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127)
      break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
function isLikeNone(x) {
  return x === void 0 || x === null;
}
function takeFromExternrefTable0(idx) {
  const value = wasm.__wbindgen_export_0.get(idx);
  wasm.__externref_table_dealloc(idx);
  return value;
}
function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
var cachedDataViewMemory0 = null;
function getDataViewMemory0() {
  if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}
function getArrayJsValueFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  const mem = getDataViewMemory0();
  const result = [];
  for (let i = ptr; i < ptr + 4 * len; i += 4) {
    result.push(wasm.__wbindgen_export_0.get(mem.getUint32(i, true)));
  }
  wasm.__externref_drop_slice(ptr, len);
  return result;
}
function createConverter(default_serif_family, default_sans_serif_family, default_cursive_family, default_fantasy_family, default_monospace_family) {
  var ptr0 = isLikeNone(default_serif_family) ? 0 : passStringToWasm0(default_serif_family, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = isLikeNone(default_sans_serif_family) ? 0 : passStringToWasm0(default_sans_serif_family, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len1 = WASM_VECTOR_LEN;
  var ptr2 = isLikeNone(default_cursive_family) ? 0 : passStringToWasm0(default_cursive_family, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len2 = WASM_VECTOR_LEN;
  var ptr3 = isLikeNone(default_fantasy_family) ? 0 : passStringToWasm0(default_fantasy_family, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len3 = WASM_VECTOR_LEN;
  var ptr4 = isLikeNone(default_monospace_family) ? 0 : passStringToWasm0(default_monospace_family, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len4 = WASM_VECTOR_LEN;
  const ret = wasm.createConverter(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
  return Converter.__wrap(ret);
}
var ConverterFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_converter_free(ptr >>> 0, 1));
var Converter = class _Converter {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_Converter.prototype);
    obj.__wbg_ptr = ptr;
    ConverterFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ConverterFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_converter_free(ptr, 0);
  }
  /**
   * @param {Uint8Array} font
   */
  registerFont(font) {
    const ptr0 = passArray8ToWasm0(font, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.converter_registerFont(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {string} svg
   * @param {number | null} [scale]
   * @param {number | null} [width]
   * @param {number | null} [height]
   * @param {string | null} [background]
   * @returns {Uint8Array}
   */
  convert_to_webp(svg, scale, width, height, background) {
    const ptr0 = passStringToWasm0(svg, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(background) ? 0 : passStringToWasm0(background, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.converter_convert_to_webp(this.__wbg_ptr, ptr0, len0, isLikeNone(scale) ? 4294967297 : Math.fround(scale), isLikeNone(width) ? 4294967297 : Math.fround(width), isLikeNone(height) ? 4294967297 : Math.fround(height), ptr1, len1);
    if (ret[3]) {
      throw takeFromExternrefTable0(ret[2]);
    }
    var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v3;
  }
  /**
   * @param {string} svg
   * @param {number | null} [scale]
   * @param {number | null} [width]
   * @param {number | null} [height]
   * @param {string | null} [background]
   * @returns {Uint8Array}
   */
  convert_to_jpeg(svg, scale, width, height, background) {
    const ptr0 = passStringToWasm0(svg, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(background) ? 0 : passStringToWasm0(background, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.converter_convert_to_jpeg(this.__wbg_ptr, ptr0, len0, isLikeNone(scale) ? 4294967297 : Math.fround(scale), isLikeNone(width) ? 4294967297 : Math.fround(width), isLikeNone(height) ? 4294967297 : Math.fround(height), ptr1, len1);
    if (ret[3]) {
      throw takeFromExternrefTable0(ret[2]);
    }
    var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v3;
  }
  /**
   * @returns {any[]}
   */
  list_fonts() {
    const ret = wasm.converter_list_fonts(this.__wbg_ptr);
    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
};
async function __wbg_load(module2, imports) {
  if (typeof Response === "function" && module2 instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module2, imports);
      } catch (e) {
        if (module2.headers.get("Content-Type") != "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module2.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module2, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module: module2 };
    } else {
      return instance;
    }
  }
}
function __wbg_get_imports() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbindgen_init_externref_table = function() {
    const table = wasm.__wbindgen_export_0;
    const offset = table.grow(4);
    table.set(0, void 0);
    table.set(offset + 0, void 0);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
  };
  imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
  };
  imports.wbg.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  return imports;
}
function __wbg_init_memory(imports, memory) {
}
function __wbg_finalize_init(instance, module2) {
  wasm = instance.exports;
  __wbg_init.__wbindgen_wasm_module = module2;
  cachedDataViewMemory0 = null;
  cachedUint8ArrayMemory0 = null;
  wasm.__wbindgen_start();
  return wasm;
}
async function __wbg_init(module_or_path) {
  if (wasm !== void 0)
    return wasm;
  if (typeof module_or_path !== "undefined") {
    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
      ({ module_or_path } = module_or_path);
    } else {
      console.warn("using deprecated parameters for the initialization function; pass a single object instead");
    }
  }
  if (typeof module_or_path === "undefined") {
    module_or_path = new URL("svg2webp_bg.wasm", void 0);
  }
  const imports = __wbg_get_imports();
  if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
    module_or_path = fetch(module_or_path);
  }
  __wbg_init_memory(imports);
  const { instance, module: module2 } = await __wbg_load(await module_or_path, imports);
  return __wbg_finalize_init(instance, module2);
}
var svg2webp_default = __wbg_init;

// lib/index.ts
var initialized = false;
var initialize = async (mod) => {
  if (initialized) {
    throw new Error(
      "Already initialized. The `initialize` function can be used only once."
    );
  }
  await svg2webp_default(await mod);
  initialized = true;
};
var createSvg2webp = (opts) => {
  if (!initialized)
    throw new Error(
      "WASM has not been initialized. Call `initialize` function."
    );
  let converter;
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
  const svg2webp2 = (svg, options) => new Promise((resolve, reject) => {
    try {
      const result = converter?.convert_to_webp(
        svg,
        options?.scale,
        options?.width,
        options?.height,
        options?.backgroundColor
      );
      if (result)
        resolve(result);
      else
        throw new Error("Converter already disposed.");
    } catch (e) {
      if (e instanceof Error)
        reject(e);
      else
        reject(new Error(`${e}`));
    }
  });
  svg2webp2.dispose = () => {
    converter?.free();
    converter = void 0;
  };
  svg2webp2.getLoadedFontFamilies = () => converter?.list_fonts() ?? [];
  return svg2webp2;
};
var createSvg2jpeg = (opts) => {
  if (!initialized)
    throw new Error(
      "WASM has not been initialized. Call `initialize` function."
    );
  let converter;
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
  const svg2jpeg2 = (svg, options) => new Promise((resolve, reject) => {
    try {
      const result = converter?.convert_to_jpeg(
        svg,
        options?.scale,
        options?.width,
        options?.height,
        options?.backgroundColor
      );
      if (result)
        resolve(result);
      else
        throw new Error("Converter already disposed.");
    } catch (e) {
      if (e instanceof Error)
        reject(e);
      else
        reject(new Error(`${e}`));
    }
  });
  svg2jpeg2.dispose = () => {
    converter?.free();
    converter = void 0;
  };
  svg2jpeg2.getLoadedFontFamilies = () => converter?.list_fonts() ?? [];
  return svg2jpeg2;
};
var svg2webp = (svg, opts) => {
  const convert = createSvg2webp(opts);
  return convert(svg, opts).finally(() => convert.dispose());
};
var svg2jpeg = (svg, opts) => {
  const convert = createSvg2jpeg(opts);
  return convert(svg, opts).finally(() => convert.dispose());
};
