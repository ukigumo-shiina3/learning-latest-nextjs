'use server'; // トップレベルに'use server'を書くことでモジュールごとにサーバーアクションを適用できる

import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(), //coerce→指定された型に変換するためのメソッド
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    //parse処理→与えられたデータがスキーマ(FormSchema)に合致するかどうかを検証し、合致する場合はスキーマに基づいてデータを変換して返す
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // console.log(rawFormData);
  // console.log(typeof rawFormData.amount);
  //本来はamount(金額)なので、logを出した時に型はintegerを期待するが、実際にはstringが返却される。理由としては、ネットワークを介した操作になるので、シリアライズ化できるものでないといけない。ネットワーク通信の過程で特定の形式に変換されるため、結果として文字列化されてしまう。
}
