'use server'; // トップレベルに'use server'を書くことでモジュールごとにサーバーアクションを適用できる
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(), //coerce→指定された型に変換するためのメソッド
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    //parse処理→与えられたデータがスキーマ(FormSchema)に合致するかどうかを検証し、合致する場合はスキーマに基づいてデータを変換して返す
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `; //sqlが成功したらrevalidatePathとredirectを実行したいので、tryの中には含めずに外で呼び出す。
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices'); //特定のパスのデータを強制的に再生成してキャッシュをクリアするための関数。パスが再検証されて新しいデータがフェッチされる。
  redirect('/dashboard/invoices');

  // console.log(rawFormData);
  // console.log(typeof rawFormData.amount);
  //本来はamount(金額)なので、logを出した時に型はintegerを期待するが、実際にはstringが返却される。理由としては、ネットワークを介した操作になるので、シリアライズ化できるものでないといけない。ネットワーク通信の過程で特定の形式に変換されるため、結果として文字列化されてしまう。
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}
