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
  Spinner,
} from "@/components/ui";

import supabase from "@/utils/supabase";
import { useNavigate } from "react-router";

import { toast } from "sonner";

// zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  email: z.email("이메일 양식으로 입력해주삼"),
  password: z.string().min(8, {
    message: "8자 이상 입력하삼",
  }),
});

// session 정보 store
import { useUserStore } from "@/store/userStore";
import { useState } from "react";

function SignIn() {
  // session, setSession 가져오기
  const { session, setSession } = useUserStore();

  const navigate = useNavigate();

  // 이미 로그인된 경우 홈으로 떨구기
  if (session) {
    navigate("/");
    return;
  }

  // form 정의
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 로그인중 로딩 처리용 state
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // submit 핸들러 정의
  async function onSubmitLogin(values: z.infer<typeof formSchema>) {
    try {
      setIsLoggingIn(true);

      const {
        data: { session, user },
        error: signInError,
      } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (!user && !session) {
        toast.error(signInError?.message);

        // 로그인 로딩 종료
        setIsLoggingIn(false);
        return;
      }

      if (user && session) {
        // session 업데이트
        setSession(session);

        // 로그인 로딩 종료
        setIsLoggingIn(false);

        // 토스트 띄우고 이전 페이지로 이동
        toast.success("로그인 성공!");
        navigate(-1);

        // console.log("로그인 성공 후 session :", session);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // 구글 로그인
  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${import.meta.env.VITE_SUPABASE_URL}/auth/callback`,

          // 구글 OAuth 로그인 시 추가로 전달되는 파라미터, 토큰 발급 방식과 사용자 동의 화면에 영향을 준다
          //  access_type : 리프레시 토큰을 발급받기 위한 설정인데
          //    access_type: "offline" 을 하면 사용자가 애플리케이션을 사용하지 않을때도 리프레시 토큰을 받을 수 있다
          //  prompt : "consent"
          //    이미 로그인 했어도 로그인할 때 구글이 항상 동의 화면을 다시 보여주도록 강제하는 설정
          //    일반적으로 사용자가 한 번 동의하면 구글은 다음에 자동으로 스킵하는데
          //    이것을 넣는 이유는 보통 리프레시 토큰을 항상 확실하게 받기 위해서
          //    즉, 사용자에게 다시 동의를 요청하라는 의미
          queryParams: { access_type: "offline", prompt: "consent" },
        },
      });

      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

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
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={handleGoogleSignIn}
            >
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
            <form
              onSubmit={form.handleSubmit(onSubmitLogin)}
              className="space-y-8"
            >
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
              {isLoggingIn ? (
                <Button className="w-full" disabled>
                  <Spinner />
                </Button>
              ) : (
                <Button type="submit" className="w-full cursor-pointer">
                  로그인
                </Button>
              )}
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

      {/* 임시 */}
      <div className="pl-10">
        <p className="text-lg">[로그인 테스트용 계정]</p>
        <div className="text-2xl text-rose-400">
          <p>email : test@test.com</p>
          <p>pw : 123123123</p>
        </div>
      </div>
    </div>
  );
}

export { SignIn };
