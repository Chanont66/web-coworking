"use client";

import { Check, CreditCard, Landmark, QrCode, Wallet } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { topUp } from "@/actions/new/recharge/top-up";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getUserInfo } from "@/lib/get-user-info";
import { cn } from "@/lib/utils";

export default function TopUpPage() {
	const recommendAmount = [100, 200, 500, 1000, 1500, 2000, 2500];

	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selectedAmount, setSelectedAmount] = useState(null);
	const [customAmount, setCustomAmount] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState("qr_code");

	const fetchUserInfo = useCallback(async () => {
		setLoading(true);
		try {
			const result = await getUserInfo();
			if (result.status === 200) {
				setUser(result.user);
			}
		} catch {
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchUserInfo();
	}, [fetchUserInfo]);

	const handleTopUp = async () => {
		const amount = selectedAmount || Number(customAmount);
		if (!amount || amount <= 0) {
			toast.error("กรุณาระบุจำนวนเงินที่ต้องการเติม");
			return;
		}

		setIsSubmitting(true);
		try {
			const result = await topUp(amount);
			if (result.status === 200) {
				toast.success("เติมเงินสำเร็จ!");
				setCustomAmount("");
				setSelectedAmount(null);
				fetchUserInfo(); // Refresh balance
			} else {
				toast.error(result.message || "เติมเงินไม่สำเร็จ");
			}
		} catch {
			toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อ");
		} finally {
			setIsSubmitting(false);
		}
	};

	const finalAmount =
		selectedAmount || (customAmount ? Number(customAmount) : 0);

	return (
		<div className="container mx-auto max-w-2xl py-10 px-4 min-h-screen animate-in fade-in duration-500">
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">เติมเงิน</h1>
				<p className="text-muted-foreground mt-2">
					เพิ่มยอดเงินในกระเป๋าเงินของคุณเพื่อใช้ในการจองห้องทำงาน
				</p>
			</div>

			<div className="grid gap-6">
				{/* Current Balance Card */}
				<Card className="overflow-hidden border-none shadow-lg bg-linear-to-br from-primary/90 to-primary text-primary-foreground">
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div className="space-y-1">
								<p className="text-sm font-medium opacity-80 uppercase tracking-wider">
									ยอดเงินคงเหลือ
								</p>
								<h2 className="text-4xl font-extrabold">
									{loading ? (
										<span className="animate-pulse">...</span>
									) : (
										(Number(user?.balance) || 0).toLocaleString("th-TH", {
											style: "currency",
											currency: "THB",
										})
									)}
								</h2>
							</div>
							<div className="bg-white/20 p-3 rounded-full">
								<Wallet className="h-8 w-8" />
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Top-up Selection */}
				<Card>
					<CardHeader>
						<CardTitle>เลือกจำนวนเงิน</CardTitle>
						<CardDescription>
							เลือกจากรายการที่กำหนด หรือระบุจำนวนเงินเอง
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
							{recommendAmount.map((amount) => (
								<Button
									key={amount}
									variant={selectedAmount === amount ? "default" : "outline"}
									className={cn(
										"h-16 text-lg font-bold transition-all",
										selectedAmount === amount &&
											"ring-2 ring-primary ring-offset-2",
									)}
									onClick={() => {
										setSelectedAmount(amount);
										setCustomAmount(amount.toString());
									}}
								>
									฿{amount}
								</Button>
							))}
						</div>

						<div className="space-y-2 ">
							<label
								htmlFor="custom-amount"
								className="text-sm font-medium mb-4"
							>
								ระบุจำนวนเงินเอง
							</label>
							<div className="relative">
								<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
									฿
								</span>
								<Input
									id="custom-amount"
									type="number"
									min={0}
									placeholder="ระบุจำนวนเงิน (เช่น 300)"
									className="pl-8 h-12 text-lg"
									value={customAmount}
									onChange={(e) => {
										setCustomAmount(e.target.value);
										setSelectedAmount(null);
									}}
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Payment Method */}
				<Card>
					<CardHeader>
						<CardTitle>วิธีการชำระเงิน</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-3">
						{[
							{ id: "qr_code", label: "Thai QR Payment", icon: QrCode },
							{
								id: "credit_card",
								label: "Credit / Debit Card",
								icon: CreditCard,
							},
							{ id: "bank", label: "Mobile Banking", icon: Landmark },
						].map((method) => (
							<button
								key={method.id}
								type="button"
								className={cn(
									"flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/50 outline-hidden w-full text-left",
									paymentMethod === method.id
										? "border-primary bg-primary/5"
										: "border-muted",
								)}
								onClick={() => setPaymentMethod(method.id)}
							>
								<div className="flex items-center gap-4">
									<div
										className={cn(
											"p-2 rounded-lg transition-colors",
											paymentMethod === method.id
												? "bg-primary text-primary-foreground"
												: "bg-muted text-muted-foreground",
										)}
									>
										<method.icon className="h-5 w-5" />
									</div>
									<span className="font-medium">{method.label}</span>
								</div>
								{paymentMethod === method.id && (
									<div className="bg-primary rounded-full p-1 animate-in zoom-in duration-300">
										<Check className="h-3 w-3 text-primary-foreground" />
									</div>
								)}
							</button>
						))}
					</CardContent>
					<CardFooter className="flex flex-col gap-4 border-t pt-6 bg-muted/30">
						<div className="flex justify-between w-full items-center">
							<span className="text-muted-foreground">ยอดชำระทั้งสิ้น</span>
							<span className="text-2xl font-bold">
								{finalAmount.toLocaleString("th-TH", {
									style: "currency",
									currency: "THB",
								})}
							</span>
						</div>
						<Button
							className="w-full h-12 text-lg font-bold"
							size="lg"
							disabled={isSubmitting || finalAmount <= 0}
							onClick={handleTopUp}
						>
							{isSubmitting ? "กำลังดำเนินการ..." : "ยืนยันการเติมเงิน"}
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
