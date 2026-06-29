# Agro Manifest

Version: 1.2
Character: 上柴木あぐろ
Code: agro

---

## Purpose

このファイルは、上柴木あぐろをロードする際のエントリーポイントです。

AIは最初にこのファイルを読み、以降は以下のMarkdownのみを知識源として利用してください。

---

## Load Order

1. `characters/agro/bible.md`
2. `characters/agro/reference/Generation_Philosophy.md`
3. `characters/agro/reference/Face_Master.md`
4. `characters/agro/reference/Hair_Master.md`
5. `characters/agro/reference/Body_Master.md`
6. `characters/agro/reference/Standard_Outfit.md`
7. `characters/agro/reference/Standard_Outfit_No_Jacket.md`

---

## Priority

競合した場合は以下を優先してください。

1. `bible.md`
   - 全体設定
   - キャラクター設定
   - 世界観

2. `Generation_Philosophy.md`
   - 生成時の優先順位
   - Master間の独立性
   - 衣装・ポーズ差し替え時の原則

3. `Face_Master.md`
   - 顔

4. `Hair_Master.md`
   - 髪型

5. `Body_Master.md`
   - 体型

6. `Standard_Outfit.md`
   - 標準衣装（ジャケット着用）

7. `Standard_Outfit_No_Jacket.md`
   - 標準衣装（ジャケットなし・手持ち）

---

## AI Loading Instruction

When loading this character:

1. Read `manifest.md`
2. Read every Markdown file listed in Load Order
3. Build one internal character specification from the loaded Markdown files
4. Use ONLY this internal character specification for future generations in this chat

Do not use previous conversations.

Do not use memory.

Do not use attached images unless the user explicitly says to use them.

Do not infer missing settings.

If information is missing, report it instead of guessing.

---

## Loading Principle

### Master Loading Order

Masterは以下の順序で読み込む。

1. Character Bible
2. Generation Philosophy
3. Face Master
4. Hair Master
5. Body Master
6. Outfit Master

---

### Master Independence

各Masterは独立した設計資料である。

Face・Hair・Body・Character Bibleは衣装変更時にも保持する。

Outfit Masterは衣装のみを差し替える。

---

### Outfit Replacement Rule

衣装変更時は、変更対象のOutfit Masterのみを差し替える。

以下は再利用する。

- Face Master
- Hair Master
- Body Master
- Character Bible
- Generation Philosophy

---

### Validation Rule

ロード完了後は、Face / Hair / Body / Character の一致を確認した後、最後にOutfitを適用する。

キャラクター性より衣装を優先してはならない。

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
