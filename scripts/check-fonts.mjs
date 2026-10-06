#!/usr/bin/env node
// フォントの一元管理ガード。
// フォント名は src/styles/global.css の --font-* 定義だけに書き、
// 読み込みは SimpleLayout.astro の Google Fonts <link> 1箇所だけにする。
// それ以外で次のどれかを書くと失敗する:
//   1) フォント名の直書き（'Press Start 2P' / DotGothic16 / BIZ UDPGothic / VT323 など）
//   2) font-family に var(--font-*) / inherit 以外の値
//   3) fonts.googleapis.com の読み込み
//   4) themeConfig.ts の FONT_OPTIONS の id に対応する --font-en-<id> / --font-jp-<id> が無い
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

const OPTIONS_FILE = 'src/config/themeConfig.ts'; // 切り替え候補の id 一覧

const FONT_DEF_LINE = /^\s*--font-[a-z0-9-]+\s*:/;
// font-family / fontFamily の値。var(--font-*) か inherit だけを許す
const FONT_FAMILY_DECL = /font-?family\s*:\s*([^;`}\n]+)/gi;
const ALLOWED_VALUE = /^(var\(--font-[a-z0-9-]+\)|inherit)(\s*!important)?\s*$/;

// 禁止するフォント名 = global.css に定義した書体名すべて ＋ よくあるシステムフォント。
// 書体を足せば自動で対象になる（一覧を2箇所に持たない）
const escapeRe = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const definitionLines = readFileSync(join(ROOT, DEFINITION_FILE), 'utf8').split('\n').filter((l) => FONT_DEF_LINE.test(l));
const definedNames = [...new Set(definitionLines.flatMap((l) => [...l.matchAll(/'([^']+)'/g)].map((m) => m[1])))];
const SYSTEM_FONTS = ['Courier New', 'MS Gothic', 'Times New Roman', 'Arial', 'Helvetica', 'Meiryo', 'Hiragino'];
// Google Fonts の URL 表記（Press+Start+2P）も拾う
const FONT_NAME = new RegExp([...definedNames, ...SYSTEM_FONTS].map((n) => escapeRe(n).replace(/ /g, '[ +]')).join('|'));
const definedVars = new Set(definitionLines.map((l) => l.trim().split(':')[0]));

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

// FONT_OPTIONS の各 id に対応する書体変数があるか
const optionsSrc = readFileSync(join(ROOT, OPTIONS_FILE), 'utf8');
const optionsBlock = optionsSrc.slice(optionsSrc.indexOf('export const FONT_OPTIONS'), optionsSrc.indexOf('} as const;', optionsSrc.indexOf('export const FONT_OPTIONS')));
for (const kind of ['en', 'jp']) {
  const kindBlock = optionsBlock.match(new RegExp(`\\b${kind}:\\s*\\{([\\s\\S]*?)\\]\\s*,?\\s*\\}`))?.[1] ?? '';
  const ids = [...kindBlock.matchAll(/id:\s*'([^']+)'/g)].map((m) => m[1]);
  const def = kindBlock.match(/default:\s*'([^']+)'/)?.[1];
  if (!ids.length) errors.push(`${OPTIONS_FILE} FONT_OPTIONS.${kind} の選択肢が読み取れない`);
  for (const id of ids) {
    if (!definedVars.has(`--font-${kind}-${id}`)) errors.push(`${OPTIONS_FILE} FONT_OPTIONS.${kind} の '${id}' に対応する --font-${kind}-${id} が ${DEFINITION_FILE} に無い`);
  }
  if (!def || !ids.includes(def)) errors.push(`${OPTIONS_FILE} FONT_OPTIONS.${kind}.default '${def}' が選択肢に無い`);
}

if (loaderCount !== 1) errors.push(`${LOADER_FILE} の Google Fonts 読み込みが ${loaderCount} 箇所（1箇所であるべき）`);

if (errors.length) {
  console.error(`check-fonts: ${errors.length} 件の違反\n` + errors.map((e) => '  ' + e).join('\n'));
  process.exit(1);
}
console.log('check-fonts: OK');
