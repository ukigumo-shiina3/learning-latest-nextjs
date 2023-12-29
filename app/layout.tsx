import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* antialiased→tailwindのユーティリティクラス。フォンを滑らかにするクラスでサイトが綺麗に見えることに繋がる */}
        {children}
      </body>
    </html>
  );
}
