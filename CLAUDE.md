# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Tower of Effortisは、塔を攻略するブラウザベースのRPGゲームです。React + TypeScript + Viteで構築されており、データ永続化にはIndexedDBを使用しています。

## 開発コマンド

```bash
# 開発サーバーの起動
npm run dev

# TypeScriptの型チェックとビルド
npm run build

# ESLintの実行
npm run lint

# ビルドプレビュー
npm run preview
```

## アーキテクチャ概要

### コンポーネント構造

- **Top.tsx**: トップページ。作成された塔の一覧表示と新規作成機能
- **Floor.tsx**: ゲームのメイン画面。フロア進行型の戦闘システムを実装
- **TowerModal.tsx**: 塔の新規作成モーダル
- **AppRoutes.tsx**: React Routerによるルーティング設定

### ルーティング

- `/` - トップページ（塔一覧）
- `/floor/:towerId` - ゲーム画面（特定の塔のフロア攻略）

### データ管理

- **IndexedDB**: `src/utils/indexedDB.ts`で管理
  - データベース名: `TowerOfEffortisDB`
  - ストア: `towers`（将来的に`tasks`、`users`も実装予定）
- **データモデル**: `src/utils/models.ts`で定義
  - Tower型: `{ id: number, name: string, createdAt: string }`

### ゲームシステム

- **戦闘システム**: アタックポイント（AP）を消費して攻撃
- **フロア進行**: モンスターを倒すと次のフロアへ
- **難易度**: 各フロアのモンスターHP = 100 × フロア数
- **アニメーション**: CSS animationを使用した攻撃演出

## 開発時の注意点

1. **IndexedDB操作**: 非同期処理のため、必ずasync/awaitを使用
2. **ルーティング**: パラメータ取得時は`useParams`フックを使用
3. **スタイリング**: コンポーネント固有のCSSファイル（例: Floor.css）を使用
4. **画像アセット**: publicフォルダに配置（例: hero02_sm.gif, 17.gif）