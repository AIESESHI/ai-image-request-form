import * as z from "zod"

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "お名前を入力してください"
  }),
  email: z.string().email({
    message: "有効なメールアドレスを入力してください"
  }),
  yahooId: z.string().min(1, {
    message: "ヤフオクIDまたは落札IDを入力してください"
  }),
  theme: z.string().min(1, {
    message: "AI画像のテーマ/キーワードを入力してください"
  }),
  designRequest: z.string().min(1, {
    message: "仕上がりの雰囲気/デザインの要望を入力してください"
  }),
  colorTaste: z.string().min(1, {
    message: "使用してほしい色やテイストを入力してください"
  }),
  deadline: z.string().min(1, {
    message: "希望納期を選択してください"
  }),
  referenceImage: z.any().optional(),
  notes: z.string().optional(),
})

export type FormValues = z.infer<typeof formSchema>