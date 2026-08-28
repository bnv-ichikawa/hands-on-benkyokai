---
name: windows-git-setup
description: Git がまだ入っていない可能性がある Windows PC を、hands-on-benkyokai を始められる状態にする初回限定のセットアップ手順。Windows版 ChatGPT Desktop / Codex で、WinGet の確認・再登録・修復インストール、Git for Windows の確認・インストール、PATH の反映、固定 public repository bnv-ichikawa/hands-on-benkyokai の Desktop への clone、clone 後の private/my-profile/me.md を使った Git user.name / user.email の初期設定まで行う。通常の Git 操作には使わない。
---

# Windows Git セットアップ

## Codexへの実行指示

**これはSkillを作成するための依頼ではない。以下の手順を、現在のWindows PCで実際に実行すること。**

`SKILL.md`や別の手順書を作成・編集するのではなく、この文書に従って次の状態までセットアップを進める。

1. Git for Windowsが使える状態になっている
2. `hands-on-benkyokai`がWindowsのDesktopへcloneされている
3. Gitの`user.name`と`user.email`が設定されている
4. 最終確認がすべて成功している

ユーザー本人の操作が必要な場合だけ停止して依頼し、操作の完了後は結果を確認して手順を再開する。

この手順は **PC ごとに原則1回だけ**使う。

対象 repository は固定する。

```text
https://github.com/bnv-ichikawa/hands-on-benkyokai.git
```

clone 後の branch、commit、push、PR など通常の Git 操作は Codex の標準機能に任せる。この手順に通常運用の Git ワークフローを追加しない。

## 実行順序

必ず次の順番で進める。

1. Windows / PowerShell を確認する
2. Git の有無を確認する
3. Git がなければ WinGet の有無を確認する
4. WinGet がなければ、App Installer の再登録と WinGet の修復インストールを試す
5. WinGet でも復旧できない場合だけ、ユーザーへ Microsoft Store での操作を依頼する
6. Git for Windows をインストールする
7. PATH を反映し `git --version` を確認する
8. Desktop の実パスを取得する
9. `hands-on-benkyokai` を clone する
10. clone 後に `private/my-profile/me.md` を読む
11. Git の `user.name` / `user.email` の未設定項目を設定する
12. clone と Git 設定を検証する

Git の identity 設定より **clone を先に行う**こと。`private/my-profile/me.md` は clone 後でなければ読めないためである。

## 1. Windows を確認する

ローカル PowerShell で確認する。

```powershell
$env:OS
[System.Environment]::OSVersion.VersionString
```

Windows 以外なら停止する。

Python、Node.js、WSL、Chocolatey、Scoop、Visual Studio、GitHub CLI などが入っている前提にしない。

## 管理者権限が必要な場合

管理者権限が必要な操作は、AIだけで完了しようとしない。

1. コマンドを実行する前に、UAC または管理者資格情報の画面が表示される可能性をユーザーへ伝える
2. UAC が表示されたら処理を停止し、ユーザー本人に画面上で承認してもらう
3. 標準ユーザーのため管理者資格情報が求められた場合は、端末の管理者に画面上で入力してもらう
4. ユーザーから承認または入力の完了連絡を受けた後に、コマンドの結果を確認して処理を再開する

管理者パスワード、PIN、その他の認証情報をチャットで質問・受領・保存しない。UAC の回避、権限昇格の迂回、認証情報の推測を行わない。

管理者の承認または資格情報を用意できない場合は、その操作を実行せず、セットアップを停止して必要な権限をユーザーへ伝える。

## 2. Git を確認する

```powershell
$git = Get-Command git -ErrorAction SilentlyContinue
if ($git) { git --version }
```

`git --version` が成功するなら再インストールしない。

## 3. WinGet を確認・準備する

このセクションは、Git が入っていない場合だけ実行する。

まず WinGet の有無と動作を確認する。

```powershell
$winget = Get-Command winget -ErrorAction SilentlyContinue
if ($winget) {
    winget --version
}
```

`winget --version` が成功する場合は、WinGet の再インストールや修復を行わず「4. Git for Windows をインストールする」へ進む。

### App Installer を再登録する

WinGet が見つからない場合、初回ログイン後の非同期登録が完了していない可能性がある。まず Microsoft 公式の方法で App Installer の登録を要求する。

```powershell
Add-AppxPackage -RegisterByFamilyName -MainPackage Microsoft.DesktopAppInstaller_8wekyb3d8bbwe -ErrorAction Stop

$winget = Get-Command winget -ErrorAction SilentlyContinue
if ($winget) {
    winget --version
}
```

`winget --version` が成功したら、次の修復インストールは行わない。

### WinGet を修復インストールする

App Installer の再登録後も WinGet が見つからない場合は、Microsoft 公式の PowerShell モジュールを使って WinGet の安定版を修復インストールする。

この処理では NuGet provider と `Microsoft.WinGet.Client` PowerShell module を導入する。`Repair-WinGetPackageManager -AllUsers` などで管理者権限が必要になった場合は、「管理者権限が必要な場合」の手順に従い、ユーザー本人の承認または端末管理者による認証を待つ。

```powershell
$progressPreference = 'silentlyContinue'
Install-PackageProvider -Name NuGet -Force | Out-Null
Install-Module -Name Microsoft.WinGet.Client -Force -Repository PSGallery | Out-Null
Repair-WinGetPackageManager -AllUsers

$winget = Get-Command winget -ErrorAction SilentlyContinue
if ($winget) {
    winget --version
}
```

`winget --version` が成功するまで、WinGet の準備が完了したと扱わない。

Microsoft 公式手順:

```text
https://learn.microsoft.com/windows/package-manager/winget/
```

### 自動復旧できない場合

再登録と修復インストールの両方に失敗した場合だけ、Microsoft Store の App Installer をユーザーに手動でインストールしてもらう。

```text
https://apps.microsoft.com/detail/9NBLGGH4NNS1
```

AI はページを開ける場合は開き、ユーザーには「入手」または「インストール」の操作だけを依頼する。別のパッケージマネージャーを導入しない。

ユーザーがインストールを完了した後、必ず次を再確認する。

```powershell
$winget = Get-Command winget -ErrorAction SilentlyContinue
if (-not $winget) {
    throw 'App Installer の導入後も WinGet を確認できませんでした。'
}

winget --version
```

## 4. Git for Windows をインストールする

Git がない場合は、準備した WinGet で Git for Windows をインストールする。

```powershell
winget install --id Git.Git -e --source winget --accept-source-agreements --accept-package-agreements
```

UAC や管理者資格情報の画面が表示された場合は、「管理者権限が必要な場合」の手順に従って停止し、ユーザー本人または端末管理者の操作を待つ。

終了後、`git --version` が成功するまでインストール成功とは扱わない。

### 現在の PowerShell に PATH を反映する

インストール直後の PowerShell は古い PATH を保持していることがある。Machine PATH と User PATH を再取得し、現在のプロセスへ反映する。

```powershell
$machinePath = [Environment]::GetEnvironmentVariable('Path', 'Machine')
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
$persisted = @($machinePath, $userPath) | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }

if ($persisted.Count -gt 0) {
    $env:Path = (($persisted -join ';') + ';' + $env:Path)
}

$git = Get-Command git -ErrorAction SilentlyContinue
```

それでも見つからない場合は、標準的な Git for Windows の場所を確認する。

```powershell
$candidates = @(
    (Join-Path $env:ProgramFiles 'Git\cmd\git.exe'),
    (Join-Path $env:LOCALAPPDATA 'Programs\Git\cmd\git.exe')
)

if (${env:ProgramFiles(x86)}) {
    $candidates += (Join-Path ${env:ProgramFiles(x86)} 'Git\cmd\git.exe')
}

$gitExe = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if ($gitExe) {
    $gitCmd = Split-Path $gitExe -Parent
    $env:Path = "$gitCmd;$env:Path"
}

$git = Get-Command git -ErrorAction SilentlyContinue
if (-not $git) {
    throw 'Git のインストール後も git.exe を確認できませんでした。'
}
```

### 新しいターミナルでも Git を使える状態にする

現在の PowerShell だけでなく、永続的な User PATH または Machine PATH に Git の `cmd` ディレクトリが登録されているか確認する。

```powershell
$gitExe = (Get-Command git -ErrorAction Stop).Source
$gitCmd = (Split-Path $gitExe -Parent).TrimEnd('\')

$machinePath = [Environment]::GetEnvironmentVariable('Path', 'Machine')
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')

$persistentEntries = @($machinePath, $userPath) |
    Where-Object { -not [string]::IsNullOrWhiteSpace($_) } |
    ForEach-Object { $_ -split ';' } |
    Where-Object { -not [string]::IsNullOrWhiteSpace($_) } |
    ForEach-Object { [Environment]::ExpandEnvironmentVariables($_).Trim().TrimEnd('\') }

$registered = $persistentEntries | Where-Object { $_ -ieq $gitCmd }
```

未登録なら既存 User PATH を保持したまま Git の `cmd` ディレクトリだけを追加する。

```powershell
if (-not $registered) {
    $currentUserPath = [Environment]::GetEnvironmentVariable('Path', 'User')
    $newUserPath = if ([string]::IsNullOrWhiteSpace($currentUserPath)) {
        $gitCmd
    } else {
        "$currentUserPath;$gitCmd"
    }

    [Environment]::SetEnvironmentVariable('Path', $newUserPath, 'User')
    $env:Path = "$gitCmd;$env:Path"
}

git --version
```

既存 PATH の削除、並べ替え、その他の環境変数変更はしない。

## 5. Desktop 候補を取得して確認する

Desktop の場所を固定値で推測しない。OneDrive 等のリダイレクトも考慮して Windows API から候補を取得する。

```powershell
$desktop = [Environment]::GetFolderPath('Desktop')
if ([string]::IsNullOrWhiteSpace($desktop) -or -not (Test-Path $desktop)) {
    throw 'Windows の Desktop フォルダを取得できませんでした。'
}

$desktop = (Resolve-Path -LiteralPath $desktop -ErrorAction Stop).Path
```

clone の前に、取得した候補をユーザーへそのまま表示し、必ず次のように確認する。

```text
Desktop の候補は「<取得した $desktop>」です。この Desktop の場所で合っていますか？
```

ユーザーが合っていると答えた場合のみ、そのまま次へ進む。否定された場合にだけ、正しい Desktop の場所を質問する。候補と異なるパスを推測したり、ユーザーが答える前に clone したりしない。

ユーザーから正しい場所を受け取った場合は、パスを展開・正規化して実在するディレクトリか確認する。存在しない場合は clone せず、正しい場所をもう一度確認する。

```powershell
# ユーザーが示した Desktop パスを $desktop に代入してから実行する
$desktop = [Environment]::ExpandEnvironmentVariables($desktop)
if ([string]::IsNullOrWhiteSpace($desktop) -or -not (Test-Path -LiteralPath $desktop -PathType Container)) {
    throw '指定された Desktop フォルダを確認できませんでした。'
}

$desktop = (Resolve-Path -LiteralPath $desktop -ErrorAction Stop).Path
```

Desktop の場所が確定した後に、clone 先を組み立てる。

```powershell
$repoUrl = 'https://github.com/bnv-ichikawa/hands-on-benkyokai.git'
$destination = Join-Path $desktop 'hands-on-benkyokai'
```

## 6. Repository を clone する

`$destination` が存在しない場合は clone する。

```powershell
git clone "$repoUrl" "$destination"
```

GitHub の認証情報を要求しない。この repository は public のため HTTPS の匿名 clone を前提とする。

同名フォルダが既に存在する場合は、削除・上書きしない。

Git repository なら origin を確認する。

```powershell
git -C "$destination" remote get-url origin
```

次のどちらかなら同じ repository と扱い、再 clone せず続行する。

```text
https://github.com/bnv-ichikawa/hands-on-benkyokai
https://github.com/bnv-ichikawa/hands-on-benkyokai.git
```

別のフォルダまたは別 repository なら停止し、ユーザーに状況を伝える。

## 7. `private/my-profile/me.md` から Git identity 候補を読む

clone 後、以下を読む。

```powershell
$profilePath = Join-Path $destination 'private\my-profile\me.md'
```

対象項目は次の2つだけ。

```text
- 名前 / 呼ばれ方:
- メールアドレス:
```

各行の `:` より後ろにある文字列を値として扱う。空白だけなら未記入とする。

例:

```text
- 名前 / 呼ばれ方: 山田 太郎
- メールアドレス: taro@example.com
```

この場合の候補は次。

```text
user.name  = 山田 太郎
user.email = taro@example.com
```

プロフィールの他の項目を Git 設定に流用しない。

プロフィールファイル自体には書き込まない。

## 8. Git identity を設定する

まず既存の global 設定を確認する。

```powershell
$currentName = git config --global --get user.name
$currentEmail = git config --global --get user.email
```

既に設定されている項目は変更しない。

未設定項目について、次の優先順位で値を決める。

1. `private/my-profile/me.md` の対応項目
2. 対応項目が未記入ならユーザーへ質問

つまり、`user.name` が未設定でプロフィールの「名前 / 呼ばれ方」が埋まっていれば、その値を使う。プロフィールも空なら `user.name` に使う名前をユーザーに聞く。

`user.email` も同様に、プロフィールの「メールアドレス」を優先し、空ならユーザーに聞く。

Windows ユーザー名、GitHub アカウント名、ChatGPT プロフィールなどから推測しない。

ユーザーへの質問は **不足している項目だけ**にする。

値が決まったら未設定項目だけ設定する。

```powershell
git config --global user.name "<決定した名前>"
git config --global user.email "<決定したメールアドレス>"
```

両方未設定のときだけ両方を設定する。片方が既にある場合は既存値を保持する。

次の global 設定は自動変更しない。

- `core.autocrlf`
- `core.eol`
- `init.defaultBranch`
- `credential.helper`
- `user.signingkey`
- `commit.gpgsign`
- `core.editor`
- alias

## 9. 最終確認

```powershell
git --version
git config --global --get user.name
git config --global --get user.email
git -C "$destination" rev-parse --is-inside-work-tree
git -C "$destination" remote get-url origin
git -C "$destination" status --short --branch
```

次をすべて確認できた場合だけ完了とする。

- `git --version` が成功する
- `user.name` が空ではない
- `user.email` が空ではない
- clone 先が Git working tree である
- origin が `bnv-ichikawa/hands-on-benkyokai` である
- `git status` が成功する

## 最終報告

簡潔に次を伝える。

- Git が元からあったか、今回インストールしたか
- Git version
- clone 先
- Git identity について、既存値を使ったか、プロフィールから設定したか、ユーザー回答から設定したか
- origin URL

## やらないこと

- GitHub 認証情報を要求・保存しない
- 管理者パスワード、PIN、その他の認証情報をチャットで要求・受領・保存しない
- UAC をユーザーに代わって承認しない
- 管理者権限を回避・迂回しない
- 既存フォルダを削除・上書きしない
- repository 内のコードを実行しない
- `private/my-profile/me.md` を編集しない
- branch / commit / push / PR など通常運用の Git 操作をこの手順に含めない
- 初回セットアップ後の通常作業でこの手順を自動利用しない
