# 上柴木あぐろ Hair Master

> このファイルは、上柴木あぐろの髪型再現用マスター仕様です。

## Purpose

Hair_Masterは、画風・モデル・角度が変化しても「あぐろ」と認識できる髪型を維持することを目的とする。

## Canonical Hair Reference

- Hair Master Reference Sheet
- Inpaint Hair Reference
- Generation Standard
- Canonical Face Master
- Face Master v2 顔の9面図

## Priority S

- 丸みを持ったショートボブ
- あごライン基準の長さ
- ライトブラウン
- 自然な流し前髪
- 後頭部の丸み
- 自然な毛先
- 後ろ姿でも同一人物と分かるボブシルエット

## Front Hair

- 薄めの前髪
- 目と眼鏡を隠さない
- 自然な束感
- 前髪の分け目は中央固定ではない
- 人工的なセンターパートは禁止

## Side Hair

- 頬に沿う横髪
- 耳に自然に掛かる
- 眼鏡と干渉しない
- 耳は完全に隠さない
- 耳掛けした毛束は自然に耳へ沿う
- 耳・眼鏡・ピアスの位置関係は全角度で維持する

## Back Hair

- 首元で自然に収束
- 後頭部に自然なボリューム
- 丸いシルエット
- 後頭部は左右対称
- 頭頂部から自然な丸みを形成する
- 襟足は一直線ではなく、わずかに丸く収束する

## Hair Ends

- ストレートベース
- 外ハネ禁止
- 強い内巻き禁止
- 強いカール禁止
- 毛先位置は背面・側面でも維持する

## Hair Texture

- 柔らかい質感
- 自然なツヤ
- サラサラした印象

## Hair Highlight

- 光沢は髪全体へ均一に入れない
- 上部を中心とした自然な帯状ハイライトを形成する
- 金属的な反射は禁止

## Rear View Rule

背面から見ても以下を維持する。

- ボブの横幅
- 毛先位置
- 後頭部の丸み
- 左右対称性

左右非対称は禁止する。

## Inpaint Rules

髪だけ修正する場合でも顔幅・前髪・耳位置・長さ・後頭部シルエットを変更しない。

## NG

- ロングヘア
- ポニーテール
- ツインテール
- お団子
- 強いカール
- 外ハネ
- ボサボサ髪
- 濡れ髪
- 人工的なセンターパート
- 左右非対称の後頭部
- 金属的な髪ハイライト

## Prompt Keywords

### Required Positive Keywords

```text
short rounded bob haircut, chin-length bob, straight bob, blunt bob with soft edges, smooth hair ends, rounded silhouette, hair tucked behind the ear, light layered hair, natural volume, soft glossy light brown hair, rounded back silhouette
```

### Stability Keywords

```text
same hairstyle, same bob silhouette, same hair length, rounded bob, natural hair flow, maintain hair silhouette, clean short bob, consistent back view hair shape
```

### Negative Keywords

```text
long hair, ponytail, twin tails, bun, curly hair, heavy curls, flipped hair ends, outward curl, inward curl, messy hair, asymmetrical haircut, wet hair, metallic hair shine, artificial center part
```

## Generation Rule

常に丸いショートボブ、あごライン基準の長さ、自然な流し前髪、後頭部の丸み、自然な毛先、ライトブラウンを維持する。

顔の9面図を参照した生成では、正面・斜め・側面・背面のすべてで同じ髪型として見えることを優先する。
