# 初回セットアップ

このディレクトリは、**まだ Git もリポジトリも用意されていない Windows PC を最初の1回だけ準備するための手順**を置く場所です。

通常の作業で使う `.agents/skills/` とは分けています。リポジトリを clone した後の Git 操作は、Codex の標準機能を使います。

## Windows の初回セットアップ

[`windows-first-time-setup/`](windows-first-time-setup/SKILL.md) を使います。

この手順が担当するのは次だけです。

1. Windows / PowerShell の確認
2. Git の有無確認
3. Git がなければ Git for Windows を WinGet でインストール
4. PATH の反映と `git --version` の確認
5. `bnv-ichikawa/hands-on-benkyokai` を Desktop に clone
6. clone 後に `.private/my-profile/me.md` を読む
7. Git の `user.name` / `user.email` が未設定なら、プロフィールの値を使う
8. プロフィールにも値がなければ、その項目だけユーザーに確認する
9. clone と Git 設定を検証する

## この手順でやらないこと

- GitHub 認証設定
- branch / commit / push / PR など通常の Git 操作
- リポジトリ内のコード実行
- `.private/my-profile/me.md` への個人情報の書き込み
- 既存フォルダの削除や上書き

初回セットアップが終わったら、この手順は原則として再利用しません。
