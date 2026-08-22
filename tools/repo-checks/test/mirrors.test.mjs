// 登録一覧にある複製が、実際に一致していることを検証する。
// CONSTITUTION の原則6が求める「一致を機械的に検査する仕組み」。
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { ALLOWED_DUPLICATES } from "../lib/duplicates.mjs";
import { exists, listFiles, repositoryRoot } from "../lib/repo-files.mjs";

const ROOT = repositoryRoot();

/**
 * 改行を LF へ揃える。
 *
 * 備考: 揃えないとこの検査は Windows でだけ落ちる。手元は CRLF、CI（ubuntu）は
 * LF でチェックアウトされるため。ここで見たいのは中身の一致で、改行の種類ではない。
 *
 * @param {string} text 比較する文字列
 * @returns {string} LFへ揃えた文字列
 */
function normalizeNewlines(text) {
  return text.split("\r\n").join("\n");
}

/**
 * 先頭の指定行数を除いた本文を返す。
 *
 * @param {string} text 対象の文字列
 * @param {number} skipLines 除く行数
 * @returns {string} 比較する本文
 */
function comparableBody(text, skipLines) {
  return normalizeNewlines(text).split("\n").slice(skipLines).join("\n");
}

test("登録一覧の各行に、種別と理由が書かれている", () => {
  // このリポジトリでは登録が空である。それは意図した状態で、
  // CONSTITUTION の「検査を置けないなら、複製しない」により、
  // 登録が無い間は決まりの複製そのものが許可されていない。
  // よって「空でないこと」は検査しない。登録が入ったときに形だけを見る。
  for (const duplicate of ALLOWED_DUPLICATES) {
    assert.ok(duplicate.reason.trim(), `${duplicate.name} に理由が書かれていない`);
    assert.ok(["tree", "file-pair"].includes(duplicate.kind), `${duplicate.name} のkindが不正`);
    assert.ok(duplicate.from.trim(), `${duplicate.name} に from が無い`);
    assert.ok(duplicate.to.trim(), `${duplicate.name} に to が無い`);
    assert.ok(Number.isInteger(duplicate.skipLines), `${duplicate.name} の skipLines が整数でない`);
  }
});

for (const duplicate of ALLOWED_DUPLICATES.filter((item) => item.kind === "tree")) {
  test(`${duplicate.name}: \`${duplicate.from}/\` と \`${duplicate.to}/\` の中身が一字一句同じ`, async () => {
    const files = await listFiles(path.join(ROOT, duplicate.from));
    assert.ok(
      files.length > 0,
      `${duplicate.from}/ にファイルが見つかりません。この検査が空振りしています`,
    );
    const differences = [];
    for (const relative of files) {
      const counterpart = path.join(ROOT, duplicate.to, relative);
      if (!await exists(counterpart)) {
        differences.push(`${duplicate.to}/${relative} が存在しない`);
        continue;
      }
      const [left, right] = await Promise.all([
        readFile(path.join(ROOT, duplicate.from, relative), "utf8"),
        readFile(counterpart, "utf8"),
      ]);
      if (normalizeNewlines(left) !== normalizeNewlines(right)) {
        differences.push(`${duplicate.from}/${relative} と ${duplicate.to}/${relative} が違う`);
      }
    }
    assert.deepEqual(differences, [], duplicate.reason);
  });

  test(`${duplicate.name}: \`${duplicate.to}/\` にしか無いスキルが無い`, async () => {
    const skills = await listFiles(
      path.join(ROOT, duplicate.to, "skills"),
      (relative) => relative.endsWith("/SKILL.md"),
    );
    assert.ok(skills.length > 0, `${duplicate.to}/skills/ にSKILL.mdが見つかりません`);
    const missing = [];
    for (const relative of skills) {
      if (!await exists(path.join(ROOT, duplicate.from, "skills", relative))) {
        missing.push(`${duplicate.from}/skills/${relative}`);
      }
    }
    assert.deepEqual(
      missing, [],
      "スキルを片側だけへ追加すると、もう一方の環境で使えない",
    );
  });
}

for (const duplicate of ALLOWED_DUPLICATES.filter((item) => item.kind === "file-pair")) {
  test(`${duplicate.name}: \`${duplicate.from}\` と \`${duplicate.to}\` が先頭${duplicate.skipLines}行を除いて同じ`, async () => {
    const [left, right] = await Promise.all([
      readFile(path.join(ROOT, duplicate.from), "utf8"),
      readFile(path.join(ROOT, duplicate.to), "utf8"),
    ]);
    assert.equal(
      comparableBody(left, duplicate.skipLines),
      comparableBody(right, duplicate.skipLines),
      duplicate.reason,
    );
    if (duplicate.skipLines > 0) {
      // 除いた行は意図的に違う。同じになっていたら、どちらかを取り違えている。
      assert.notEqual(
        normalizeNewlines(left).split("\n").slice(0, duplicate.skipLines).join("\n"),
        normalizeNewlines(right).split("\n").slice(0, duplicate.skipLines).join("\n"),
      );
    }
  });
}
