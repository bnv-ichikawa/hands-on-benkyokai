# marp

Markdown で書いた Marp 資料を、PDF または PowerPoint に変換するためのツールです。

## 何をするツールか

Marp 形式の `.md` ファイルを、Marp CLI で次の形式へ変換します。

- `.pdf`
- `.pptx`

`-InputPath` には、単一の `.md` ファイルか、`.md` ファイルを含むディレクトリを指定できます。ディレクトリを指定した場合、直下（サブディレクトリは対象外）にある `.md` ファイルをすべて変換します。

## 実行環境

- Windows PowerShell
- Node.js 18 以上
- Google Chrome、Microsoft Edge、Mozilla Firefox のどれか1つ

PDF / PPTX 変換では、Marp CLI がブラウザを使ってスライドを描画します。

## セットアップ

Node.js の入れ方は [docs/requirements.md](../../docs/requirements.md) を読んでください。

このツール自体は、リポジトリに依存パッケージを固定インストールしません。Marp CLI 自体のインストールも不要です。実行時に `npx.cmd --yes @marp-team/marp-cli@latest` を呼び出します。

テーマ CSS から `docs/lectures/assets/` のロゴや背景画像を読むため、変換時には Marp CLI の `--allow-local-files` を付けています。

## 使い方

リポジトリルートで実行します。

```powershell
.\tools\marp\Convert-MarpDeck.ps1 -InputPath .\docs\lectures\templates\lecture-template.md -Format pdf
```

PowerPoint に変換する場合。

```powershell
.\tools\marp\Convert-MarpDeck.ps1 -InputPath .\docs\lectures\templates\lecture-template.md -Format pptx
```

両方作る場合。

```powershell
.\tools\marp\Convert-MarpDeck.ps1 -InputPath .\docs\lectures\templates\lecture-template.md -Format both
```

ディレクトリを指定して、直下の `.md` ファイルをまとめて変換する場合。

```powershell
.\tools\marp\Convert-MarpDeck.ps1 -InputPath .\docs\lectures -Format pdf
```

## 入力と出力

入力は Marp 形式の Markdown ファイル、またはそれを含むディレクトリです。

単一ファイルを指定し、出力先を指定しない場合、`outputs/` に同じ名前で出力します。

```text
docs/lectures/01-overview.md
  -> outputs/01-overview.pdf
  -> outputs/01-overview.pptx
```

単一ファイルで出力先を指定する場合。

```powershell
.\tools\marp\Convert-MarpDeck.ps1 -InputPath .\docs\lectures\01-overview.md -Format pdf -OutputPath .\outputs\intro-codex.pdf
```

`-Format both` のときに単一ファイルの `-OutputPath` を指定する場合は、拡張子なしのベースパスを指定します。

```powershell
.\tools\marp\Convert-MarpDeck.ps1 -InputPath .\docs\lectures\01-overview.md -Format both -OutputPath .\outputs\intro-codex
```

ディレクトリを指定した場合、`-OutputPath` は出力先ディレクトリとして扱われます（ファイルごとの拡張子なしパスとしては扱いません）。指定しない場合は既定の `outputs/` に、入力ファイルと同じ名前で出力します。

```text
docs/lectures/
  ├── 01-overview.md
  └── 02-deep-dive.md

  -> outputs/01-overview.pdf
  -> outputs/02-deep-dive.pdf
```

## テーマ

既定では、次のテーマディレクトリを読み込みます。

```text
docs/lectures/themes/
```

Markdown 側で次のように指定します。

```md
---
marp: true
theme: bnv-lecture
paginate: true
---
```

別のテーマを使う場合は、`-ThemeSetPath` を指定できます。

## 副作用

- `outputs/` に PDF または PPTX を作成します
- 既に同名ファイルがある場合、Marp CLI の挙動に従って上書きされる可能性があります
- 初回実行時に、`npx` が Marp CLI をダウンロードすることがあります

## 動作確認

```powershell
.\tools\marp\Convert-MarpDeck.ps1 -InputPath .\docs\lectures\templates\lecture-template.md -Format pdf
```

`outputs/lecture-template.pdf` が作成されれば成功です。
