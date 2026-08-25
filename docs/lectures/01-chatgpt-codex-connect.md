---
marp: true
theme: bnv-lecture
paginate: true
---

<!-- _class: title -->

<span class="kicker">AI勉強会 第1回</span>

# ChatGPT・Codexの仕様を知る／Connectで社内情報を調べる

<p class="lead">AIの得意分野を知り、Connectで社内情報につなぎ、実際に検索して答えを引き出す。<br>今日はその一連の流れをまるごと体験する。</p>

<img class="mascot" src="./assets/characters/mascot-blue.svg" alt="mascot" />

---

## 今回のゴール

- ChatGPTとCodex、それぞれの**役割の違い**を説明できる
- それぞれの**できること・できないこと**を知っている
- Connectの設定を終え、**使える状態にする**
- 実際に社内情報をAIに検索させて、**答えを引き出せる**

<div class="pocket">
  <img class="icon" src="./assets/characters/bell.svg" alt="bell" />
  <div>
    <span class="label">ひみつ道具メモ</span>
    道具は「何でも屋」じゃない。得意なことをやらせるから、ちゃんと働いてくれるんだ。
  </div>
</div>

---

## 目次

1. それぞれの役割
2. できること・できないこと
3. Connectの設定
4. 社内情報を実際に検索する

---

<!-- _class: divider -->

<div class="num">01</div>

# それぞれの役割

<img class="mascot" src="./assets/characters/mascot-blue.svg" alt="mascot" />

---

## ChatGPT の役割

- 基本は**チャットで対話する**AI。質問に答える、文章を作る、要約する
- ただし当社はConnectを使っているため、**チャットの中から作業もできる**
  - PRを出す、Google Slidesを作る、Notionを編集する、など
- 「話すだけ」と考えると、実際の使い方とズレる

---

## Codex の役割

- **手元のファイルを直接操作する**AI。ターミナルやエディタと連携する
- ChatGPTのConnect経由の作業とは違い、**ローカルのファイルをそのまま読み書き**できる
- **サブエージェント**を使って、複数の作業を並行して進められる
- 「指示する→AIが手を動かす→結果を確認する」という流れで進む

<div class="pocket">
  <img class="icon" src="./assets/characters/pocket.svg" alt="pocket" />
  <div>
    <span class="label">ポイント</span>
    「chat特化 vs 作業特化」ではない。ConnectがあればChatGPTも作業をこなす。Codexにしかできないのは、ローカルファイルの直接操作とサブエージェントの利用。
  </div>
</div>

---

<!-- _class: divider -->

<div class="num">02</div>

# できること・できないこと

<img class="mascot" src="./assets/characters/mascot-yellow.svg" alt="mascot" />

---

## できること

<div class="columns">
<div>

**ChatGPT（＋Connect）**
- 文章の作成・要約・翻訳、壁打ち
- Connect先のサービスに対する作業
  - PR作成、Google Slides作成、Notion編集 など

</div>
<div>

**Codex ならでは**
- ローカルのファイルを直接読み書き
- サブエージェントを使った並行作業
- ターミナルでのコマンド実行

</div>
</div>

---

## できないこと・注意点

- どちらも**最新の社内事情を知らない**（教えてあげる必要がある）
- 出力を**そのまま鵜呑みにしない**。最後は人が確認する
- ファイルを直接変更できるCodexは、特に**指示を具体的に**出す

<div class="caution">
  <img class="icon" src="./assets/characters/bigvoice.svg" alt="icon" />
  <div>
    <span class="label">ガキ大将の注意報</span>
    「いい感じにやっといて」だけだと、AIも困ってしまう。何を・どこまで・どんな形でやってほしいかを伝えよう。
  </div>
</div>

---

<!-- _class: divider -->

<div class="num">03</div>

# Connectの設定

<img class="mascot" src="./assets/characters/mascot-blue.svg" alt="mascot" />

---

## Connectとは何か

- AIが**社内のツールやデータに接続する**ための仕組み
- 接続先の例：**Slack、Google Drive、Google Calendar、Notion** など
- 接続していない情報は、AIには**最初から見えていない**

---

## ConnectとMCP、何が違うのか

- **Connect（アプリ）**：OpenAI側があらかじめ用意している接続方法。ボタン1つで認証が完結し、手間が少ない
- **MCP（Model Context Protocol）**：接続先やサードパーティ側が用意する、外部連携のためのオープンな規格
  - OpenAIが用意したものではないため、**認証やアクセス管理は基本的に自分たち側で行う**必要がある
- 迷ったら、まずは公式のConnectで用が足りるかを確認する

<div class="pocket">
  <img class="icon" src="./assets/characters/bell.svg" alt="bell" />
  <div>
    <span class="label">ひみつ道具メモ</span>
    Connectは、あんきパンみたいに「あらかじめ用意された」簡単な道具。MCPは、自分で材料をそろえて組み立てる道具。
  </div>
</div>

---

## Connectを設定する手順

<div class="columns">
<div>

**1. アプリと連携を開く**
チャット画面の「アプリと連携」ボタン、またはプラグインディレクトリを開く

</div>
<div>

**2. アプリを選ぶ**
Slack・Google Drive・Notionなど、使いたいアプリを一覧から選ぶ

</div>
<div>

**3. 接続する**
「接続する」を押し、各サービスのログイン画面で許可する範囲を選ぶ

</div>
<div>

**4. 使ってみる**
チャットの中で「〇〇を探して」と話しかければ利用できる

</div>
</div>

<div class="pocket">
  <img class="icon" src="./assets/characters/pocket.svg" alt="pocket" />
  <div>
    <span class="label">参考（公式・日本語）</span>
    <a href="https://help.openai.com/ja-jp/articles/11487775-apps-in-chatgpt">OpenAI Help Center「ChatGPTのアプリ」</a>／手順の解説は <a href="https://dot-ai.myuuu.co.jp/times/articles/752">「ChatGPTアプリ連携ガイド」</a> も参考になる
  </div>
</div>

---

## 設定の考え方

- 何につなぐかは、**必要な範囲だけ**選ぶ
- 誰の権限でアクセスするかを意識する（自分の権限の範囲内でしか見えない）
- 一度つないで終わりではなく、**使わなくなったら見直す**

<div class="caution">
  <img class="icon" src="./assets/characters/bigvoice.svg" alt="icon" />
  <div>
    <span class="label">ぬけがけ注意報</span>
    つなぎすぎ注意。見えなくていい情報まで見えるようにすると、あとで整理が大変になる。
  </div>
</div>

---

<!-- _class: divider -->

<div class="num">04</div>

# 社内情報を実際に検索する

<img class="mascot" src="./assets/characters/mascot-yellow.svg" alt="mascot" />

---

## 検索してみる

- 「〇〇について社内の資料を調べて」と自然な言葉で頼む
- AIは接続先から関連しそうな情報を探し、要約して答える
- 見つからない場合は、**接続先が足りない**か**言い方が曖昧**なことが多い

---

## うまく引き出すコツ

- 知りたいことを一言で言い切る前に、**背景や目的も添える**
- 一度で満足のいく答えが出なくても、**聞き方を変えて再挑戦**する
- AIの答えは**下調べ**として使い、最終確認は自分で行う

<div class="pocket">
  <img class="icon" src="./assets/characters/pocket.svg" alt="pocket" />
  <div>
    <span class="label">ポイント</span>
    Connect ＝ 情報への「扉」。扉を開けたあとどう聞くかは、自分次第。
  </div>
</div>

---

<!-- _class: closing -->

# 次回は「Repository・Skill」を学びます

<img class="mascot" src="./assets/characters/mascot-blue.svg" alt="mascot" />

<p class="small">第2回：Repository・Skillを知る</p>
