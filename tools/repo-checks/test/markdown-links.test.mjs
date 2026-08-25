// Markdown内の相対リンクが、実在するファイル・ディレクトリ・見出しを指していることを検証する。
// 参照で重複を避ける方針（CONSTITUTION 原則6）は、参照が切れていないことが前提になる。
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { listFiles, repositoryRoot } from "../lib/repo-files.mjs";
import { collectHeadings, collectRelativeLinks, headingToAnchor } from "../lib/markdown-links.mjs";

const ROOT = repositoryRoot();

// 収集が壊れたことに気づくための下限。現状は150件で、下限はそれより余裕を持たせている。
const MINIMUM_LINKS = 100;

test("Markdownの相対リンクは、実在するパスと見出しを指す", async () => {
  const files = await listFiles(ROOT, (relative) => relative.endsWith(".md"));
  assert.ok(files.length > 0, "Markdownが見つかりません。この検査が空振りしています");

  const anchorCache = new Map();
  /**
   * 対象ファイルのアンカー一覧を返す。同じファイルを何度も読まないようにする。
   *
   * @param {string} absolutePath 対象ファイルの絶対パス
   * @returns {Promise<Set<string>>} アンカーの集合
   */
  const anchorsOf = async (absolutePath) => {
    if (!anchorCache.has(absolutePath)) {
      const text = await readFile(absolutePath, "utf8");
      anchorCache.set(absolutePath, new Set(collectHeadings(text).map(headingToAnchor)));
    }
    return anchorCache.get(absolutePath);
  };

  const broken = [];
  let checked = 0;
  for (const relative of files) {
    const absolute = path.join(ROOT, relative);
    const text = await readFile(absolute, "utf8");
    for (const link of collectRelativeLinks(text)) {
      checked += 1;
      const targetAbsolute = link.target === ""
        ? absolute
        : path.resolve(path.dirname(absolute), link.target);
      let stats;
      try {
        stats = await stat(targetAbsolute);
      } catch {
        broken.push(`${relative}:${link.line} パスが無い -> ${link.raw}`);
        continue;
      }
      if (stats.isDirectory() || !link.anchor) {
        continue;
      }
      if (!(await anchorsOf(targetAbsolute)).has(headingToAnchor(link.anchor))) {
        broken.push(`${relative}:${link.line} 見出しが無い -> ${link.raw}`);
      }
    }
  }
  assert.ok(
    checked > MINIMUM_LINKS,
    `検査したリンクが${checked}件しかありません。収集が壊れています`,
  );
  assert.deepEqual(broken, []);
});

test("見出しからアンカーを作る規則が、このリポジトリの実例と一致する", () => {
  // このリポジトリに実在する見出しから採った実例。
  // ここが崩れると、上の検査がリンク切れを見逃す側へ倒れる。
  const cases = [
    // `──` は落ち、前後の空白がそれぞれハイフンになるのでハイフンが2つ並ぶ
    ["STEP 1. 目的と分量を決める ── ゲート A", "step-1-目的と分量を決める--ゲート-a"],
    ["事実・判断・提案を混ぜない", "事実判断提案を混ぜない"],
    ["STEP 3. 完成品と「推測で埋めた箇所」を渡す", "step-3-完成品と推測で埋めた箇所を渡す"],
    ["進め方: たたき台型", "進め方-たたき台型"],
    ["1. 最初のメッセージで4つ聞く", "1-最初のメッセージで4つ聞く"],
    // 絵文字は落ちるが直後の空白は残るので、アンカーの先頭がハイフンになる
    ["🚀 自分の情報を書く前にやること", "-自分の情報を書く前にやること"],
    // 異体字セレクタ付きの絵文字も落ちる
    ["🗂️ ディレクトリ構成", "-ディレクトリ構成"],
  ];
  for (const [heading, expected] of cases) {
    assert.equal(headingToAnchor(heading), expected, `見出し: ${heading}`);
  }
});

test("コードフェンスの中の`#`は見出しとして数えない", () => {
  const text = [
    "# 本物の見出し",
    "",
    "```markdown",
    "# 例として書いた見出し",
    "```",
    "",
    "## もう1つの本物",
  ].join("\n");
  assert.deepEqual(collectHeadings(text), ["本物の見出し", "もう1つの本物"]);
});

test("コードフェンスの中のリンクと、外部URLは収集しない", () => {
  const text = [
    "[中](./a.md) と [外](https://example.invalid/b.md) と [メール](mailto:x@example.invalid)",
    "",
    "```bash",
    "echo '[フェンスの中](./b.md)'",
    "```",
  ].join("\n");
  assert.deepEqual(
    collectRelativeLinks(text).map((link) => link.raw),
    ["./a.md"],
  );
});

test("画像の相対リンクも収集する", () => {
  const text = [
    "![ドラえもん](../../assets/characters/ドラえもん-icon.png)",
    "![ギャル子](../../assets/characters/ギャル子-icon.png)",
    "[実在する参照](./a.md)",
  ].join("\n");
  assert.deepEqual(
    collectRelativeLinks(text).map((link) => link.raw),
    [
      "../../assets/characters/ドラえもん-icon.png",
      "../../assets/characters/ギャル子-icon.png",
      "./a.md",
    ],
  );
});
