"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { login } from "@/actions/new/auth/auth";
import { loginSchema } from "@/actions/new/auth/zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function Page() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";

	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const handleLogin = async (data) => {
		setLoading(true);
		setError("");
		try {
			const res = await login(data);
			if (res.status === 200) {
				router.push(callbackUrl);
			} else {
				setError(res.message);
			}
		} catch (err) {
			setError(err.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center p-4 relative"
			style={{
				backgroundImage:
					"url('https://www.remessaonline.com.br/blog/wp-content/uploads/2022/12/coworking.jpg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0"></div>

			<Card className="w-full max-w-md shadow-2xl border-0 z-10 relative bg-white/95">
				<CardHeader className="space-y-1 text-center">
					<CardTitle className="text-2xl font-bold text-gray-900">
						Co Working Space
					</CardTitle>
					<CardDescription className="text-gray-500">
						ยินดีต้อนรับสู่บริการพื้นที่ทำงานร่วมของเรา
					</CardDescription>
				</CardHeader>
				<CardContent>
					{error && (
						<div className="bg-red-50 text-red-600 text-sm p-3 rounded-md mb-4 text-center">
							{error}
						</div>
					)}
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleLogin)}
							className="space-y-4"
						>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ชื่อผู้ใช้</FormLabel>
										<div className="relative">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
												<FaUser />
											</div>
											<FormControl>
												<Input
													placeholder="กรุณาใส่ชื่อผู้ใช้"
													className="pl-10"
													{...field}
												/>
											</FormControl>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>รหัสผ่าน</FormLabel>
										<div className="relative">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
												<FaLock />
											</div>
											<FormControl>
												<Input
													type={showPassword ? "text" : "password"}
													placeholder="กรุณาใส่รหัสผ่าน"
													className="pl-10 pr-10"
													{...field}
												/>
											</FormControl>
											<Button
												type="button"
												variant="ghost"
												size="icon"
												onClick={() => setShowPassword(!showPassword)}
												className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 cursor-pointer"
											>
												{showPassword ? <FaEye /> : <FaEyeSlash />}
											</Button>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								disabled={isLoading}
								className="w-full mt-4"
							>
								{isLoading ? (
									<>
										<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
										กำลังเข้าสู่ระบบ...
									</>
								) : (
									"เข้าสู่ระบบ"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex justify-center text-sm text-gray-500">
					ยังไม่มีบัญชีผู้ใช้งาน?{" "}
					<Link
						href="/new-coworking/register"
						className="text-primary hover:underline ml-1"
					>
						สมัครสมาชิก
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
