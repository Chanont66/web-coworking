"use client";

import { Zap } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
	const router = useRouter();

	const pathname = usePathname();
	// เงื่อนไขในการยกเว้นหน้าต่างๆ
	if (
		pathname === "/new-coworking/login" ||
		pathname === "/new-coworking/register"
	) {
		return null;
	}
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto px-4 flex h-16 items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="bg-primary p-1.5 rounded-lg">
						<Zap className="h-6 w-6 text-primary-foreground" />
					</div>
					<span className="text-xl font-bold tracking-tight">CoWork.</span>
				</div>

				<nav className="hidden md:flex items-center gap-8 text-sm font-medium">
					<Link
						href="/new-coworking/booking"
						className="transition-colors hover:text-primary"
					>
						การจอง
					</Link>
					<Link href="/" className="transition-colors hover:text-primary">
						องค์กร
					</Link>
					<Link href="/" className="transition-colors hover:text-primary">
						เกี่ยวกับเรา
					</Link>
				</nav>

				<div className="flex items-center gap-4">
					<Button
						onClick={() => router.push("/new-coworking/login")}
						variant="ghost"
						className="hidden sm:inline-flex cursor-pointer"
					>
						เข้าสู่ระบบ
					</Button>
					<Button
						className="cursor-pointer"
						onClick={() => router.push("/new-coworking/register")}
					>
						เริ่มต้นใช้งาน
					</Button>
				</div>
			</div>
		</header>
	);
}
