# Node.js のセットアップ

Windows PCに Node.js を導入する手順です。**人が読みながら進める手順書です。** [`windows-first-time-setup`](../windows-first-time-setup/README.md) と違い、AIが実行するSkillにはしていません。理由は「Skillにしない理由」を参照してください。

## 何に使うのか

このリポジトリで Node.js が必要になるのは、次の2箇所だけです。

| 場面 | 何をするか | 使う人 |
| --- | --- | --- |
| [`tools/repo-checks`](../../tools/repo-checks/README.md) | `node --test` でリポジトリ全体の整合性(リンク切れ、複製の食い違い)を検査する | リポジトリを保守する人 |
| [`tools/marp`](../../tools/marp/README.md) | `npx` 経由で Marp CLI を呼び出し、講義スライドの Markdown を PDF / PowerPoint に変換する | 講義資料を作る人 |

**通常の勉強会参加者(業務を second-brain に残す、GitHub に push する)には Node.js は不要です。** 必要なものの全体像は [docs/requirements.md](../../docs/requirements.md) にあります。

## Skillにしない理由

Node.js のインストーラーは、環境によって管理者権限(UAC)を求めます。UAC の承認は本人にしかできず、AIが代わりに承認したり、パスワードや PIN を代行入力したりできません。この制約は [`windows-first-time-setup/SKILL.md`](../windows-first-time-setup/SKILL.md) の「管理者権限が必要な場合」と同じです。

そのため、この手順は AI に自動実行させず、**自分の目でダイアログを確認しながら**進めてください。AI に手伝ってもらう場合も、UAC が出た時点で操作を代わってもらわないでください。

## 対象環境

Windows / PowerShell

## 1. すでに入っているか確認する

```powershell
node --version
npm --version
```

`node` が 18 以上を表示すれば、インストール不要です。

## 2. WinGet があるか確認する

```powershell
winget --version
```

`winget` が見つからない場合は、先に [`windows-first-time-setup`](../windows-first-time-setup/README.md) の WinGet 準備手順を行ってください。

## 3. Node.js をインストールする

WinGet で LTS 版を入れます。

```powershell
winget install --id OpenJS.NodeJS.LTS -e --source winget --accept-source-agreements --accept-package-agreements
```

管理者権限の確認画面(UAC)が出たら、自分で「はい」を選んで進めてください。

WinGet が使えない場合は、公式サイトから直接ダウンロードします。

```text
https://nodejs.org/ja/download
```

インストーラーの選択肢は、特別な理由がなければ既定値のままで進めます。

## 4. 新しいターミナルで確認する

インストール直後の PowerShell は PATH が古いままのことがあります。**ウィンドウを開き直してから**確認してください。

```powershell
node --version
npm --version
```

両方バージョンが表示されれば完了です。

## 5. 動作確認(任意)

`tools/repo-checks` で実際に検査を回してみます。

```powershell
cd tools/repo-checks
npm test
```

テストが実行されれば、Node.js のセットアップは完了しています。

## うまくいかないとき

### `winget install` が失敗する

WinGet 自体が使えない可能性があります。[`windows-first-time-setup`](../windows-first-time-setup/README.md) の WinGet 準備手順を先に行ってください。

### `node` / `npm` がコマンドとして見つからない

ターミナルを開き直していない可能性があります。新しい PowerShell ウィンドウで、もう一度 1. を確認してください。

### UAC のダイアログで止まっている

自分の PC であれば「はい」を選んで進めます。会社支給 PC など管理者権限を自分で持っていない場合は、端末の管理者に依頼してください。パスワードや PIN は誰にも(AIにも)教えないでください。

## この手順でやらないこと

- 管理者パスワード、PIN、その他の認証情報を要求・保存しない
- UAC をユーザーに代わって承認しない
- ここに書いていない依存パッケージのグローバルインストールなどは行わない
