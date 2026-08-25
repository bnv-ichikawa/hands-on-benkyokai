# ハンズオン勉強会

自分の業務をAIとの対話で言語化し、再利用できる知識庫（Second Brain）として残すためのハンズオン教材です。AIエージェントには Codex デスクトップアプリを使います。

まだ Git もリポジトリも無い PC から始める場合は [初回セットアップ](bootstrap/README.md) を使います。

## 🗂️ ディレクトリ構成

```text
.
├── README.md                    このファイル。リポジトリの構成
├── CONSTITUTION.md              リポジトリ全体にかかる決まりの正本
├── AGENTS.md                    使用中のキャラクター定義。AIが読む人格はここだけ
├── .github/
│   └── PULL_REQUEST_TEMPLATE.md PR本文のテンプレート
├── .gitignore
├── private/                     個人的な情報の置き場。AIは読み書きする
│   ├── ai-characters/           各自で作るキャラクター定義の保管場所
│   └── my-profile/              自分のプロフィールや役割
├── .agents/
│   └── skills/                  AIに頼める作業と、その進め方
│       ├── teach-my-work/       自分の仕事を聞き取ってもらい、手順書として残す
│       ├── create-character/    AIの性格と話し方を自分で決める
│       └── make-my-slides/      公式マスタに載せるスライドの中身を作る
├── bootstrap/                   初期環境のセットアップ方法と Skill
├── assets/                      画像などの素材
│   └── characters/              キャラクターのアイコン画像
├── docs/                        リポジトリと勉強会に必要なドキュメント
│   └── second-brain/            Second Brain の解説・始め方・参考資料
├── outputs/                     作った成果物（スライドなど）
├── tools/                       各自のPCで実行するプログラムを置く場所
│   ├── make-pptx/               スライド内容（deck.json）の形式定義
│   ├── marp/                    Marp Markdown を PDF / PPTX に変換する
│   └── repo-checks/             リポジトリの整合性を機械的に検査する
└── second-brain/                知識庫の本体（データ側）
    ├── inbox/                   未整理のメモ
    ├── projects/                期限と完了条件がある仕事
    ├── areas/                   継続して担当する仕事
    ├── resources/               再利用する知識
    └── archives/                完了・停止・古い情報
```

それぞれの詳細は、その場所の README にあります。

- [`bootstrap/README.md`](bootstrap/README.md)
- [`docs/README.md`](docs/README.md)
- [`second-brain/README.md`](second-brain/README.md)
- [`private/README.md`](private/README.md)
- [`tools/README.md`](tools/README.md)

`.agents/skills/` は README を持ちません。進め方、聞かれること、完了の基準は各 `SKILL.md` にあります。

## 🚀 基本的な使い方

AIに次のように伝えると、対応するスキルが動きます。

| したいこと | AIへの伝え方 |
|---|---|
| 自分の業務を知識庫に残す | 「業務を教えたい」「このメモを整理して」 |
| AIの性格と話し方を変える | 「キャラクターを作りたい」 |
| スライドの中身を作る | 「スライドを作りたい」 |

どのスキルも、**進め方と目的をユーザーと合意してから**始まります。

必要なソフトウェアは [何をするのに何が必要か](docs/requirements.md) を参照してください。

## 📏 共通ルール

- [`CONSTITUTION.md`](CONSTITUTION.md) はリポジトリ全体にかかる決まりの正本。個別の決まりはそこから辿る
- GitHubで変更するときは [GitHub運用ルール](docs/github-operations.md) に従う
- `README.md` は人間向けの案内、`AGENTS.md` はAIが読むキャラクター定義。AIへの作業指示は `.agents/skills/` が持つ
- `bootstrap/` は、何かを始めるときに必要な初期環境のセットアップ方法や Skill を置く
- `docs/` はリポジトリと勉強会に必要なドキュメント、`docs/second-brain/` は Second Brain の説明、ルートの `second-brain/` は業務知識そのもの
- いま人格として効いているのは `AGENTS.md` の内容だけ。`ai-characters/` に置いただけでは反映されない
