# Tower of Effortis

## 概要

Tower of Effortisは、塔を攻略するブラウザベースのRPGゲームです。プレイヤーはヒーローとなり、各フロアのモンスターを倒しながら塔を登っていきます。

## 特徴

- 🗼 複数の塔を作成・管理可能
- ⚔️ シンプルな戦闘システム（アタックポイント制）
- 📈 フロアが上がるごとに難易度が上昇
- 💾 IndexedDBによるローカルデータ保存

## 技術スタック

- **フロントエンド**: React 18 + TypeScript
- **ビルドツール**: Vite
- **ルーティング**: React Router v6
- **データ永続化**: IndexedDB
- **スタイリング**: CSS Modules

## セットアップ

### 必要要件

- Node.js 18以上
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/tower_of_effortis.git
cd tower_of_effortis

# 依存関係のインストール
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:5173 を開いてください。

## 使用可能なスクリプト

```bash
# 開発サーバーの起動
npm run dev

# プロダクションビルド
npm run build

# ビルドのプレビュー
npm run preview

# ESLintの実行
npm run lint
```

## ゲームの遊び方

1. **塔の作成**: トップページで「新しい塔を作成」ボタンをクリック
2. **塔の名前を入力**: モーダルで塔の名前を入力して作成
3. **ゲーム開始**: 作成した塔をクリックしてゲーム画面へ
4. **戦闘**: 「攻撃」ボタンでモンスターにダメージを与える
5. **フロア進行**: モンスターを倒すと次のフロアへ自動的に進む

### 戦闘システム

- **アタックポイント（AP）**: 攻撃にはAPを消費します
- **ダメージ計算**: 基本ダメージ20にランダム要素を加算
- **モンスターHP**: フロア数 × 100

## プロジェクト構造

```
tower_of_effortis/
├── public/
│   ├── hero02_sm.gif    # ヒーロー画像
│   ├── 17.gif           # モンスター画像
│   └── icon.svg         # アプリアイコン
├── src/
│   ├── components/
│   │   ├── AppRoutes.tsx    # ルーティング設定
│   │   ├── Floor.tsx        # ゲーム画面
│   │   ├── Floor.css        # ゲーム画面スタイル
│   │   ├── Top.tsx          # トップページ
│   │   ├── Top.css          # トップページスタイル
│   │   └── TowerModal.tsx   # 塔作成モーダル
│   ├── utils/
│   │   ├── indexedDB.ts     # IndexedDB操作
│   │   └── models.ts        # データモデル定義
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── CLAUDE.md            # Claude Code用の開発ガイド
```

## 今後の実装予定

- [ ] ユーザー管理システム
- [ ] AP連携機能
- [ ] ゲーム性の拡張

## ドキュメント

このドキュメントはclaude codeにより作成
