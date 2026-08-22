// Markdown内のリンクを取り出し、参照先が実在するかを判定する材料を作る。

// GitHubが見出しからアンカーを作るときに落とす文字。
// GitHubの実装を網羅したものではなく、実在するリンクで検証して決めた近似である。
// 落ちない文字が見つかったら足す。足したら test 側に実例も追加する。
const DROPPED_IN_ANCHOR =
  /[`*_~()[\]{}「」『』（）【】、。,.:;：；!?！？"'"'／/\|<>#@$%^&+=→⇔・—–─〜~]/g;

/**
 * 見出しの文字列から、GitHubが作るアンカーを推定する。
 *
 * 備考: 空白は1つずつハイフンへ変える。まとめて1つにしてはいけない。
 * GitHubは `Cloud Run — 現行` を `cloud-run--現行`（ハイフン2つ）にする。
 * `—` を落としたあと、前後の空白がそれぞれハイフンになるため。
 *
 * @param {string} heading `#`を除いた見出し本文
 * @returns {string} アンカー（先頭の`#`は含まない）
 */
export function headingToAnchor(heading) {
  return heading
    .trim()
    .toLowerCase()
    .replace(DROPPED_IN_ANCHOR, "")
    .trim()
    .replace(/\s/g, "-");
}

/**
 * 行がコードフェンスの開始・終了かを返す。
 *
 * @param {string} line 1行
 * @returns {boolean} フェンス行ならtrue
 */
function isFenceLine(line) {
  return /^\s*(```|~~~)/.test(line);
}

/**
 * Markdown本文から見出しを取り出す。コードフェンス内の`#`は見出しとして扱わない。
 *
 * @param {string} text Markdown本文
 * @returns {string[]} 見出し本文の一覧
 */
export function collectHeadings(text) {
  const headings = [];
  let inFence = false;
  for (const raw of text.split("\n")) {
    const line = raw.replace(/\r$/, "");
    if (isFenceLine(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) {
      continue;
    }
    const match = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (match) {
      headings.push(match[2]);
    }
  }
  return headings;
}

/**
 * Markdown本文から、リポジトリ内を指す相対リンクを取り出す。
 * 外部URL、`mailto:`などのスキーム付きリンクは対象外とする。
 *
 * @param {string} text Markdown本文
 * @returns {{target: string, anchor: string, raw: string, line: number}[]} リンク一覧
 */
export function collectRelativeLinks(text) {
  const links = [];
  let inFence = false;
  const lines = text.split("\n");
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].replace(/\r$/, "");
    if (isFenceLine(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) {
      continue;
    }
    for (const match of line.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
      const href = match[1];
      if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//")) {
        continue;
      }
      // `{...}` を含むリンクは、各自が手元で置き換えるプレースホルダー。
      // 絶対パスはコミットできないため、正本にはプレースホルダーだけを置いている。
      if (href.includes("{")) {
        continue;
      }
      const hashIndex = href.indexOf("#");
      const target = hashIndex < 0 ? href : href.slice(0, hashIndex);
      const anchor = hashIndex < 0 ? "" : href.slice(hashIndex + 1);
      links.push({
        target: decodeURIComponent(target),
        anchor: decodeURIComponent(anchor),
        raw: href,
        line: index + 1,
      });
    }
  }
  return links;
}
