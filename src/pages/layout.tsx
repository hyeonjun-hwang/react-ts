import { ThemeProvider } from "@/components/theme-provider";
import { AppFooter, AppHeader } from "@/components/common";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { AuthListener } from "@/components/common/AuthListener";

function RootLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* supabase auth 리스너 */}
      <AuthListener />

      <div className="w-full h-screen flex flex-col px-4">
        <AppHeader />
        <main className="w-full flex-1 flex justify-center">
          <Outlet />
        </main>
        <AppFooter />

        {/* sonner 토스터 */}
        <Toaster position="top-center" richColors />
      </div>
    </ThemeProvider>
  );
}

export default RootLayout;
