import { NavLink, useNavigate } from "react-router";
import { Button, Separator, Spinner } from "../ui";
import { ModeToggle } from "../mode-toggle";
import { useUserStore } from "@/store/userStore";
import { useState } from "react";

function AppHeader() {
  const { session, logout } = useUserStore();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // 로그아웃 버튼 클릭 핸들러
  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
    navigate("/"); // 로그아웃 후 홈으로 이동
  };

  return (
    <header className="w-full h-12 min-h-12 flex items-center justify-center sticky top-0 z-2 bg-white dark:bg-black">
      <div className="w-full max-w-[1328px] h-full flex items-center justify-between">
        <div className="flex items-center gap-4 font-medium">
          {/* <img src="" alt="@LOGO" /> */}
          <NavLink to={"/"}>토픽 인사이트</NavLink>
          <Separator orientation="vertical" className="h-3!" />
          <NavLink to={"/"}>프로필</NavLink>
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-2">
              <p className="font-semibold">{session.user.email}</p>
              {isLoggingOut ? (
                <Spinner className="size-5 text-neutral-400" />
              ) : (
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-neutral-400 cursor-pointer"
                >
                  로그아웃
                </Button>
              )}
              {/* <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-neutral-400 cursor-pointer"
              >
                로그아웃
              </Button> */}
            </div>
          ) : (
            <NavLink
              to={"/sign-in"}
              className="hover:text-gray-400 duration-300"
            >
              로그인
            </NavLink>
          )}
          <Separator orientation="vertical" className="h-3!" />
          <NavLink to={"/"} className="hover:text-gray-400 duration-300">
            우리가 하는 일
          </NavLink>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export { AppHeader };
