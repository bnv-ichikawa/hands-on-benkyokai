# second-brain

`second-brain/` は、**業務知識そのものを置く場所**です。仕事で得た知識、判断、作業記録を、あとから自分と AI が文脈を取り戻して再利用できる形で残します。

**このディレクトリには知識そのものだけを置きます。** 考え方の説明は [`../docs/second-brain/`](../docs/second-brain/README.md)、AIへの作業指示は [`../.agents/skills/`](../.agents/skills/) にあります。

## 管理するもの

- 進行中のプロジェクトに関する前提、判断、作業記録
- 継続的に維持したい仕事の責任領域
- 記事、本、動画、調査などから得た再利用可能な知識
- 会議や打ち合わせの議事録、要点、決定事項、次のアクション
- 完了したプロジェクトや現在は使わない資料

## 🗂️ ディレクトリ構成

```text
second-brain/
├── inbox/        未整理のメモや入力を一時的に置く
├── projects/     期限、成果物、完了条件がある作業を置く
├── areas/        継続的に維持・改善する責任領域を置く
├── resources/    将来参照する知識や資料を置く
└── archives/     完了、停止、または現在は使わない情報を置く
```

`projects` / `areas` / `resources` / `archives` は、PARA という整理方法にもとづく区分です。PARA の考え方は [整理パターン: PARA, Zettelkasten, MOC](../docs/second-brain/references/organization-patterns.md) にあります。

## 📏 共通ルール

- **どこに置くかの判断基準は、各ディレクトリの `README.md` が正本。** 迷ったら `inbox/` に残し、何が決まれば動かせるかを書く
- `README.md` はそのディレクトリの入口・目次であり、ナレッジ本体を書く場所ではない
- 分類の決め方は [Second Brain を始めるときに決めること](../docs/second-brain/getting-started.md) にある

Second Brain は記憶を置き換えるものではありません。未来の自分や AI が過去の文脈を理解し、次の行動や成果物につなげるための外部記憶として育てていきます。
