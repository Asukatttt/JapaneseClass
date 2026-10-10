# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Next.js 15 App Router で作った、日本語レッスンとプライベートツアーを紹介・予約受付するサイト。
ページは `app/` 配下、共通部品は `components/` と `lib/` に置く。
- `app/layout.tsx` が `SiteHeader` / `SiteFooter` を全ページに付け、フォント(Zen Maru Gothic、DM Sans)を読み込む。
- `components/ui.tsx` に `Button` `Section` `CtaBand` などの共通UI。色は `tailwind.config.js` の `ink` `cream` `sakura` など。
- `lib/site.ts` にメールアドレス・SNS・ナビ・体験レッスンの決済リンク、`lib/plans.ts` に月額プランの定義。

## コマンド

開発サーバーは `npm run dev`、本番ビルドは `npm run build`、起動は `npm start`。lint とテストは未設定。

## ルーティング

`/` はトップで、レッスン用の `/top` とツアー用の `/guidePage` に分かれる。料金は `/priceList` と `/priceList/trialPage`、決済は `/payment`。`/japanTour` は旧デザインのまま残っていて、サイト内からリンクされていない。

## 予約API

`app/api/reserve/route.ts` は `GET` だけで、`app/api/reserve/data.json` の `tours` を毎回ディスクから読んで返す(`components/TourList.tsx` が取得する)。ツアーの名前・料金・詳細の元データはこのJSON。
以前あったメール送信の `POST` と `nodemailer` は、使われていないため削除した。予約はメール(`mailto:`)で受けている。再び作る場合は、入力チェックと回数制限を付ける。

## 注意点

DBは使っていない。MongoDBは無効化したあと、`lib/mongodb.ts` も削除した(`package.json` に `mongodb` が残っているが、コードからは使っていない)。

決済はStripeのPayment Link方式で、`app/payment/page.tsx` にプラン名ごとの決済URLを直接書いている。プラン名(URLの `name`)から引くだけで、URLでの上書きはできない(悪用を防ぐため削除した)。`stripe` npmパッケージは使っていない。

`Guide-page/` は、ローカルにだけある独立したExpressのデモで、Gitでは管理していない(リポジトリには入っていない)。Next.jsアプリとは無関係で、ビルド対象にも含まれない。

ルート直下の `install.sh` はClaude Codeのインストーラで、プロジェクトのコードではない。

## 禁止事項

git操作(commit・push・ブランチ作成など)を行う際は、AskUserQuestion などでユーザーの承認を得てから実行する。
本番環境に関わるデプロイ系の処理(デプロイ、本番への反映など)は、絶対に勝手に行わない。
依存パッケージの追加・更新・削除(`npm install` や `package.json` の変更)は、ユーザーの承認を得てから行う。
Stripeの決済URLや料金(`app/payment/page.tsx` など)の変更は、ユーザーの承認を得てから行う。
`/api/reserve` を実際に呼び出して先生のGmailへメールを送る操作は、テスト目的でも、ユーザーの承認を得てから行う。
