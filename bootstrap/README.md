# bootstrap

`bootstrap/` は、**何かを始めるときに必要な初期環境のセットアップ方法や、セットアップを実行する Skill を置く場所**です。

ソフトウェアの導入、初期設定、必要なデータの取得など、作業を始める前に必要な準備を対象とします。

## 🗂️ ディレクトリ構成

```text
bootstrap/
├── windows-first-time-setup/    Windows PC の初期環境をセットアップする
└── nodejs-setup/                Node.js を導入する
```

### `windows-first-time-setup/`

Windows PCで`hands-on-benkyokai`を始めるための初期環境セットアップを担当します。

詳細な使い方は[`README.md`](windows-first-time-setup/README.md)を参照してください。

### `nodejs-setup/`

`tools/repo-checks`や`tools/marp`を使う人向けに、Node.jsの導入手順を担当します。勉強会参加者の多くには不要です。

詳細な使い方は[`README.md`](nodejs-setup/README.md)を参照してください。
