import Link from "next/link";
import { getHistory } from "@/actions/new/history/history";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function Page({ searchParams }) {
	const params = await searchParams;
	const page = Number(params?.page) || 1;
	const limit = 8;

	const history = await getHistory(page, limit);
	const transactions = history.data || [];
	const pagination = history.pagination || { totalPages: 1, currentPage: 1 };

	return (
		<div className="container mx-auto max-w-3xl py-10 px-4 min-h-screen">
			<div className="mb-8">
				<h1 className="text-2xl font-semibold">ประวัติการทำรายการ</h1>
				<p className="text-sm text-muted-foreground mt-1">
					ตรวจสอบประวัติการเติมเงินและการใช้บริการของคุณ
				</p>
			</div>

			{transactions.length === 0 ? (
				<Card>
					<CardContent className="flex items-center justify-center py-16">
						<p className="text-sm text-muted-foreground">
							ไม่พบประวัติการทำรายการ
						</p>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-4">
					<div className="space-y-2">
						{transactions.map((item) => (
							<Card
								key={item.id}
								className="hover:bg-muted/40 transition-colors"
							>
								<CardContent className="flex items-center justify-between px-5 py-4">
									<div className="flex items-center gap-3">
										<div>
											<p className="text-sm font-medium leading-snug">
												{item.description || "ชำระเงิน"}
											</p>
											<p className="text-xs text-muted-foreground mt-0.5">
												{new Date(item.createdAt).toLocaleDateString("th-TH", {
													year: "numeric",
													month: "long",
													day: "numeric",
													hour: "2-digit",
													minute: "2-digit",
												})}
											</p>
										</div>
									</div>
									<span className="text-sm font-semibold tabular-nums text-red-500">
										-
										{Number(item.amount).toLocaleString("th-TH", {
											style: "currency",
											currency: "THB",
										})}
									</span>
								</CardContent>
							</Card>
						))}
					</div>

					{/* Pagination Controls */}
					{pagination.totalPages > 1 && (
						<div className="flex items-center justify-between pt-4">
							<p className="text-sm text-muted-foreground">
								หน้าที่ {pagination.currentPage} จาก {pagination.totalPages}
							</p>
							<div className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									disabled={pagination.currentPage <= 1}
									asChild={pagination.currentPage > 1}
								>
									{pagination.currentPage > 1 ? (
										<Link href={`?page=${pagination.currentPage - 1}`}>
											ก่อนหน้า
										</Link>
									) : (
										<span>ก่อนหน้า</span>
									)}
								</Button>
								<Button
									variant="outline"
									size="sm"
									disabled={pagination.currentPage >= pagination.totalPages}
									asChild={pagination.currentPage < pagination.totalPages}
								>
									{pagination.currentPage < pagination.totalPages ? (
										<Link href={`?page=${pagination.currentPage + 1}`}>
											ถัดไป
										</Link>
									) : (
										<span>ถัดไป</span>
									)}
								</Button>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
