import { NavLink } from "react-router";
import { Separator } from "../ui";
import { ModeToggle } from "../mode-toggle";

function AppHeader() {
  return (
    <header className="w-full h-12 min-h-12 flex items-center justify-center px-6">
      <div className="w-full max-w-[1328px] h-full flex items-center justify-between">
        <div className="flex items-center gap-4 font-medium">
          {/* <img src="" alt="@LOGO" /> */}
          <NavLink to={"/"}>토픽 인사이트</NavLink>
          <Separator orientation="vertical" className="h-3!" />
          <NavLink to={"/"}>프로필</NavLink>
        </div>
        <div className="flex items-center gap-4">
          <NavLink to={"/sign-in"} className="hover:text-gray-400 duration-300">
            로그인
          </NavLink>
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
