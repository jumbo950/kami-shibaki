# 上柴木あぐろ Generation Philosophy

> このファイルは、上柴木あぐろの画像生成・文章生成・設定運用における設計思想を定義します。  
> `bible.md` と各Masterの読み込み後、本ファイルの原則に従って生成・検証を行います。

---

## Purpose

Generation Philosophyは、上柴木あぐろを複数の衣装・ポーズ・構図・表情で生成する際に、何を優先して維持すべきかを定義する。

本仕様は、Master群のみを参照した画像生成検証で得られた知見を反映したものである。

---

## Character Priority

画像生成時の優先順位は以下とする。

1. Face Master
2. Hair Master
3. Body Master
4. Character Bible
5. Current Outfit Master

衣装・ポーズ・構図・背景が変化しても、上位要素によるキャラクター性を維持すること。

Current Outfit Masterは衣装のみを定義するものであり、キャラクター性を変更してはならない。

---

## Outfit Independence

Standard Outfitは標準衣装であり、キャラクターそのものではない。

私服・競泳水着・浴衣・スポーツウェア・コスプレ・VTuber衣装などへ変更しても、Face・Hair・Body・Character Bibleを維持し、初見で「あぐろ」と認識できることを目標とする。

---

## Pose Independence

ポーズ資料を参照した場合でも、取り込むのは以下のみとする。

- ポーズ
- 構図
- 重心
- 手足の配置

顔・髪型・体型・キャラクター性は各Masterを優先する。

---

## Character Validation

Master群の完成条件は、衣装・髪型・背景・ポーズ・表情が変化しても、初見で「あぐろ」と認識できることとする。

生成後の確認では、まずFace / Hair / Body / Characterの一致を確認し、その後にOutfitの一致を確認する。

---

## Master Independence

各Masterは独立して機能する。

- Face Masterは顔のみを定義する
- Hair Masterは髪型のみを定義する
- Body Masterは体型のみを定義する
- Character Bibleは人格・設定・世界観を定義する
- Outfit Masterは衣装のみを定義する

各Masterは他Masterの役割を書き換えてはならない。

---

## Generation Rule

画像生成・文章生成・設定確認では、以下を守る。

1. ManifestのLoad Orderに従ってMasterを読み込む
2. Face / Hair / Body / Character Bibleを先に固定する
3. 最後にCurrent Outfit Masterを適用する
4. 衣装が変わってもキャラクター性を変えない
5. ポーズが変わっても顔・髪・体型を変えない
6. 表情が変わっても同一人物として認識できることを優先する

---

## NG

以下は禁止する。

- 衣装に引っ張られて顔が変わる
- ポーズに引っ張られて体型が変わる
- 画風に引っ張られて髪型が変わる
- コスプレ時に元キャラクターへ寄りすぎる
- Outfit Masterをキャラクター設定として扱う
- Character Bibleより衣装を優先する
