# repo-checks

**リポジトリ全体の整合性を機械的に検査します。** [CONSTITUTION.md](../../CONSTITUTION.md) の「6. 1つの決まりの正本は1つのファイルに置く」が求める「一致を機械的に検査する仕組み」がこれです。

**この検査は、リポジトリを保守する人が使います。** 勉強会の参加者が自分の業務を残したり push したりするのに、この検査も Node.js も必要ありません（[docs/github-account-and-push.md](../../docs/github-account-and-push.md)）。

## 🚀 実行

| 項目 | 内容 |
| --- | --- |
| 実行環境 | Windows / macOS / Linux |
| 必要なランタイム | Node.js 18 以上（`node:test` と `node --test` を使うため） |
| 依存パッケージ | **なし。** `npm install` は不要 |
| 入力 | リポジトリ内の `.md` ファイルと [lib/duplicates.mjs](./lib/duplicates.mjs) の登録一覧 |
| 出力 | 標準出力の検査結果。**ファイルは書き換えません** |
| 環境変数 | なし |

```powershell
cd tools/repo-checks
npm test
```

CIは [.github/workflows/repo-checks.yml](../../.github/workflows/repo-checks.yml) が、すべてのPRと `main` への push で回します。**対象がリポジトリ全体なので、`paths` でファイルを絞っていません。**

## 何を検査するか

| 検査 | 落ちるとき |
| --- | --- |
| **参照の解決**（[test/markdown-links.test.mjs](./test/markdown-links.test.mjs)） | Markdownの相対リンクが、存在しないパスや存在しない見出しを指している |
| **複製の一致**（[test/mirrors.test.mjs](./test/mirrors.test.mjs)） | [lib/duplicates.mjs](./lib/duplicates.mjs) に登録した複製が、実際には一致していない |

**`{...}` を含むリンクは検査しません。** プレースホルダーの扱いは [CONSTITUTION.md](../../CONSTITUTION.md) の「5. 特定のPCでしか動かない状態を作らない」にあります。

## 複製してよい対象は [lib/duplicates.mjs](./lib/duplicates.mjs) にある

**どこを複製しているかの記録は、このファイルが唯一の場所です。** 原則6がそう定めています。ここに無い複製は原則6の違反として扱います。

**検査はこの一覧を読んで回ります。** 一覧へ追加すれば検査も増え、消せば検査も消えます。**一覧と検査が食い違うことがない形にしてあります。**

追加するときは、`reason` に**「なぜ参照にできないか」**を書いてください。**「揃えるのが楽だから」は理由になりません。**

**いまこのリポジトリでは登録がありません。** 原則6の「検査を置けないなら、複製しない」により、**登録が無い間は決まりの複製そのものが許可されていません。** 重複を見つけたら、登録するのではなく正本を1つ決めて残りを参照へ置き換えます。

## アンカーの判定について

**GitHubが見出しからアンカーを作る規則を推定して照合しています。** 実装を公開仕様として持っているわけではないため、実在するリンクで検証して決めた近似です。

**落ちない文字が見つかった場合は、[lib/markdown-links.mjs](./lib/markdown-links.mjs) の `DROPPED_IN_ANCHOR` に足してください。** 実例は [test/markdown-links.test.mjs](./test/markdown-links.test.mjs) の「見出しからアンカーを作る規則が、このリポジトリの実例と一致する」に追加します。

**見出しの絵文字は `EMOJI_IN_ANCHOR` で別に落としています。** 落とすのが最後の `trim` のあとなのは、絵文字の直後の空白を残してハイフンにするためです。`## 🚀 Foo` のアンカーは `-foo` になります。

## 🚧 未確認事項

- **`headingToAnchor` はGitHubの実装そのものではありません。** 同じ見出しが2つあるときにGitHubが付ける連番（`-1`、`-2`）には対応していません。現在このリポジトリにその形のリンクはありません
- **`─`（罫線素片）を落とす扱いは、GitHubの実挙動で確認していません。** このリポジトリの見出しに `──` が出てくるため、`—` や `–` と同じ扱いに揃えました。**現在この見出しを指すリンクは無いので、どちらでも結果は変わりません**
- **絵文字を落として直後の空白をハイフンにする扱いは、GitHubの実挙動で確認していません。** `docs/readme-authoring-rules.md` のテンプレートが絵文字見出しを使うため、その形に合わせています
- **HTMLの `<a name>` やアンカー拡張は見ていません。** 対象はMarkdownの見出しだけです
- **角括弧やスペースを含むリンクは収集されません。** `![X](<C:\Users\Some Name\...>)` のような形は検査を通り抜けます

## 既知の未登録の重複

次の重複が残っています。**登録済みではありません。** 正本を決めて参照へ置き換える対象です。箇所数は実測値です。

| 重複している決まり | 箇所 | 正本の候補 |
| --- | --- | --- |
| ローカル実行用スクリプトを同梱しない | 5ファイル6箇所 | [docs/requirements.md](../../docs/requirements.md) |
| `AGENTS.md` が人格の正本である | 3ファイル5箇所 | [CONSTITUTION.md](../../CONSTITUTION.md) |
| PowerPoint で仕上げたあとは pptx が正本 | 4ファイル4箇所 | [make-my-slides/SKILL.md](../../.agents/skills/make-my-slides/SKILL.md) |
| `tools/` の役割 | 3ファイル3箇所 | [tools/README.md](../README.md) |
| PARA の役割の1行説明 | 2ファイル（逐語一致） | [organization-patterns.md](../../docs/second-brain/references/organization-patterns.md) |
