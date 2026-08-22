# make-pptx

公式スライドマスタを使って `.pptx` を作るための設計メモです。

このリポジトリには、PowerShell などの実行スクリプトは同梱していません。

## 内容の置き場所

スライド内容を構造化して残す場合は、`outputs/<名前>.json` に置きます。`.pptx` 化が必要な場合は、PowerPoint や利用可能なプレゼンテーション作成機能で公式マスタへ反映します。

## 内容の書き方（deck.json）

```json
{
  "slides": [
    { "type": "cover",   "title": "資料タイトル", "subtitle": "発表者 ｜ 2026年MM月DD日" },
    { "type": "content", "title": "見出し", "lead": "この枚で言いたいこと。",
      "bullets": ["1つ目", "2つ目", "3つ目"] },
    { "type": "content", "title": "表で見せる", "lead": "判断基準を並べる。",
      "headers": ["項目", "内容"],
      "rows": [["1つ目", "説明"], ["2つ目", "説明"]] },
    { "type": "content", "title": "図を入れる", "image": "outputs/figure.png" },
    { "type": "section", "title": "章タイトル", "lead": "ここから何を話すか" }
  ]
}
```

| キー | 意味 |
| --- | --- |
| `type` | 使うレイアウト。`cover` / `content` / `section` / `closing` |
| `title` | 1つ目のプレースホルダー（見出し） |
| `subtitle` / `lead` | 2つ目のプレースホルダー（表紙の副題、本文のリード文） |
| `bullets` | 箇条書き。白いコンテンツ面にテキストボックスとして入る |
| `headers` + `rows` | 表 |
| `image` | 画像のパス（リポジトリからの相対パスでよい） |

`type` と公式レイアウトの対応。

| `type` | 公式レイアウト |
| --- | --- |
| `cover` | 表紙 |
| `content` | コンテンツ1 |
| `section` / `closing` | コンテンツ2 |
| `heading` | 見出し（水色） |
| `full` | 背景（水色） |

## テンプレート

テンプレートは `.agents/skills/make-my-slides/templates/bnv-master/template.pptx` にあります。公式マスタが更新されたら、PowerPoint 側で必要なテンプレートを差し替えます。

## なぜこの作り方なのか

- **文字が編集できる。** 各ページは画像ではなく本物のテキストボックスなので、渡した相手が直せる
- **ブランドが完全に一致する。** 配色やロゴを再現するのではなく、公式マスタそのものを使う
- **生成手段を固定しない。** ローカルスクリプト、PowerPoint、外部のプレゼンテーション作成機能など、その時点で使える手段を選べる
