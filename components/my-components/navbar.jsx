"use client";

import { Calendar, History, LogOut, User, Wallet, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { logout } from "@/actions/new/auth/auth";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/get-user-info";

export default function Navbar() {
	const router = useRouter();
	const pathname = usePathname();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchUser = useCallback(async () => {
		try {
			const result = await getUserInfo();
			if (result.status === 200) {
				setUser(result.user);
			} else {
				setUser(null);
			}
		} catch {
			setUser(null);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	const handleLogout = async () => {
		try {
			const result = await logout();
			if (result.status === 200) {
				toast.success("ออกจากระบบสำเร็จ");
				setUser(null);
				router.refresh(); // เคลียร์ cache และโหลดข้อมูลใหม่
				router.push("/");
			}
		} catch {
			toast.error("เกิดข้อผิดพลาดในการออกจากระบบ");
		}
	};

	// เงื่อนไขในการยกเว้นหน้าต่างๆ
	if (
		pathname === "/new-coworking/login" ||
		pathname === "/new-coworking/register"
	) {
		return null;
	}
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow-sm">
			<div className="container mx-auto px-4 flex h-16 items-center justify-between">
				<Link href="/" className="flex items-center gap-2 outline-hidden">
					<div className="bg-primary p-1.5 rounded-lg">
						<Zap className="h-6 w-6 text-primary-foreground" />
					</div>
					<span className="text-xl font-bold tracking-tight bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
						CoWork.
					</span>
				</Link>

				<nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
					<Link
						href="/new-coworking/room"
						className={`flex items-center gap-1.5 transition-colors hover:text-primary ${pathname.startsWith("/new-coworking/room") ? "text-primary font-bold" : "text-muted-foreground"}`}
					>
						<Calendar className="h-4 w-4" />
						การจอง
					</Link>

					{user && (
						<>
							<Link
								href="/new-coworking/top-up"
								className={`flex items-center gap-1.5 transition-colors hover:text-primary ${pathname.startsWith("/new-coworking/top-up") ? "text-primary font-bold" : "text-muted-foreground"}`}
							>
								<Wallet className="h-4 w-4" />
								เติมเงิน
							</Link>
							<Link
								href="/new-coworking/my-history"
								className={`flex items-center gap-1.5 transition-colors hover:text-primary ${pathname.startsWith("/new-coworking/my-history") ? "text-primary font-bold" : "text-muted-foreground"}`}
							>
								<History className="h-4 w-4" />
								ประวัติ
							</Link>
							<Link
								href="/new-coworking/my-profile"
								className={`flex items-center gap-1.5 transition-colors hover:text-primary ${pathname.startsWith("/new-coworking/my-profile") ? "text-primary font-bold" : "text-muted-foreground"}`}
							>
								<User className="h-4 w-4" />
								โปรไฟล์
							</Link>
						</>
					)}
				</nav>

				<div className="flex items-center gap-3">
					{!loading &&
						(user ? (
							<div className="flex items-center gap-4">
								<div className="hidden sm:flex flex-col items-end">
									<p className="text-xs font-semibold text-muted-foreground">
										กระเป๋าเงิน
									</p>
									<p className="text-sm font-bold text-primary">
										฿{(Number(user.balance) || 0).toLocaleString()}
									</p>
								</div>

								<Button
									variant="ghost"
									size="icon"
									onClick={handleLogout}
									className="text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
									title="ออกจากระบบ"
								>
									<LogOut className="h-5 w-5" />
								</Button>
							</div>
						) : (
							<>
								<Button
									onClick={() => router.push("/new-coworking/login")}
									variant="ghost"
									className="hidden sm:inline-flex cursor-pointer"
								>
									เข้าสู่ระบบ
								</Button>
								<Button
									className="cursor-pointer font-bold"
									onClick={() => router.push("/new-coworking/register")}
								>
									เริ่มต้นใช้งาน
								</Button>
							</>
						))}
				</div>
			</div>
		</header>
	);
}
