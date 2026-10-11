# hiyo-japanese

日本語レッスンと、東京のプライベートツアーを紹介するサイト（https://www.hiyo-japanese.com）。
Next.js 15（App Router）、React 18、Tailwind CSS 3、TypeScript。Vercel で公開している。

## 使い方

```bash
npm install
npm run dev     # 開発サーバー (http://localhost:3000)
npm run build   # 本番ビルド
npm start       # ビルド後に起動
```

初回のビルドは、Google Fonts の取得に時間がかかることがある（2回目以降はキャッシュされる）。

## 構成

| 場所 | 内容 |
|---|---|
| `app/` | ページ（`/`、`/top`、`/guidePage`、`/priceList`、`/payment` など）と API |
| `components/` | 共通部品（ヘッダー、フッター、`ui.tsx`、プラン・ツアーの一覧） |
| `lib/site.ts`、`lib/plans.ts` | メールアドレス・SNS・ナビ・料金プランの定義 |
| `app/api/tours/` | ツアー一覧を返す API（`GET /api/tours`） |
| `data/tours.json` | ツアーの名前・料金・詳細の元データ |
| `public/images/` | 画像（内容が分かる名前で置く） |
| `next.config.js` | セキュリティヘッダー、リダイレクト |
| `tailwind.config.js` | 配色（`ink` `cream` `sakura` など）とフォント |

決済は Stripe の Payment Link（`app/payment/page.tsx`）。問い合わせは `mailto:` のリンクで受けている。
開発の注意点は `CLAUDE.md` を参照。
