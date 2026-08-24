# ハンズオン勉強会

自分の業務をAIとの対話で言語化し、再利用できる知識庫（Second Brain）として残すためのハンズオン教材です。AIエージェントには Codex デスクトップアプリを使います。

## ファイル構成

```text
.
├── README.md                    このファイル。リポジトリの構成
├── CONSTITUTION.md              リポジトリ全体にかかる決まりの正本
├── AGENTS.md                    使用中のキャラクター定義。AIが読む人格はここだけ
├── .gitignore
├── .private/                    個人的な情報の置き場。AIは読み書きする（扱いは .private/README.md）
│   ├── ai-characters/           各自で作るキャラクター定義の保管場所
│   └── my-profile/              自分のプロフィールや役割
│       └── me.md                プロフィール本体（各自で作る）
├── .agents/
│   └── skills/                  AIに頼める作業と、その進め方
│       ├── teach-my-work/       自分の仕事を聞き取ってもらい、手順書として残す
│       ├── create-character/    AIの性格と話し方を自分で決める
│       └── make-my-slides/      公式マスタに載せるスライドの中身を作る
├── assets/                      画像などの素材
│   └── characters/              キャラクターのアイコン画像
├── docs/                        Second Brain の考え方と設計方針（下の表を参照）
│   └── references/              背景知識・参考文献
├── outputs/                     作った成果物（スライドなど）
├── tools/                       各自のPCで実行するプログラムを置く場所
│   └── repo-checks/             リポジトリの整合性を機械的に検査する
└── second-brain/                知識庫の本体（データ側）
    ├── README.md                知識庫の入口
    ├── inbox/                   未整理のメモ
    ├── projects/                期限と完了条件がある仕事
    ├── areas/                   継続して担当する仕事
    ├── resources/               再利用する知識
    └── archives/                完了・停止・古い情報
```

`second-brain/` の `projects` / `areas` / `resources` / `archives` は、PARAという整理方法にもとづく置き場所の区分です。

## docs/ の内容

| ファイル | 内容 |
| --- | --- |
| [`README.md`](docs/README.md) | 解説資料の入口（MOC） |
| [`requirements.md`](docs/requirements.md) | 何をするのに何が必要か（必要なソフトウェアの正本） |
| [`setup-windows.md`](docs/setup-windows.md) | Windows PC の準備（PowerPoint 方式の確認） |
| [`github-account-and-push.md`](docs/github-account-and-push.md) | GitHub アカウント作成と自分のリポジトリへの push |
| [`getting-started.md`](docs/getting-started.md) | 始めるときに決めること |
| [`second-brain.md`](docs/second-brain.md) | Second Brain とは何か |
| [`references/second-brain-history.md`](docs/references/second-brain-history.md) | 時系列と進化の背景 |
| [`references/organization-patterns.md`](docs/references/organization-patterns.md) | 整理パターン: PARA, Zettelkasten, MOC |

キャラクター定義の作り方は `.agents/skills/create-character/SKILL.md` にあります。作った下書きは `.private/ai-characters/` に置きますが、実際に使う人格は `AGENTS.md` に反映します。

## 業務を知識庫にためる

自分の業務を言語化して残すときは、AIに「業務を教えたい」「このメモを整理して」と伝えます。`teach-my-work` スキルが動きます。

最初に**進め方**と**何のために残すか**を聞かれます。ここで認識を合わせてから始まります。

| 進め方 | どう進むか | 向いている場面 |
| --- | --- | --- |
| メモ起点型 | メモを読んで3行で要約し、読み違いを潰してから、書かれていない前提と判断基準を質問する | 議事録や手順メモがすでにある。`inbox/` を整理したい |
| ヒアリング型 | 目的 → 開始と完了 → 手順 → 判断基準 → 例外 の順にAIが質問して引き出す | 何も書いていない。何から話せばいいか分からない |
| 語り起こし型 | 先に思い出した順で全部話す。AIは遮らず記録し、そのあと分け方を一緒に決める | 言いたいことは頭にあるが、順番に整理されていない |

### どこまで深く聞かれるか

どの進め方でも、掘り下げる深さは同じ基準で固定されています。

> **このノートだけを渡されたAIが、次回この業務を実行できる。**

「読んで分かる」では止まりません。手順の各ステップについて、**入力・場所・操作・判断・出力・検証・例外**の7つが埋まるまで聞かれます。「適宜」「状況に応じて」「確認する」のような曖昧な言葉は、書いてあっても未記入と同じ扱いになり、条件・閾値・相手を聞かれます。

答えられないことは、AIが埋めずに**未確認事項として残ります。** 誰に聞けば埋まるかも書かれます。1回で終わらない場合は途中まで保存し、次回そこから再開します。

### 保存と検証

聞き取った内容は `second-brain/` の `projects` / `areas` / `resources` に分類して保存されます。分類の基準は [`docs/getting-started.md`](docs/getting-started.md) と各ディレクトリの `README.md` にあります。置き場所は勝手に決められず、理由を添えて提案されます。

最後に、いま選んでいるキャラクターが**そのノートだけを読んで初任者に説明し、理解度チェックを3問出します。** 説明できなかった箇所が、ナレッジの穴です。

依頼すれば、`outputs/` に引継ぎガイドも作ります。

## スライドを作る

ためた知識からスライドを作るときは、AIに「スライドを作りたい」と伝えます。`make-my-slides` スキルが動きます。

**Beyond Next Ventures の公式スライドマスタに合わせた内容を作ります。** 配色やロゴを似せて再現するのではなく、公式マスタのレイアウト（表紙・コンテンツ1 など）に流し込める内容として整理するので、

- **文字がそのまま編集できます。** 各ページは画像ではなく本物のテキストボックスです
- 公式マスタに載せ替えやすい形で構成と本文を整理できます
- ローカル実行用スクリプトは同梱していません

最初に**進め方**と**成果物の形**を聞かれます。ここで認識を合わせてから作り始めます。

| 進め方 | どう進むか | 向いている場面 |
| --- | --- | --- |
| すり合わせ型 | 構成 → 表紙の試作 → 本文 と区切って合意しながら進む | 内容が固まっていない。手戻りを避けたい |
| たたき台型 | 最小限だけ聞いてAIが一度最後まで作る。完成品を見てから修正を指示する | だいたい決まっている。まず形を見たい |

内容は `outputs/<名前>.json` などに整理します。`.pptx` 化が必要な場合は、PowerPoint や利用可能なプレゼンテーション作成機能で公式マスタへ反映します。

## 役割の分担

- [`CONSTITUTION.md`](CONSTITUTION.md) はリポジトリ全体にかかる決まりの正本。個別の決まりはそこから辿る
- `README.md` は人間向けの案内、`AGENTS.md` はAIが読むキャラクター定義。AIへの作業指示は `.agents/skills/` が持つ
- `docs/` は Second Brain の考え方の説明、`second-brain/` は業務知識そのもの
- `tools/` は各自のPCで実行するプログラムを置く場所。いまは [`tools/repo-checks`](tools/repo-checks/README.md)（リポジトリの整合性検査）だけが入っている
- `.private/` は個人的な情報の置き場。用途ごとにフォルダを分ける（`ai-characters/` と `my-profile/`）。**Git での扱いと、自分の情報を書く前にやることは [`.private/README.md`](.private/README.md) が正本**
- ただし、いま人格として効いているのは `AGENTS.md` の内容だけ。`ai-characters/` に置いただけでは反映されない
