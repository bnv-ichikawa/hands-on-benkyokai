// リポジトリ内のファイルを列挙する。git を呼ばずに歩くので、CIでもローカルでも同じ結果になる。

import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 検査対象から外すディレクトリ。
// `.sandbox` はレビュー結果の保存先で `.gitignore` 済み。`node_modules` は外部由来。
const SKIP_DIRECTORIES = new Set([".git", "node_modules", ".sandbox", ".venv", "dist", "build"]);

/**
 * リポジトリルートを返す。このファイルの位置から2階層上が `tools/repo-checks` の親になる。
 *
 * @returns {string} リポジトリルートの絶対パス
 */
export function repositoryRoot() {
  // 備考: `fileURLToPath`を使うこと。`new URL(...).pathname`のままだと、
  // 日本語やスペースを含むパスがパーセントエンコードされたまま返る。
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
}

/**
 * ルート配下のファイルを再帰的に列挙する。
 *
 * @param {string} root 起点ディレクトリ
 * @param {(relativePath: string) => boolean} [accept] 採用するかを返す判定
 * @returns {Promise<string[]>} rootからの相対パス（区切りは`/`）
 */
export async function listFiles(root, accept = () => true) {
  const found = [];
  const walk = async (directory) => {
    let entries;
    try {
      entries = await readdir(directory, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (SKIP_DIRECTORIES.has(entry.name)) {
          continue;
        }
        await walk(path.join(directory, entry.name));
        continue;
      }
      if (!entry.isFile()) {
        continue;
      }
      const relative = path.relative(root, path.join(directory, entry.name)).split(path.sep).join("/");
      if (accept(relative)) {
        found.push(relative);
      }
    }
  };
  await walk(root);
  return found.sort();
}

/**
 * パスが存在するかを返す。
 *
 * @param {string} absolutePath 絶対パス
 * @returns {Promise<boolean>} 存在すればtrue
 */
export async function exists(absolutePath) {
  try {
    await stat(absolutePath);
    return true;
  } catch {
    return false;
  }
}
