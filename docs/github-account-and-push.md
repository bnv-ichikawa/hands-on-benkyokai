# GitHub アカウントを作成して自分のリポジトリに push する

この研修では、自分の作業フォルダを Git で管理し、自分の GitHub アカウントのリポジトリへ push します。

## 必要なもの

必要なソフトウェアは [何をするのに何が必要か](requirements.md) にあります。

## 1. GitHub アカウントを作る

1. https://github.com/ を開く
2. `Sign up` からアカウントを作成する
3. メール認証を完了する
4. ユーザー名を控えておく

ユーザー名は、あとでリポジトリ URL に使われます。

```text
https://github.com/<自分のユーザー名>/<リポジトリ名>
```

## 2. Git をインストールする

[初回セットアップ](../bootstrap/README.md) の手順で行います。

## 3. GitHub CLI をインストールする

GitHub CLI は `gh` というコマンドで使います。

```powershell
winget install --id GitHub.cli --source winget
```

インストール後、PowerShell またはターミナルを開き直して確認します。

```powershell
gh --version
```

バージョンが表示されれば OK です。

WinGet が使えない場合は、公式の Windows インストール手順を使います。

https://github.com/cli/cli/blob/trunk/docs/install_windows.md

## 4. GitHub にログインする

次のコマンドを実行します。

```powershell
gh auth login -h github.com -w
```

途中で聞かれたら、次のように選びます。

| 質問 | 選ぶもの |
| --- | --- |
| What is your preferred protocol for Git operations? | `HTTPS` |
| Authenticate Git with your GitHub credentials? | `Yes` |

ワンタイムコードが表示されたら、ブラウザで GitHub にログインしてコードを入力します。

ログインできたか確認します。

```powershell
gh auth status
```

## 5. Git の名前とメールアドレスを設定する

[初回セットアップ](../bootstrap/README.md) の手順で行います。

**コミットに使うメールアドレスは、公開リポジトリでは誰でも見られます。** 公開したくない場合は、GitHub の no-reply メールアドレスを使います。

## 6. リポジトリに入れてはいけないものを確認する

push する前に、`.gitignore` を確認します。

この研修では、個人的な情報を入れる `.private/` を**自分のリポジトリには載せません。** 下の手順8で、`.private` を `git add` の対象に入れないためです。

**ただしテンプレート側では、`.private/` の雛形を Git 管理しています。** このテンプレートを clone して使っている場合は扱いが変わります。**Git での扱いの正本は [`.private/README.md`](../.private/README.md) です。**

```gitignore
.private/
```

API キー、パスワード、アクセストークン、個人情報が入ったファイルも載せません。

## 7. ローカルで Git 管理を始める

研修フォルダのルートに移動します。

```powershell
cd "C:\Users\自分の名前\Desktop\ハンズオン勉強会"
```

Git 管理を開始します。

```powershell
git init
git branch -M main
```

状態を確認します。

```powershell
git status --short --ignored
```

`.private/` が `!! .private/` のように ignored として表示されていれば、GitHub には載りません。**このテンプレートを clone して `.git` ごと引き継いだ場合は `!!` になりません。**その場合は [`.private/README.md`](../.private/README.md) の手順に従ってください。

## 8. 初回コミットを作る

公開してよいファイルだけを追加します。

```powershell
git add README.md AGENTS.md .gitignore .agents assets docs second-brain tools
```

必要なら `.claude` や `.codex` も追加します。

```powershell
git add .claude .codex
```

もう一度、何が追加されるか確認します。

```powershell
git status --short
```

問題なければコミットします。

```powershell
git commit -m "Initial commit"
```

## 9. 自分の GitHub にリポジトリを作って push する

リポジトリ名を決めます。半角英数字とハイフンにすると扱いやすいです。

```powershell
gh repo create <リポジトリ名> --public --source . --remote origin --push
```

非公開にしたい場合は `--public` の代わりに `--private` を使います。

```powershell
gh repo create <リポジトリ名> --private --source . --remote origin --push
```

成功すると、GitHub の URL が表示されます。

```text
https://github.com/<自分のユーザー名>/<リポジトリ名>
```

## 10. 2回目以降の push

変更したあと、次の流れで push します。

```powershell
git status --short
git add <変更したファイル>
git commit -m "変更内容が分かるメッセージ"
git push
```

`git add .` は便利ですが、意図しないファイルを入れやすいので、研修ではできるだけファイル名やフォルダ名を指定します。

## よくあるエラー

### `gh` が見つからない

GitHub CLI が入っていないか、ターミナルを開き直していない可能性があります。

```powershell
gh --version
```

で確認します。

### `git` が見つからない

Git が入っていないか、ターミナルを開き直していない可能性があります。

```powershell
git --version
```

で確認します。

### `gh auth status` でログインエラーになる

もう一度ログインします。

```powershell
gh auth login -h github.com -w
```

### `.private/` が push されそうで不安

次を確認します。

```powershell
git status --short --ignored
```

`.private/` が `!! .private/` と表示されていれば ignored です。`A .private/...` のように表示された場合は、コミットする前に止めて確認します。**このテンプレートを clone して `.git` ごと引き継いだ場合は `!!` になりません。**扱いは [`.private/README.md`](../.private/README.md) にあります。

## 参考

- Git for Windows: https://git-scm.com/install/windows
- GitHub CLI quickstart: https://docs.github.com/en/github-cli/github-cli/quickstart
- GitHub CLI Windows install: https://github.com/cli/cli/blob/trunk/docs/install_windows.md
