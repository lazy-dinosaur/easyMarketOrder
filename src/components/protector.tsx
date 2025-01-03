import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import Locked from "@/components/locked";
import PopupContainer from "@/components/popup-container";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePin } from "@/hooks/usePin";
import { Outlet } from "react-router";
import { ScreenWrapper } from "./screen-wrapper";

export default function Protector() {
  const { pin, isLoading } = usePin();

  return (
    <SidebarProvider>
      <PopupContainer className="flex-col space-y-5">
        <AppSidebar />
        <ScreenWrapper className={["p-4 w-full"]}>
          <Header />
          {!isLoading && !pin ? <Locked /> : <Outlet />}
        </ScreenWrapper>
      </PopupContainer>
    </SidebarProvider>
  );
}
