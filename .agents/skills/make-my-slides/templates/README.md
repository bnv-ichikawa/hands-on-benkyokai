# テンプレートの保管場所

現在の標準は、公式スライドマスタから作った PowerPoint テンプレートを使う方式です。

```text
templates/
└── bnv-master/
    └── template.pptx
```

`template.pptx` には、公式デッキのスライドマスタとレイアウトだけが残っています。背景写真、ロゴ、配色、ページ番号、`CONFIDENTIAL` 表示はマスタ側に含まれます。

スライドの内容は `outputs/<名前>.json` に書きます。`.pptx` 化が必要な場合は、PowerPoint や利用可能なプレゼンテーション作成機能で公式マスタへ反映します。

## テンプレートを更新するとき

公式スライドマスタが更新された場合は、PowerPoint 側で `bnv-master/template.pptx` を差し替えます。

このリポジトリでは、PowerPoint で編集できる `.pptx` を正本として扱います。
