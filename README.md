# 今日の散歩道

距離とテーマを選んで、今日歩きたい場所を見つける散歩アプリです。

## Google Places API連携メモ

v1.6ではGoogle Places API連携の準備だけを行い、実API呼び出しはまだ行いません。APIキー未設定でも、これまで通りサンプル候補が表示されます。

Google Cloud側の作業:

1. Google Cloudプロジェクトを作成する
2. 請求先アカウントを設定する
3. Places APIを有効にする
4. APIキーを作成する
5. APIキーにHTTPリファラー制限を設定する
6. API制限でPlaces APIだけを許可する
7. 予算アラートを設定する
8. `.env.local` にAPIキーを設定する

`.env.local` の例:

```env
NEXT_PUBLIC_ENABLE_PLACES_API=true
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

`NEXT_PUBLIC_` 付きの環境変数はブラウザ側に公開されます。必ずGoogle Cloud Console側でHTTPリファラー制限とAPI制限を設定してください。
