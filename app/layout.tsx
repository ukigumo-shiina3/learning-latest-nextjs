import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  // title: 'Acme Dashboard',
  title: {
    template: '%s | Acme Dashboard', // %s→特定のページタイトルに置き換えることができる
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

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
