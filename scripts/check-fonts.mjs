#!/usr/bin/env node
// フォントの一元管理ガード。
// フォント名は src/styles/global.css の --font-* 定義だけに書き、
// 読み込みは SimpleLayout.astro の Google Fonts <link> 1箇所だけにする。
// それ以外で次のどれかを書くと失敗する:
//   1) フォント名の直書き（'Press Start 2P' / DotGothic16 / BIZ UDPGothic / VT323 など）
//   2) font-family に var(--font-*) / inherit 以外の値
//   3) fonts.googleapis.com の読み込み
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'src');
const EXTS = ['.astro', '.ts', '.tsx', '.js', '.mjs', '.css', '.vue'];

// 除外リスト（理由つき）
const EXCLUDED_DIRS = [
  'src/pages/unused', // 配信していない旧ページ置き場（CLAUDE.md「実装対象ページ限定ルール」）
];
const DEFINITION_FILE = 'src/styles/global.css'; // フォント名を書いてよい唯一のファイル（:root の --font-* 定義行のみ）
const LOADER_FILE = 'src/layouts/SimpleLayout.astro'; // Google Fonts を読み込む唯一のファイル

const FONT_NAME = /Press[ +]Start[ +]2P|DotGothic16|BIZ[ +]UDPGothic|VT323|Courier New|MS Gothic|Times New Roman/;
// font-family / fontFamily の値。var(--font-*) か inherit だけを許す
const FONT_FAMILY_DECL = /font-?family\s*:\s*([^;`}\n]+)/gi;
const ALLOWED_VALUE = /^(var\(--font-[a-z-]+\)|inherit)(\s*!important)?\s*$/;
const FONT_DEF_LINE = /^\s*--font-[a-z-]+\s*:/;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const rel = relative(ROOT, p).split(sep).join('/');
    if (EXCLUDED_DIRS.some((d) => rel === d || rel.startsWith(d + '/'))) continue;
    if (statSync(p).isDirectory()) walk(p, out);
    else if (EXTS.some((e) => name.endsWith(e))) out.push(rel);
  }
  return out;
}

const errors = [];
let loaderCount = 0;

for (const rel of walk(SRC)) {
  const lines = readFileSync(join(ROOT, rel), 'utf8').split('\n');
  lines.forEach((line, i) => {
    const at = `${rel}:${i + 1}`;
    const isDefinition = rel === DEFINITION_FILE && FONT_DEF_LINE.test(line);

    if (line.includes('fonts.googleapis.com/css')) {
      if (rel === LOADER_FILE) loaderCount++;
      else errors.push(`${at} Google Fonts の読み込みは ${LOADER_FILE} の1箇所だけにする`);
      return;
    }
    if (FONT_NAME.test(line) && !isDefinition) {
      errors.push(`${at} フォント名の直書き → var(--font-pixel) / var(--font-pixel-jp) 等を使う: ${line.trim()}`);
    }
    if (isDefinition) return;
    for (const m of line.matchAll(FONT_FAMILY_DECL)) {
      // style="..." 属性内では " が値の終わり。値が " で始まるとき（"Font Name"）は丸ごと見る
      const raw = m[1].trim();
      const value = raw.startsWith('"') ? raw : raw.split('"')[0].trim();
      if (value.startsWith('${') || value.startsWith("'${")) continue; // ${FONTS.xxx}（themeConfig 経由で var を参照）
      if (!ALLOWED_VALUE.test(value)) {
        errors.push(`${at} font-family は var(--font-*) か inherit だけ: ${value}`);
      }
    }
  });
}

if (loaderCount !== 1) errors.push(`${LOADER_FILE} の Google Fonts 読み込みが ${loaderCount} 箇所（1箇所であるべき）`);

if (errors.length) {
  console.error(`check-fonts: ${errors.length} 件の違反\n` + errors.map((e) => '  ' + e).join('\n'));
  process.exit(1);
}
console.log('check-fonts: OK');
