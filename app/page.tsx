"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema, type FormValues } from "@/lib/schema"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      yahooId: "",
      theme: "",
      designRequest: "",
      colorTaste: "",
      deadline: "",
      referenceImage: undefined,
      notes: "",
    },
  })

  async function onSubmit(data: FormValues) {
    try {
      setIsSubmitting(true)
      // TODO: フォームの送信処理を実装
      console.log(data)
      console.log('Selected file:', selectedFile)
      
      // 送信成功時の処理
      alert('フォームが送信されました。')
      form.reset()
      setSelectedFile(null)
    } catch (error) {
      console.error('送信エラー:', error)
      alert('送信に失敗しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto shadow-lg animate-fade-in">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">AI画像生成リクエストフォーム</CardTitle>
          <CardDescription className="text-center">
            ヤフオクでご落札いただいた商品のAI画像生成リクエストを受け付けます。
            必要な情報をご入力ください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">お名前 *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="山田 太郎" 
                          {...field}
                          className="form-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">メールアドレス *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="example@example.com" 
                          {...field}
                          className="form-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yahooId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">ヤフオクID/落札ID *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="ヤフオクID または 落札ID" 
                          {...field}
                          className="form-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">要望するAI画像のテーマ/キーワード *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="例: 春の桜をモチーフにした和風デザイン"
                          {...field}
                          className="form-input min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="designRequest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">仕上がりの雰囲気/デザインの要望 *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="例: 優しい雰囲気で、パステルカラーを使用した柔らかいデザイン"
                          {...field}
                          className="form-input min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="colorTaste"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">使用してほしい色やテイスト *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="例: ピンクと白を基調とした春らしい色合い"
                          {...field}
                          className="form-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">希望納期 *</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field}
                          className="form-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="referenceImage"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-base">参考画像</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="form-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                          />
                          {selectedFile && (
                            <p className="text-sm text-muted-foreground">
                              選択されたファイル: {selectedFile.name}
                            </p>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        参考にしたい画像がある場合はアップロードしてください
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">備考・その他要望</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="その他、ご要望がありましたらご記入ください"
                          {...field}
                          className="form-input min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? "送信中..." : "送信する"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
