"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	FaEnvelope,
	FaEye,
	FaEyeSlash,
	FaIdCard,
	FaLock,
	FaPhone,
	FaUser,
} from "react-icons/fa";
import { toast } from "sonner";
import { signup } from "@/actions/new/auth/auth";
import { signupSchema } from "@/actions/new/auth/zod";
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
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			username: "",
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			password: "",
			confirmPassword: "",
		},
	});

	const handleSignup = async (data) => {
		setLoading(true);
		setError("");
		try {
			const res = await signup(data);
			if (res.status === 200) {
				toast.success("ลงทะเบียนสำเร็จ");
				router.push("/new-coworking/login");
			} else {
				setError(res.message);
			}
		} catch (err) {
			setError(err.message || "เกิดข้อผิดพลาดในการสร้างบัญชี");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center p-4 relative py-12"
			style={{
				backgroundImage:
					"url('https://www.remessaonline.com.br/blog/wp-content/uploads/2022/12/coworking.jpg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0"></div>

			<Card className="w-full max-w-2xl shadow-2xl border-0 z-10 relative bg-white/95">
				<CardHeader className="space-y-1 text-center">
					<CardTitle className="text-2xl font-bold text-gray-900">
						สร้างบัญชีผู้ใช้
					</CardTitle>
					<CardDescription className="text-gray-500">
						เข้าร่วมสมาชิก Co Working Space ของเรา
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
							onSubmit={form.handleSubmit(handleSignup)}
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
													placeholder="กรุณาใส่ชื่อผู้ใช้งาน"
													className="pl-10"
													{...field}
												/>
											</FormControl>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>ชื่อ</FormLabel>
											<div className="relative">
												<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
													<FaIdCard />
												</div>
												<FormControl>
													<Input
														placeholder="กรุณาใส่ชื่อ"
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
									name="lastName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>นามสกุล</FormLabel>
											<div className="relative">
												<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
													<FaIdCard />
												</div>
												<FormControl>
													<Input
														placeholder="กรุณาใส่นามสกุล"
														className="pl-10"
														{...field}
													/>
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>อีเมล</FormLabel>
										<div className="relative">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
												<FaEnvelope />
											</div>
											<FormControl>
												<Input
													placeholder="mail@example.com"
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
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>เบอร์โทรศัพท์ (ตัวเลข 10 หลัก)</FormLabel>
										<div className="relative">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
												<FaPhone />
											</div>
											<FormControl>
												<Input
													placeholder="0899999999"
													className="pl-10"
													onKeyPress={(e) => {
														if (!/[0-9]/.test(e.key)) {
															e.preventDefault();
														}
													}}
													maxLength={10}
													{...field}
												/>
											</FormControl>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
														placeholder="รหัสผ่าน"
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
								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem>
											<FormLabel>ยืนยันรหัสผ่าน</FormLabel>
											<div className="relative">
												<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
													<FaLock />
												</div>
												<FormControl>
													<Input
														type={showPassword ? "text" : "password"}
														placeholder="ป้อนรหัสผ่านอีกครั้ง"
														className="pl-10 pr-10"
														{...field}
													/>
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button
								type="submit"
								disabled={isLoading}
								className="w-full mt-6 py-6 text-lg"
							>
								{isLoading ? (
									<>
										<span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
										กำลังสร้างบัญชี...
									</>
								) : (
									"สมัครสมาชิก"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex justify-center text-sm text-gray-500">
					มีบัญชีอยู่แล้ว?{" "}
					<Link
						href="/new-coworking/login"
						className="text-primary hover:underline ml-1"
					>
						เข้าสู่ระบบ
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
