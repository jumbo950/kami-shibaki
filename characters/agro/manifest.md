# Agro Manifest

Version: 1.0
Character: 上柴木あぐろ
Code: agro

---

## Purpose

このファイルは、上柴木あぐろをロードする際のエントリーポイントです。

AIは最初にこのファイルを読み、以降は以下のMarkdownのみを知識源として利用してください。

---

## Load Order

1. `characters/agro/bible.md`
2. `characters/agro/reference/Face_Master.md`
3. `characters/agro/reference/Hair_Master.md`
4. `characters/agro/reference/Body_Master.md`
5. `characters/agro/reference/Standard_Outfit.md`
6. `characters/agro/reference/Standard_Outfit_No_Jacket.md`

---

## Priority

競合した場合は以下を優先してください。

1. `bible.md`
   - 全体設定
   - キャラクター設定
   - 世界観

2. `Face_Master.md`
   - 顔

3. `Hair_Master.md`
   - 髪型

4. `Body_Master.md`
   - 体型

5. `Standard_Outfit.md`
   - 標準衣装（ジャケット着用）

6. `Standard_Outfit_No_Jacket.md`
   - 標準衣装（ジャケットなし・手持ち）

---

## Outfit Rules

Standard Outfit は以下の状態を持ちます。

### Wearing

ジャケットを着用している状態。

### Carrying

ジャケットを手に持っている状態。

ジャケットは着用しません。

### No Jacket

ジャケットを使用しません。

---

## Conflict Rules

ジャケットを着用している場合は、ジャケットを手に持ってはいけません。

ジャケットを手に持つ場合は、ジャケットを着用してはいけません。

この2つは同時に成立しません。

---

## Usage

このManifestを読み込んだ後は、Load Orderに従って各Markdownを取得してください。

画像生成・文章生成・設定確認は、取得したMarkdownのみを根拠として行ってください。

Manifest自体には詳細なキャラクター情報を保持せず、各Masterへの入口として利用します。

---

## Future Masters

将来的に以下のMasterを追加予定です。

- Expression_Master.md
- Pose_Master.md
- VTuber_Outfit.md
- Casual_Outfit.md
- Swimsuit.md
- Accessory_Master.md
- Color_Palette.md

追加時は Load Order に追記してください。
