'use server'; // トップレベルに'use server'を書くことでモジュールごとにサーバーアクションを適用できる

export async function createInvoice(formData: FormData) {
  const rawFormData = {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  };
  // Test it out:
  console.log(rawFormData);
}
