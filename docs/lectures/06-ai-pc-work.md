---
marp: true
theme: bnv-lecture
paginate: true
---

<!-- _class: title -->

<span class="kicker">AI勉強会 第6回（最終回）</span>

# AIにPC作業を任せる／自分専用の助手を作る

<p class="lead">環境が整えば、AIは実際に手を動かして資料まで作ってくれる。<br>そこから先は、自分の分身として育てていく助手になる。</p>

<img class="mascot" src="./assets/characters/mascot-blue.svg" alt="mascot" />

---

## 今回のゴール

- Git / Node.jsのセットアップが終わっている
- GitHubから自分のRepositoryをcloneして、AIに資料を作ってもらえる
- 自分専用の助手として育てる考え方と、ツールの使い分けが分かる

---

## 目次

1. Git / Node.jsの環境セットアップ
2. GitHubからRepositoryをcloneする
3. 資料を作ってみる
4. MyGPT / Codexを自分専用に育てる
5. 自分の分身として仕事を任せる
6. Notion AI / ChatGPT / Codexの使い分け

---

<!-- _class: divider -->

<div class="num">01</div>

# Git / Node.jsの環境セットアップ

<img class="mascot" src="./assets/characters/mascot-yellow.svg" alt="mascot" />

---

## 何を入れるか

- **Git**：変更履歴を記録するために必要
- **Node.js**：一部のツール（整合性検査など）を動かすために必要
- どちらも、やりたいことによって必要かどうかが変わる

<div class="pocket">
  <img class="icon" src="./assets/characters/pocket.svg" alt="pocket" />
  <div>
    <span class="label">ポイント</span>
    何をするのに何が必要かは、毎回同じではない。迷ったら手順書の対応表を確認する。
  </div>
</div>

---

<!-- _class: divider -->

<div class="num">02</div>

# GitHubからRepositoryをcloneする

<img class="mascot" src="./assets/characters/mascot-blue.svg" alt="mascot" />

---

## cloneとは

- GitHub上のRepositoryを、**自分のPCへ丸ごとコピーする**操作
- clone した瞬間から、そのフォルダは自分のローカルRepositoryになる
- 以降は、そのフォルダの中でAIに作業を頼んでいく

```powershell
git clone https://github.com/<ユーザー名>/<リポジトリ名>
```

---

<!-- _class: divider -->

<div class="num">03</div>

# 資料を作ってみる

<img class="mascot" src="./assets/characters/mascot-yellow.svg" alt="mascot" />

---

## 実際にAIへ頼む流れ

1. cloneしたフォルダをAIツールで開く
2. 作りたい資料の目的と形式を伝える
3. AIが下書きを作る → 中身を確認する → 直してもらう
4. できあがったら、commit・push で残す

<div class="caution">
  <img class="icon" src="./assets/characters/bigvoice.svg" alt="icon" />
  <div>
    <span class="label">ガキ大将の注意報</span>
    「いい感じの資料作って」だけだと迷子になる。誰向けか、何を伝えたいか、どんな形式かを最初に伝える。
  </div>
</div>

---

<!-- _class: divider -->

<div class="num">04</div>

# MyGPT / Codexを自分専用に育てる

<img class="mascot" src="./assets/characters/mascot-blue.svg" alt="mascot" />

---

## 自分専用にカスタムする

- MyGPTは、**自分用の前提や話し方を設定したAI**
- Codexは、**自分の作業フォルダを理解した状態で手を動かすAI**
- どちらも、育てるほど自分に合った返答をしてくれる

<div class="pocket">
  <img class="icon" src="./assets/characters/bell.svg" alt="bell" />
  <div>
    <span class="label">ひみつ道具メモ</span>
    量産型ロボットも、話しかけ続けるうちに自分専用の相棒になっていく。
  </div>
</div>

---

<!-- _class: divider -->

<div class="num">05</div>

# 自分の分身として仕事を任せる

<img class="mascot" src="./assets/characters/mascot-yellow.svg" alt="mascot" />

---

## 任せられる状態とは

- 自分の業務知識（Second Brain）が整理されている
- よく頼む作業がSkillとして手順化されている
- 何を確認してほしいか、AI側にも伝わっている

- この3つが揃うほど、**「説明」より「確認」で仕事が回る**ようになる

---

<!-- _class: divider -->

<div class="num">06</div>

# Notion AI / ChatGPT / Codexの使い分け

<img class="mascot" src="./assets/characters/mascot-blue.svg" alt="mascot" />

---

## 得意分野で選ぶ

| ツール | 得意なこと |
|---|---|
| Notion AI | すでにNotionにある情報の整理・要約 |
| ChatGPT | 対話・壁打ち・アイデア出し |
| Codex | ファイル操作を伴う実作業の代行 |

<div class="caution">
  <img class="icon" src="./assets/characters/bigvoice.svg" alt="icon" />
  <div>
    <span class="label">ガキ大将の注意報</span>
    1つのツールで何でも済ませようとしない。道具箱は、道具が複数あるから便利なんだ。
  </div>
</div>

---

<!-- _class: closing -->

# お疲れさまでした！

<img class="mascot" src="./assets/characters/mascot-blue.svg" alt="mascot" />

<p class="small">全6回、これで完了です。今日からは、自分の道具箱を育てていきましょう。</p>
