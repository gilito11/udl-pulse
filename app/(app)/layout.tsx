import { MobileShell } from "@/components/shell/MobileShell";
import { BottomTabBar } from "@/components/shell/BottomTabBar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileShell>
      <div className="flex-1 flex flex-col min-h-0">{children}</div>
      <BottomTabBar />
    </MobileShell>
  );
}
