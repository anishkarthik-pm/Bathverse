"use client";
import { useRouter } from "next/navigation";
import { LogOut, Phone, User, Shield, HelpCircle, ChevronRight } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { useAppStore } from "@/lib/store";

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAppStore();

  const handleLogout = () => {
    logout();
    router.replace("/home");
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-6">
      <h1 className="font-display text-xl text-slate mb-6">Account</h1>

      {/* Profile card */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-coral-light flex items-center justify-center">
            <User size={20} className="text-coral" />
          </div>
          <div>
            <p className="font-medium text-slate">{user?.name}</p>
            <p className="text-sm text-gray flex items-center gap-1">
              <Phone size={12} /> +91 {user?.phone}
            </p>
          </div>
        </div>
      </Card>

      {/* Menu items */}
      <div className="space-y-1 mb-6">
        {[
          { icon: User, label: "Edit Profile" },
          { icon: Shield, label: "Privacy & Data" },
          { icon: HelpCircle, label: "Help & Support" },
        ].map(({ icon: Icon, label }) => (
          <button key={label} className="w-full bg-white rounded-xl border border-light-gray px-4 py-3.5 flex items-center justify-between hover:bg-light-gray transition-colors">
            <div className="flex items-center gap-3">
              <Icon size={16} className="text-gray" />
              <span className="text-sm text-slate">{label}</span>
            </div>
            <ChevronRight size={16} className="text-gray" />
          </button>
        ))}
      </div>

      <Button variant="outline" className="w-full text-coral border-coral" onClick={handleLogout}>
        <LogOut size={16} className="mr-2" /> Sign Out
      </Button>

      <p className="text-center text-xs text-gray mt-6">BathIQ v0.1.0 · Built with ❤️ in India</p>
    </div>
  );
}
