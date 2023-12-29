import { Inter, Lusitana } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
// subsets→指定されたサブセット（この場合は 'latin'）を含むフォントを生成
// latin→ラテン文字なので英語も含まれる。全部読み込むのではなく、ラテン文字だけを指定して読み込むことでサイズ削減し最適化する

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});
