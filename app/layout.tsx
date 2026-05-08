import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "今日の散歩道",
  description: "出発地、距離、テーマから散歩先候補を探して記録するアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
