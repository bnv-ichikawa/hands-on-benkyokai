# lectures

`docs/lectures/` は、AI勉強会で見ながら話すための Marp Markdown 資料を置く場所です。

## 🗂️ ディレクトリ構成

```text
lectures/
├── 01-chatgpt-codex-connect.md   第1回 ChatGPT・Codexの仕様を知る／Connectで社内情報を調べる
├── 02-repository-skill.md        第2回 Repository・Skillを知る
├── 03-file-formats.md            第3回 ファイル形式の基本を学ぶ
├── 04-repository-rules-second-brain.md   第4回 良いRepositoryを作るための掟を学ぶ／Second Brainについて学ぶ
├── 05-git-github.md              第5回 Git / GitHubを学ぶ
├── 06-ai-pc-work.md              第6回（最終回） AIにPC作業を任せる／自分専用の助手を作る
├── pdf/                          各回を変換したPDF（Git管理）
├── themes/                       このディレクトリ専用のMarpテーマ（bnv-lecture）
├── assets/                       テーマ用のオリジナルイラスト（SVG）・図解
└── templates/                    新しい回を作るときの下書き
```

各回は1テーマ1ファイルです。まとめて話す資料であっても、回をまたいで1つのファイルに詰め込みません。

## 🎨 テーマ

`themes/bnv-lecture.css` は、この勉強会専用に描き起こしたテーマです。青いロボット型キャラクターの世界観をイメージしていますが、**公式のキャラクター画像は使っていません。** キャラクターは `assets/characters/` に置いたオリジナルのSVGイラストです。

新しいスライドを作るときは、`templates/lecture-template.md` をコピーして使います。

## 🚀 PDF / PowerPointに変換する

変換には [`tools/marp`](../../tools/marp/README.md) を使います。

```powershell
.\tools\marp\Convert-MarpDeck.ps1 -InputPath .\docs\lectures\01-chatgpt-codex-connect.md -Format pdf
```

ディレクトリごとまとめて変換する場合。

```powershell
.\tools\marp\Convert-MarpDeck.ps1 -InputPath .\docs\lectures -Format pdf
```

出力は既定で `outputs/`（Git管理外）に作られます。`docs/lectures/pdf/` に置いてあるPDFは、各回をその場で開いて確認できるように、変換結果をこのディレクトリへコピーしてコミットしたものです。資料の内容を変更したら、PDFも作り直してここへ反映します。

## 📏 資料を書くときの共通ルール

- 1ファイル1テーマ。カリキュラムの項目をまたいで1つのファイルにまとめない
- 各回は「タイトル」→「今回のゴール」→「目次」→「本編（章ごとに区切りスライドを挟む）」→「次回予告（最終回のみ締めの挨拶）」の流れにする
- キャラクターのイラストは `assets/characters/` にあるものだけを使う。新しく描き起こす場合も、公式キャラクターの画像は使わない
- 表データや設定例など、コードブロックとして書ける内容は `pre` の見た目で統一する
