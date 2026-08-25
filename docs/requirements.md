# 何をするのに何が必要か

**このファイルは、必要なソフトウェアの正本です。** 他のファイルからはここを参照します（[CONSTITUTION.md](../CONSTITUTION.md) の「1. 正本と案内を分ける」）。

**やることによって必要なものが変わります。** 全部そろえる必要はありません。

| したいこと | 必要なもの | 入れなくてよいもの |
| --- | --- | --- |
| PC を初回セットアップする（Git 導入と clone） | Windows、PowerShell、WinGet | Node.js / GitHub CLI |
| AIと会話して、業務を知識庫に残す | Codex デスクトップアプリ | Git / GitHub CLI / Node.js |
| スライドを仕上げる、PDF にする | Microsoft PowerPoint | Node.js / PowerShell スクリプト |
| GitHub に自分のリポジトリを作って push する | Git、GitHub CLI（`gh`） | **Node.js** |
| リポジトリの整合性検査を回す | Node.js 18 以上 | 依存パッケージ（`npm install` は不要） |

**勉強会の参加者に必要なのは、上の4行までです。** 5行目はこのテンプレートを保守する人の作業です。

初回セットアップの手順は [初回セットアップ](../bootstrap/README.md) にあります。

## なぜ Node.js が要る場面と要らない場面があるのか

**Node.js は JavaScript のプログラムを動かすためのものです。** GitHub への push は Git と `gh` が行うので、**push のために Node.js は要りません。**

必要になるのは [`tools/repo-checks`](../tools/repo-checks/README.md) だけです。これはリポジトリ全体の整合性（参照が切れていないか、複製がずれていないか）を機械的に検査するもので、**自分の業務を残したり push したりする作業には関係しません。**

## 同梱していないもの

- **ローカル実行用の PowerShell スクリプト。** `.pptx` は PowerPoint か、利用可能なプレゼンテーション作成機能で作ります
- **Python。** このリポジトリでは使いません

## 個別の手順

| 手順 | 内容 |
| --- | --- |
| [github-account-and-push.md](github-account-and-push.md) | GitHub アカウント作成と push |
| [../bootstrap/nodejs-setup/README.md](../bootstrap/nodejs-setup/README.md) | Node.js の導入方法 |
| [../tools/repo-checks/README.md](../tools/repo-checks/README.md) | 整合性検査の実行方法 |
