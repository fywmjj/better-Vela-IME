![プレビュー画像](/preview.png)

# better-Vela-IME (Vela入力メソッドリファクタリング版)

> [!NOTE]
> このプロジェクトは [NEORUAA/Vela_input_method](https://github.com/NEORUAA/Vela_input_method) のリファクタリングおよび最適化バージョンであり、パフォーマンスの向上、機能の追加、既知の問題の修正を目的としています。

---

[简体中文](/README.md) • [English (US)](/README.en_US.md) • 日本語

---

## 🤔 なぜリファクタリングするのか？

オリジナルの `Vela_input_method` は基本的な入力メソッド機能を提供していましたが、特に最大限の効率と安定性を求める場合においては、改善の余地がありました：

*   **パフォーマンスのボトルネック:** 特定の状況、特に高速入力時や候補が多い場合に、顕著な遅延が感じられ、入力の流暢さに影響を与える可能性がありました。
*   **機能不足:** 「連拼（連続ピンイン）」入力のサポートが不足しており、これに慣れているユーザーにとっては、頻繁に手動で選択したりピンインを区切ったりする必要があり、入力効率が低下していました。
*   **安定性の問題:** 一部の特定の操作や予期しない状況で、入力メソッドがフリーズしたり無反応になったりすることがあり、ユーザーエクスペリエンスに影響を与えていました。

---

## 🔧 私が行った変更

上記の考慮事項に基づき、`Vela_input_method` を包括的にリファクタリングおよび最適化しました。主な目標は、より速く、よりスマートで、より安定した入力体験を提供することです。

### ✨ 卓越したパフォーマンス向上

*   **大幅なパフォーマンス向上:** コアアルゴリズムの最適化、候補マッチングロジックの改善、リソース管理の向上により、キーレスポンスの遅延と候補読み込み時間を大幅に削減しました。日常のタイピングでも高速入力でも、よりスムーズで即時的なフィードバックを体感できます。

### ⌨️ よりスマートな入力サポート

*   **連拼（連続ピンイン）入力のサポート追加:** 「連拼」機能のサポートを実装しました。ユーザーは完全なピンイン文字列（例：`nihaoma`）を連続して入力できるようになり、システムがインテリジェントに分節化し、対応する候補を表示するため、長い文章やよく使うフレーズの入力効率が大幅に向上しました。

### 🧱 より強力なプログラムの堅牢性

*   **予期しない状況でのフリーズ問題を修正:** 元のバージョンでフリーズや無反応を引き起こす可能性のあったシナリオ（特定の入力シーケンスやリソース競合など）を詳細に分析し、修正しました。状態管理とエラー処理メカニズムを改善することで、さまざまな複雑な使用シナリオにおける入力メソッドの安定性を強化しました。

---

## 手動インストール

### プロジェクトコードのダウンロード

```bash
$ git clone https://github.com/fywmjj/better-Vela-IME.git
```

### コードのコピー
プロジェクト内の `components` フォルダを、コンポーネントを使用したいプロジェクトの `src` ディレクトリにコピーします。その後、カスタムコンポーネントの使用方法に従ってこのコンポーネントを使用できます。

---

## コンポーネント名
`input-method`

## 概要
入力メソッド機能

## サブコンポーネント
サポートされていません。

## プロパティ
| 名称 | 型 | デフォルト値 | 必須 | 説明 |
| --------  | :----:  | :----:  | :----:  | :---- |
| hide | boolean | true | はい | キーボードを表示するかどうか（開発者はこのプロパティを切り替えることでキーボードを非表示または表示できます）。 |
| keyboardtype | string | "QWERTY" | いいえ | キーボードレイアウト。「QWERTY」はフルキーボード、「T9」はT9レイアウト。デフォルトは「QWERTY」です。（`screentype`が「circle」でない場合、フルキーボードのみ利用可能です）。 |
| maxlength | number | 5 | いいえ | デフォルトで表示するピンイン候補の数。`maxlength` > 0 の場合に有効。クリックするとすべての候補が表示されます。 |
| vibratemode | string | "" | いいえ | 振動モード。「」は入力時に振動なし、「long」は長い振動、「short」は短い振動。デフォルトは「」です。 |
| screentype | string | "circle" | いいえ | デバイスの画面タイプ。「rect」は長方形画面レイアウト（designWidth ≥ 336に対応）、「circle」は円形画面レイアウト（designWidth 480に対応）、「pill-shaped」はピル型画面レイアウト（designWidth 192に対応）。 |

## イベント
| 名称 | パラメータ | 説明 |
| --------  | :-----  | :---- |
| complete | { detail: { content: string } } | キーボードが文字を出力したときにトリガーされます（中国語入力の場合、ピンインに対応する文字が選択されたときにトリガーされます。英語入力の場合、`keyDown`と同じ条件でトリガーされます）。 |
| delete | - | キーボードの削除ボタンがクリックされたときにトリガーされます。 |
| keyDown | { detail: { content: string } } | キーボードのボタンが押されたときにトリガーされます。 |
| visibilityChange | { detail: { visible: boolean } } | キーボードが表示または非表示になったときにトリガーされます。`visible`は表示状態を示します。 |

## サンプルコード
```html
<import name="input-method" src="../../components/InputMethod/InputMethod.ux"></import>
<template>
  <div class="page" style="flex-direction: column;">
    <text class="text" @click="changeState">
      {{textValue}}_
    </text>
    <input-method
      hide="{{hide}}"
      keyboardtype="{{keyboardtype}}"
      maxlength="5"
      vibratemode="{{vibratemode}}"
      screentype="{{screentype}}"
      @visibility-change="onVisibilityChange"
      @key-down="onKeyDown"
      @delete="onDelete"
      @complete="onComplete"
    ></input-method>
  </div>
</template>

<script>
export default {
  private: {
    textValue: "",
    hide: false,
    keyboardtype: "QWERTY", //QWERTY, T9
    vibratemode: "short",
    screentype: "circle", //pill-shaped, rect, circle
  },
  onVisibilityChange(evt) {
    console.log("表示状態変更:"+JSON.stringify(evt));
  },
  onKeyDown(evt) {
    // this.textValue += evt.detail.content;
    console.log("キー押下:"+JSON.stringify(evt));
  },
  onDelete() {
    this.textValue = this.textValue.slice(0, -1);
    console.log("文字削除");
  },
  changeState() {
    this.hide = !this.hide;
  },
  onComplete(evt) {
    this.textValue += evt.detail.content;
    console.log("文字返却:"+JSON.stringify(evt));
  },
};

</script>

<style>
.page{
  width:480px;
  height:480px;
}

.text{
  position:absolute;
  left:0;
  top:60px;
  width:100%;
  height:80px;
  text-align:center;
  color:white;
  background-color: red;
}
</style>
```

## 免責事項

*   このプロジェクトは `NEORUAA/Vela_input_method` の非公式なリファクタリングおよび最適化バージョンであり、学習と技術研究を目的としています。
*   このプログラムは完全に無料であり、ソースコードはオープンソースライセンスの下で利用可能です。いかなる商業目的での使用も禁止されています。
*   このプログラムの使用によって生じる可能性のあるいかなる問題についても、開発者は責任を負いません。

## 謝辞

*   このプロジェクトの強固な基盤を提供してくださった、`Vela_input_method` のオリジナルバージョンを作成した **@NEORUAA** 氏に感謝します。
