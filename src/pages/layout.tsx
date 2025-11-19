import { ThemeProvider } from "@/components/theme-provider";
import { AppFooter, AppHeader } from "@/components/common";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { TopicAddButton } from "@/components/topic";

function RootLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full h-screen flex flex-col px-4">
        <AppHeader />
        <main className="w-full flex-1 flex justify-center">
          <Outlet />
        </main>
        <AppFooter />

        {/* 토픽 추가 플로팅 버튼 */}
        <TopicAddButton />
        {/* sonner 토스터 */}
        <Toaster position="bottom-center" richColors />
      </div>
    </ThemeProvider>
  );
}

export default RootLayout;
