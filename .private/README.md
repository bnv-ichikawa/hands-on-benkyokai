# .private

**個人的な情報の置き場です。AIは読み書きします。**

用途ごとにフォルダを分けます。

| フォルダ | 置くもの |
| --- | --- |
| [`ai-characters/`](ai-characters/README.md) | AIに与える人格（キャラクター）の定義 |
| [`my-profile/`](my-profile/README.md) | 自分のプロフィールや役割 |

**このファイルは `.private/` の Git での扱いの正本です。** 他のファイルからはここを参照します（[CONSTITUTION.md](../CONSTITUTION.md) の「1. 正本と案内を分ける」）。

## Git での扱い

**このテンプレートでは、`.private/` の中身を Git 管理しています。** キャラクター定義とプロフィールの雛形を、リポジトリを配ったときに一緒に渡すためです。

`.gitignore` には `.private/` の記述が残っています。これは**新しく追加したファイルにだけ効きます。**

| 対象 | 追跡されるか |
| --- | --- |
| テンプレートとして最初から入っているファイル | **される**（すでに追跡済み） |
| あなたが新しく作ったファイル | されない（`.gitignore` が効く） |

**`.gitignore` は未追跡のファイルにしか効きません。** すでに追跡されているファイルは、`.gitignore` に書いてあっても追跡され続けます（[CONSTITUTION.md](../CONSTITUTION.md) の「4. 認証情報と個人情報をリポジトリに入れない」）。

## 自分の情報を書く前にやること

`my-profile/me.md` のように**最初から入っているファイル**へ自分の情報を書くときは、どちらかを選びます。

### A. このリポジトリを clone して使っている場合

書く前に、そのファイルを追跡対象から外します。

```powershell
git update-index --skip-worktree .private/my-profile/me.md
```

これで、そのファイルへの編集は `git status` に出なくなり、コミットされません。

**この設定は各自のPCだけに残り、push されません。** clone した人の手元では設定されていないので、**各自が自分で実行する必要があります。** 実行せずに書くと、`git add .` で公開リポジトリに載ります。

設定されているかの確認。`S` が付いていれば有効です。

```powershell
git ls-files -v .private
```

意図的にテンプレート側を更新したいときは、いったん解除します。

```powershell
git update-index --no-skip-worktree .private/my-profile/me.md
```

### B. 自分のリポジトリを `git init` から作る場合

[docs/github-account-and-push.md](../docs/github-account-and-push.md) の手順では `.private` を `git add` しません。この場合 `.private/` は最初から未追跡なので、`.gitignore` がそのまま効き、追加の操作は不要です。

## 書かないこと

- パスワード、APIキー、アクセストークン
- 顧客や同僚の個人情報

**AIには渡ります。** 手元から漏れて困るものは書かないでください。
