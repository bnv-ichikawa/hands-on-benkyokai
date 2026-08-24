# Second Brain の解説

このディレクトリは、Second Brain の考え方と、このテンプレートの設計・運用に関する説明資料を置く場所です。知識庫の本体は、リポジトリのルートにある [`second-brain/`](../second-brain/README.md) です。

`README.md` は、この `docs/` 配下の入口です。MOC、つまり関連ノートへの地図としても使います。

## まず読む

- [何をするのに何が必要か](requirements.md) ── 必要なソフトウェアの正本
- [Windows PC の準備](setup-windows.md) ── PowerPoint 方式でスライドを書き出せるか確認する
- [GitHub アカウントを作成して自分のリポジトリに push する](github-account-and-push.md)
- [Second Brain を始めるときに決めること](getting-started.md)
- [Second Brain とは何か](second-brain.md)
- [Second Brain の時系列と進化](references/second-brain-history.md)
- [整理パターン: PARA, Zettelkasten, MOC](references/organization-patterns.md)

## ディレクトリの役割

| パス | 役割 |
| --- | --- |
| `docs/` | Second Brain の概要や、このテンプレートでの設計方針を置く |
| `docs/references/` | 背景知識、用語説明、参考文献、補足資料を置く |

## 整理方針

このテンプレートでは、次の考え方を組み合わせます。

| 考え方 | 使い方 |
| --- | --- |
| PARA | ファイルや情報をどこに置くかを決める |
| Zettelkasten | Markdown 内のリンクで、関連するノート同士をつなげる |
| README / MOC | どこから読めばよいか、どこに何があるかを案内する |

## AI エージェント向けの示唆

参考にした動画では、AI Second Brain で重要なのは「AI がどこを見ればよいか分かること」だと説明されています。

そのため、人間向けの入口は `README.md`、AI エージェント向けのルーティングは将来的に `AGENTS.md` に分けると扱いやすくなります。

## 常に従う固定ルール

次の文書は、必要に応じて選ぶ資料ではなく、このリポジトリでの作業に常に適用する固定ルールです。

- [readme-authoring-rules.md](readme-authoring-rules.md) — `README.md` の記述ルール
- [requirements.md](requirements.md) — 必要なソフトウェア
- [../CONSTITUTION.md](../CONSTITUTION.md) — リポジトリ全体にかかる決まり
