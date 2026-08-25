---
marp: true
theme: bnv-lecture
paginate: true
---

<!-- _class: title -->

<span class="kicker">AI勉強会 第3回</span>

# ファイル形式の基本を学ぶ

<p class="lead">同じ「文字が並んだファイル」でも、形式が違えば使い道が違う。<br>道具箱にはドライバーもハサミもいる。</p>

<img class="mascot" src="./assets/characters/mascot-blue.svg" alt="mascot" />

---

## 今回のゴール

- `.md` `.csv` `.tsv` `.json` `.toml` の違いを説明できる
- それぞれの基本的な書き方が分かる
- 非エンジニアでも、どんな場面でその知識が役に立つか説明できる

---

## 目次

1. 5つのファイル形式
2. 用途によって使い分ける

---

## なぜファイル形式を知っておくと便利か

- AIに**分析ツールを作らせて動かしてもらう**とき、元データが `.csv` や `.json` だと話が早い
- **同じデータを見ながらAIと議論したい**とき、表形式で渡せると解釈のズレが減る
- AIが作った設定ファイルや出力を**自分で読んで確認する**場面がある
- 「なんとなく貼り付ける」より、**形式に合わせて渡す**方がAIの精度も上がる

---

<!-- _class: divider -->

<div class="num">01</div>

# 5つのファイル形式

<img class="mascot" src="./assets/characters/mascot-yellow.svg" alt="mascot" />

---

## `.md`：文章・ナレッジ

- Markdown。見出しやリストを簡単な記号で書ける文章形式
- このリポジトリの資料・手順書・ナレッジはほぼ全部これ

```md
# 見出し
- 箇条書き
**強調したい文字**
[リンクの表示名](https://example.com)
```

<div class="pocket">
  <img class="icon" src="./assets/characters/pocket.svg" alt="pocket" />
  <div>
    <span class="label">使う場面</span>
    議事録・手順書・調査メモなど、AIに読んでもらいたい文章を残すとき。
  </div>
</div>

---

## `.md`のちょっとしたコツ

- 表にしたいときは `|` で区切る（`.csv`ほど厳密ではないが、見た目を整えやすい）

```md
| 列1 | 列2 |
|---|---|
| 値 | 値 |
```

- 画像やグラフを入れたいときは、**他のツールで画像として作り、リンクで埋め込む**

```md
![説明](画像のパス)
```

---

## `.csv` / `.tsv`：表データ

- どちらも表（行と列）を表すための形式。1行目に列名、2行目以降にデータを並べる
- `.csv` はカンマ区切り、`.tsv` はタブ区切り。Excelでそのまま表になる

```csv
名前,部署,入社年
山田,営業,2021
```

```tsv
名前	部署	入社年
山田	営業	2021
```

<div class="pocket">
  <img class="icon" src="./assets/characters/pocket.svg" alt="pocket" />
  <div>
    <span class="label">使う場面</span>
    AIに集計・分析をさせたいとき、同じ数字データを見ながらAIと議論したいとき。文章の中にカンマが出てくるデータは`.tsv`の方が壊れにくい。
  </div>
</div>

---

## `.json`：構造化データ

- キーと値のペア（`"キー": 値`）で、入れ子（ネスト）にもできるデータ形式
- プログラムやAIのツール同士が、データをやり取りするときによく使う

```json
{
  "name": "山田",
  "department": "営業",
  "skills": ["提案", "交渉"]
}
```

<div class="pocket">
  <img class="icon" src="./assets/characters/pocket.svg" alt="pocket" />
  <div>
    <span class="label">使う場面</span>
    AIに「分析ツールを作って動かして」と頼むときの入出力データ、AIツールの設定や、他システムとの連携データを覗きたいとき。
  </div>
</div>

---

## `.toml`：設定ファイル

- プログラムの動きを決める**設定値**を書くための形式
- `[セクション名]` の下に `key = value` を並べる。人が見てもすぐ分かる

```toml
[settings]
model = "gpt"
enabled = true
```

<div class="pocket">
  <img class="icon" src="./assets/characters/pocket.svg" alt="pocket" />
  <div>
    <span class="label">使う場面</span>
    普段の業務ではあまり書かないが、AIツールの設定を自分で確認・調整したいとき。
  </div>
</div>

---

<!-- _class: divider -->

<div class="num">02</div>

# 用途によって使い分ける

<img class="mascot" src="./assets/characters/mascot-blue.svg" alt="mascot" />

---

## 選び方の目安

| 残したいもの | 使う形式 |
|---|---|
| 考えたこと、手順、判断の理由 | `.md` |
| 数字や項目が並ぶ一覧、集計データ | `.csv` / `.tsv` |
| AIツールへの入出力、他システムとの連携データ | `.json` |
| ツールの動作を決める設定値 | `.toml` |

<div class="caution">
  <img class="icon" src="./assets/characters/bigvoice.svg" alt="icon" />
  <div>
    <span class="label">ガキ大将の注意報</span>
    表データを無理やり `.md` の文章で書くと、あとで集計や検索がしづらくなる。用途に合った形式を選ぶこと。
  </div>
</div>

---

<!-- _class: closing -->

# 次回は「良いRepositoryの掟」を学びます

<img class="mascot" src="./assets/characters/mascot-blue.svg" alt="mascot" />

<p class="small">第4回：良いRepositoryを作るための掟を学ぶ</p>
