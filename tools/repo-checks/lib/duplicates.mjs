// 複製してよい対象の登録一覧。
//
// CONSTITUTION の原則6は「同じ決まりを複数のファイルへ書かない」と定め、
// 参照にできない構造的な理由がある場合だけ複製を認めている。
// **どこを複製しているかの記録は、このファイルを唯一の場所とする。**
// ここに無い複製は、原則6の違反として扱う。
//
// 追加するときは `reason` に「なぜ参照にできないか」を書くこと。
// 「揃えるのが楽だから」は理由にならない。

/**
 * @typedef {object} AllowedDuplicate
 * @property {string} name 人が読む名前
 * @property {"tree"|"file-pair"} kind ディレクトリ丸ごとか、2ファイルの対か
 * @property {string} from 比較元（リポジトリルートからの相対パス）
 * @property {string} to 比較先（リポジトリルートからの相対パス）
 * @property {number} skipLines 先頭から一致を求めない行数
 * @property {string} reason 参照にできない構造的な理由
 */

/**
 * このリポジトリでは、いま登録が無い。
 *
 * 空であることは意図した状態である。CONSTITUTION の原則6は
 * 「検査を置けないなら、複製しない」と定めているため、登録が無い間は
 * 決まりの複製そのものが許可されていない。重複を見つけたら、ここへ登録するのではなく
 * 正本を1つ決めて残りを参照へ置き換える。
 *
 * 参考までに、複製が構造的に避けられなくなる典型は次の形である。
 * このリポジトリは Codex 用の `.agents/skills/` だけを持ち、`.claude/` には設定しか
 * 置いていないため、いまはどれも当てはまらない。
 *
 * - スキル定義を Claude 用（`.claude/skills/`）と Codex 用（`.agents/skills/`）の両方に置く場合。
 *   片方を参照にすると、もう一方の環境でスキルが見つからない
 * - 挙動定義を `CLAUDE.md` と `AGENTS.md` の両方に置く場合。読むファイルがツールごとに違う
 *
 * @type {AllowedDuplicate[]}
 */
export const ALLOWED_DUPLICATES = [];
