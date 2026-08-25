---
marp: true
theme: bnv-lecture
paginate: true
---

<!-- _class: title -->

<span class="kicker">AI勉強会 第2回</span>

# Repository・Skillを知る

<p class="lead">道具箱（Repository）と、道具の使い方書（Skill）。<br>この2つが分かれば、AIに仕事を頼みやすくなる。</p>

<img class="mascot" src="./assets/characters/mascot-yellow.svg" alt="mascot" />

---

## 今回のゴール

- Repository（ディレクトリ）が何かを説明できる
- Skillが何をするための仕組みか説明できる
- 実際に3つのSkillを自分で使ってみる

---

## 目次

1. Repositoryとは何か / ディレクトリとは何か
2. Skillとは何か
3. 3つのSkillを使ってみる

---

<!-- _class: divider -->

<div class="num">01</div>

# Repositoryとは何か / ディレクトリとは何か

<img class="mascot" src="./assets/characters/mascot-blue.svg" alt="mascot" />

---

## Repository（リポジトリ）

- 1つのプロジェクトに関する**ファイル一式が入った箱**
- ファイルの変更履歴を記録できる（詳しくは第5回 Git/GitHub）
- 「このフォルダの中身が、このプロジェクトの全部」という状態を作る

## ディレクトリ（フォルダ）

- Repositoryの中身を**役割ごとに分けた部屋**
- 例：資料の部屋、設定の部屋、素材の部屋
- 部屋が分かれているから、AIも人も**探す場所に迷わない**

<div class="pocket">
  <img class="icon" src="./assets/characters/pocket.svg" alt="pocket" />
  <div>
    <span class="label">ポイント</span>
    ポケットの中が整理されているから、必要な道具をすぐ出せる。フォルダも同じ。
  </div>
</div>

---

<!-- _class: divider -->

<div class="num">02</div>

# Skillとは何か

<img class="mascot" src="./assets/characters/mascot-yellow.svg" alt="mascot" />

---

## Skillの役割

- AIに**「この作業はこの手順で進めてね」**と教える設計図
- 進め方、確認すること、完了の基準があらかじめ決まっている
- 毎回ゼロから説明しなくても、同じ品質で作業を頼める

## Skillが向いていること

- 繰り返し発生する作業（業務の聞き取り、資料作りなど）
- 「何を聞かれるか」「何が完成形か」を先に決めておきたい作業

<div class="caution">
  <img class="icon" src="./assets/characters/bigvoice.svg" alt="icon" />
  <div>
    <span class="label">ガキ大将の注意報</span>
    Skillは魔法の杖じゃない。進め方が決まっているぶん、目的とズレた頼み方をすると変な結果が返ってくる。
  </div>
</div>

---

<!-- _class: divider -->

<div class="num">03</div>

# 3つのSkillを使ってみる

<img class="mascot" src="./assets/characters/mascot-blue.svg" alt="mascot" />

---

## 用意されている3つのSkill

| Skill | 何をするか |
|---|---|
| `teach-my-work` | 自分の業務を聞き取ってもらい、手順書として残す |
| `create-character` | AIの性格と話し方を自分で決める |
| `make-my-slides` | 公式マスタに載せるスライドの中身を作る |

---

## 呼び出し方

- 自然な言葉でお願いしてもいい
  - 「業務を教えたい」「このメモを整理して」→ `teach-my-work`
  - 「キャラクターを作りたい」→ `create-character`
  - 「スライドを作りたい」→ `make-my-slides`
- 入力欄に `/` を入れると、Skill名を直接指定して呼び出せる（例：`/create-character`）

<div class="pocket">
  <img class="icon" src="./assets/characters/bell.svg" alt="bell" />
  <div>
    <span class="label">豆知識</span>
    `@` を入れると、ページやファイルを呼び出せる。これはNotion AIと同じ仕様。
  </div>
</div>

---

## 実際にやってみる流れ

1. `/create-character` で、自分専用のキャラクターを作ってみる
2. 作ったキャラクターと会話しながら、**自分の業務**を教えてみる（`teach-my-work`）
3. その内容を `/make-my-slides` で、**スライドにしてみる**

<div class="pocket">
  <img class="icon" src="./assets/characters/pocket.svg" alt="pocket" />
  <div>
    <span class="label">ポイント</span>
    3つのSkillは別々の道具ではなく、この順番でつながっている。まずはこの流れを一通り体験してみよう。
  </div>
</div>

---

<!-- _class: closing -->

# 次回は「ファイル形式」を学びます

<img class="mascot" src="./assets/characters/mascot-yellow.svg" alt="mascot" />

<p class="small">第3回：ファイル形式の基本を学ぶ</p>
