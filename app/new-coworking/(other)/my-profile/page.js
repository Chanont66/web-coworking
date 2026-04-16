import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserInfo } from "@/lib/get-user-info";

export default async function Page() {
	const result = await getUserInfo();
	const user = result.user;

	if (!user) {
		return (
			<div className="container mx-auto max-w-2xl py-10 px-4">
				<Card>
					<CardContent className="py-16 text-center">
						<p className="text-sm text-muted-foreground">ไม่พบข้อมูลโปรไฟล์</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	const infoItems = [
		{ label: "ชื่อผู้ใช้", value: user.username },
		{
			label: "ชื่อ-นามสกุล",
			value: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "-",
		},
		{ label: "อีเมล", value: user.email },
		{ label: "เบอร์โทรศัพท์", value: user.phone || "-" },
	];

	return (
		<div className="container mx-auto max-w-2xl py-10 px-4 min-h-screen">
			<div className="mb-8">
				<h1 className="text-2xl font-semibold">โปรไฟล์ของฉัน</h1>
				<p className="text-sm text-muted-foreground mt-1">
					ข้อมูลส่วนตัวและยอดเงินคงเหลือ
				</p>
			</div>

			<div className="space-y-4">
				{/* Balance Card */}
				<Card className="bg-primary text-primary-foreground">
					<CardContent className="flex items-center justify-between px-5 py-5">
						<div>
							<p className="text-sm opacity-80">ยอดเงินคงเหลือ</p>
							<p className="text-3xl font-bold mt-0.5">
								{Number(user.balance).toLocaleString("th-TH", {
									style: "currency",
									currency: "THB",
								})}
							</p>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.75"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="opacity-70"
							aria-hidden="true"
						>
							<rect width="20" height="14" x="2" y="5" rx="2" />
							<line x1="2" x2="22" y1="10" y2="10" />
						</svg>
					</CardContent>
				</Card>

				{/* Info Card */}
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-base font-medium">ข้อมูลส่วนตัว</CardTitle>
					</CardHeader>
					<CardContent className="px-5 pb-4">
						<div className="divide-y">
							{infoItems.map((item) => (
								<div key={item.label} className="flex justify-between py-3">
									<span className="text-sm text-muted-foreground">
										{item.label}
									</span>
									<span className="text-sm font-medium">{item.value}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
