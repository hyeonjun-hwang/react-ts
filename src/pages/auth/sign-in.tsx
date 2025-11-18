import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
} from "@/components/ui";

import supabase from "@/utils/supabase";
import { useNavigate } from "react-router";

import { toast } from "sonner";

// zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  // username: z.string().min(2).max(50),
  email: z.email("이메일 양식으로 입력해주삼"),
  password: z.string().min(8, {
    message: "8자 이상 입력하삼",
  }),
});

function SignIn() {
  // form 정의
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  // submit 핸들러 정의
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("values :", values);

    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

      // console.log("data: ", data);

      if (!data.user && !data.session) {
        toast.error(signInError?.message);
        return;
      }

      if (data.user && data.session) {
        toast.success("로그인 성공!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <div className="w-full max-w-[1328px] h-full flex items-center justify-center">
      <Card className="w-full max-w-sm border-0 bg-transparent">
        <CardHeader className="gap-1">
          <CardTitle className="text-lg">로그인</CardTitle>
          <CardDescription>로그인을 위한 정보를 입력해주세요</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* 소셜 로그인 */}
          <div className="flex flex-col gap-3">
            <Button variant="outline" className="w-full cursor-pointer">
              <img src="/icons/" alt="@GOOGLE" className="w-4" />
              카카오 로그인
            </Button>
            <Button variant="outline" className="w-full cursor-pointer">
              <img src="/icons/" alt="@GOOGLE" className="w-4" />
              네이버 로그인
            </Button>
            <Button variant="outline" className="w-full cursor-pointer">
              <img src="/icons/google.svg" alt="@GOOGLE" className="w-4" />
              구글 로그인
            </Button>
          </div>

          {/* 구분선 */}
          <div className="relative flex items-center">
            <Separator className="w-full"></Separator>
            <p className="px-2 absolute left-1/2 -translate-x-1/2 bg-background text-xs text-muted-foreground">
              OR CONTINUE WITH
            </p>
          </div>

          {/* 직접 로그인 */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* 이메일 필드 */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="이메일을 입력하삼"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription></FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 비번 필드 */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>비밀번호</FormLabel>
                      <p className="text-xs underline underline-offset-3 cursor-pointer">
                        비밀번호 잊으셨수?
                      </p>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비번을 입력하삼"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription></FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 로그인 버튼 */}
              <Button type="submit" className="w-full cursor-pointer">
                로그인
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex items-center justify-center gap-2 text-xs">
          <p>계정이 없으신가요?</p>
          <a
            className="underline underline-offset-4 cursor-pointer"
            onClick={() => {
              navigate("/sign-up");
            }}
          >
            회원가입
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}

export { SignIn };
