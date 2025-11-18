import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Separator,
} from "@/components/ui";
import { useState } from "react";
import supabase from "@/utils/supabase";

import { Asterisk, ArrowLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

// zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const formSchema = z.object({
  // username: z.string().min(2).max(50),
  email: z.email("이메일 양식으로 입력해주삼"),
  password: z.string().min(8, {
    message: "8자 이상 입력하삼",
  }),
  confrimPassword: z.string().min(8, {
    message: "비번 확인을 입력해주세요",
  }),
});

function SignUp() {
  // form 정의
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confrimPassword: "",
    },
  });

  const navigate = useNavigate();

  // 필수 동의 항목 상태값
  const [serviceAgreed, setServiceAgreed] = useState<boolean>(true); // 서비스 이용 약관(필수) 동의 여부
  const [privacyAgree, setPrivacyAgree] = useState<boolean>(true); // 개인정보 처리방침 약관(필수) 동의 여부

  // submit 핸들러 정의
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("values :", values);

    if (!serviceAgreed || !privacyAgree) {
      toast.warning("필수 동의항목을 체크안댐!");
      return;
    }

    try {
      const { data, error: supabaseError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (supabaseError) {
        toast.error(supabaseError.code);
        return;
      }

      if (data.user && data.session) {
        toast.success("회원가입 완료!");
        navigate("/sign-in");
      }

      console.log("supabaseError :", supabaseError);
      console.log("data :", data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <div className="w-full max-w-[1328px] h-full flex items-center justify-center">
      <Card className="w-full max-w-sm border-0 bg-transparent">
        <CardHeader className="gap-1">
          <CardTitle className="text-lg">회원가입</CardTitle>
          <CardDescription>회원가입을 위한 정보를 입력해주세요</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* 이메일 필드 */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <Asterisk size={14} color="red" />
                      <FormLabel>이메일</FormLabel>
                    </div>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="이메일을 입력하삼"
                          {...field}
                        />
                      </FormControl>
                      <Button variant="outline">본인 인증</Button>
                    </div>
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
                    <div className="flex items-center gap-1">
                      <Asterisk size={14} color="red" />
                      <FormLabel>비밀번호</FormLabel>
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

              {/* 비번 확인 필드 */}
              <FormField
                control={form.control}
                name="confrimPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <Asterisk size={14} color="red" />
                      <FormLabel>비밀번호 확인</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비번 확인을 입력하삼"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription></FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-5">
                {/* 필수 동의 항목 */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1">
                    <Asterisk size={14} color="red" />
                    <Label>필수 동의항목</Label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Checkbox />
                      <p>서비스 이용약관 동의</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <a className="text-xs" href="">
                        자세히
                      </a>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Checkbox />
                      <p>개인정보 수집 및 이용동의</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <a className="text-xs" href="">
                        자세히
                      </a>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* 선택 동의 항목 */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1">
                    <Label>선택 동의항목</Label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Checkbox />
                      <p>마케팅 및 광고 수신 동의</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <a className="text-xs" href="">
                        자세히
                      </a>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* 뒤로가기 및 회원가입 버튼 */}
              <div className="w-full flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate("/sign-in");
                  }}
                >
                  <ArrowLeft />
                </Button>
                <Button type="submit" className="flex-1 cursor-pointer">
                  회원가입
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="w-full flex items-center justify-center gap-1 text-sm">
            <p>이미 계정이 있으삼?</p>
            <a
              className="underline underline-offset-4 cursor-pointer"
              onClick={() => {
                navigate("/sign-in");
              }}
            >
              로그인
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export { SignUp };
