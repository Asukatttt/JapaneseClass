# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Next.js 15 App Router で作った、日本語レッスンとプライベートツアーを紹介・予約受付するサイト。
ページは `app/` 配下に置き、共通コンポーネントは使わず、各ページがTailwindのクラスを直接書く構成。

## コマンド

開発サーバーは `npm run dev`、本番ビルドは `npm run build`、起動は `npm start`。lint とテストは未設定。

## ルーティング

`/` はトップで、レッスン用の `/top` とツアー用の `/guidePage` に分かれる。料金は `/priceList` と `/priceList/trialPage`、ツアー関連は `/japanTour`、決済は `/payment`。

## 予約API

`app/api/reserve/route.ts` の `POST` は、`{ name, email, message }` を nodemailer 経由で先生のGmailに送る。`.env.local` に `EMAIL_USER` と `EMAIL_PASS`(Gmailのアプリパスワード)が必要で、未設定だと500を返す。
同ファイルの `GET` は `app/api/reserve/data.json` の `tours` を毎回ディスクから読んで返す。ツアーの名前・料金・詳細の元データはこのJSON。

## 注意点

MongoDBは意図的に無効化していて、`lib/mongodb.ts` はスタブ(`Promise.resolve(null)`)。予約はDBに保存されず、メール送信のみ。

決済はStripeのPayment Link方式で、`app/payment/page.tsx` にプラン名ごとの決済URLを直接書いている(`?stripe=` で上書き可)。`paymentComponent.tsx` はダミーで未使用。`stripe` npmパッケージは使っていない。

`Guide-page/` は独立したExpressのデモで、Next.jsアプリとは無関係(`npm start` で別に起動する)。ビルド対象にも含まれない。

ルート直下の `install.sh` はClaude Codeのインストーラで、プロジェクトのコードではない。

## 禁止事項

git操作(commit・push・ブランチ作成など)を行う際は、AskUserQuestion などでユーザーの承認を得てから実行する。
本番環境に関わるデプロイ系の処理(デプロイ、本番への反映など)は、絶対に勝手に行わない。
依存パッケージの追加・更新・削除(`npm install` や `package.json` の変更)は、ユーザーの承認を得てから行う。
Stripeの決済URLや料金(`app/payment/page.tsx` など)の変更は、ユーザーの承認を得てから行う。
`/api/reserve` を実際に呼び出して先生のGmailへメールを送る操作は、テスト目的でも、ユーザーの承認を得てから行う。
