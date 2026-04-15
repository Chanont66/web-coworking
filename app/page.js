"use client";

import { ArrowRight, Calendar, Headset, Wifi, Wind } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRoom } from "@/actions/new/booking/get-room";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
	const router = useRouter();

	const [rooms, setRooms] = useState([]);
	useEffect(() => {
		(async () => {
			const { data } = await getRoom();
			setRooms(data);
		})();
	}, []);

	const features = [
		{
			id: "01",
			title: "อินเทอร์เน็ตความเร็วสูง",
			desc: "เชื่อมต่ออินเทอร์เน็ตความเร็วสูงที่เสถียร เพื่อให้คุณทำงานได้อย่างราบรื่นไม่มีสะดุด",
			icon: Wifi,
		},
		{
			id: "02",
			title: "ห้องประชุมส่วนตัว",
			desc: "ห้องประชุมที่ออกแบบมาเพื่อการทำงานร่วมกัน พร้อมอุปกรณ์ครบครันสำหรับการประชุมที่ราบรื่น",
			icon: Headset,
		},
		{
			id: "03",
			title: "พื้นที่ทำงานที่ยืดหยุ่น",
			desc: "เลือกพื้นที่ทำงานที่เหมาะกับสไตล์การทำงานของคุณ ไม่ว่าจะเป็นโต๊ะทำงานส่วนตัวหรือพื้นที่ส่วนกลาง",
			icon: Calendar,
		},
		{
			id: "04",
			title: "ระบบปรับอากาศที่สะดวกสบาย",
			desc: "ระบบปรับอากาศที่ออกแบบมาเพื่อความสะดวกสบายในการทำงาน พร้อมการดูแลรักษาอย่างสม่ำเสมอ",
			icon: Wind,
		},
	];

	const pros = [
		{
			id: "01",
			title: "อิสระและยืดหยุ่น",
			desc: "เลือกที่นั่งหรือห้องประชุมได้ตามต้องการ ไม่ผูกมัดด้วยสัญญาเช่าระยะยาวให้วุ่นวาย",
		},
		{
			id: "02",
			title: "สิ่งอำนวยความสะดวกครบ",
			desc: "อินเทอร์เน็ตความเร็วสูง ระบบสำรองไฟ และทีมงานที่พร้อมดูแลคุณทุกขั้นตอน",
		},
		{
			id: "03",
			title: "สังคมแห่งการแบ่งปัน",
			desc: "พบปะคนทำงานจากหลากหลายสาขา ที่พร้อมจะแชร์ไอเดียและเติบโตไปพร้อมกับคุณ",
		},
	];

	return (
		<div className="flex flex-col min-h-screen bg-background">
			<main className="flex-1">
				<section className="relative py-20 lg:py-32 overflow-hidden bg-slate-50">
					<div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
					<div className="container mx-auto px-4 relative">
						<div className="max-w-[800px] mx-auto text-center space-y-8">
							<div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-4 cursor-default">
								✨ พื้นที่ทำงานใหม่เปิดให้บริการแล้วในกรุงเทพฯ
							</div>
							<h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
								ทำงานในที่ที่{" "}
								<span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
									คุณรู้สึกมีไฟ
								</span>
							</h1>
							<p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
								สัมผัสส่วนผสมที่ลงตัวระหว่างคอมมูนิตี้ ความสะดวกสบาย และประสิทธิภาพการทำงาน
								พื้นที่ที่ออกแบบมาเพื่อนักสร้างสรรค์ ผู้ประกอบการ และทีมงานโดยเฉพาะ
							</p>
						</div>
					</div>
				</section>

				<section className="py-24 container mx-auto px-4">
					<div className="text-center space-y-4 mb-16">
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
							ทุกสิ่งที่คุณต้องการเพื่อให้งานไปได้ไกล
						</h2>
						<p className="text-muted-foreground max-w-[600px] mx-auto">
							จดจ่อกับงานของคุณ แล้วให้เราดูแลเรื่องสถานที่
							พื้นที่ของเรามาพร้อมสิ่งอำนวยความสะดวกระดับพรีเมียม
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{features.map((feature) => (
							<Card
								key={feature.id}
								className="group hover:border-primary/50 transition-all animate-in fade-in zoom-in-95 duration-500"
							>
								<CardContent className="p-8 space-y-4">
									<div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
										<feature.icon className="h-6 w-6" />
									</div>
									<h3 className="font-bold text-xl">{feature.title}</h3>
									<p className="text-muted-foreground text-sm leading-relaxed">
										{feature.desc}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</section>

				<section className="py-24 bg-foreground/5 overflow-hidden">
					<div className="container mx-auto px-4">
						<div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
							<div className="space-y-4 max-w-xl">
								<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
									สำรวจพื้นที่ทำงานของเรา
								</h2>
								<p className="text-muted-foreground">
									สำรวจพื้นที่ทำงานที่เราคัดสรรมาเพื่อคุณ ในย่านที่มีสีสันที่สุด
								</p>
							</div>
							<Button
								onClick={() => router.push("/new-coworking/room")}
								variant="outline"
								className="group cursor-pointer"
							>
								ดูทั้งหมด
								<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
							</Button>
						</div>

						<div className="overflow-x-auto pb-4">
							<div className="flex gap-6" style={{ width: "max-content" }}>
								{rooms.map((loc) => (
									<div
										key={loc.id}
										className="cursor-pointer group"
										style={{ width: "280px" }}
									>
										<div
											className="relative overflow-hidden bg-muted rounded-xl"
											style={{ aspectRatio: "3/4" }}
										>
											<Image
												src={
													loc.roomType?.imageUrl ||
													"https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
												}
												alt={loc.name}
												fill
												className="object-cover group-hover:scale-105 transition-transform duration-500"
											/>
										</div>

										{/* ข้อมูลใต้รูป */}
										<div className="pt-3 space-y-0.5">
											<div className="flex items-start justify-between gap-2">
												<p className="font-semibold text-sm text-foreground">
													฿
													{loc.roomType?.pricePerHour
														? Number(loc.roomType.pricePerHour).toLocaleString()
														: "—"}
												</p>
											</div>
											<p className="text-sm font-medium text-foreground leading-tight">
												{loc.name}
											</p>
											<p className="text-sm text-muted-foreground">
												{loc.roomType?.name || loc.description || "พื้นที่ทำงาน"}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className="py-24 container mx-auto px-4 border-t">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
						<div className="space-y-8">
							<div className="space-y-4">
								<h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-foreground font-heading leading-tight">
									Coworking Space <br />
									<span className="text-primary">คืออะไร?</span>
								</h2>
								<div className="h-1 w-20 bg-primary/20 rounded-full" />
								<p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
									Coworking Space คือรูปแบบการทำงานสมัยใหม่ที่เน้นความยืดหยุ่นและสังคม
									ไม่ใช่แค่การเช่าโต๊ะทำงาน
									แต่คือพื้นที่สร้างสรรค์ที่เพียบพร้อมด้วยสิ่งอำนวยความสะดวก
									เพื่อให้คุณจดจ่อกับงานที่รักได้อย่างเต็มประสิทธิภาพ
								</p>
							</div>

							<div className="grid gap-8">
								{pros.map((item) => (
									<div key={item.id} className="flex gap-6 group">
										<div className="shrink-0 w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
											<span className="font-bold text-lg">{item.id}</span>
										</div>
										<div className="space-y-1">
											<h4 className="font-bold text-xl text-foreground">
												{item.title}
											</h4>
											<p className="text-muted-foreground leading-relaxed">
												{item.desc}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="relative h-full min-h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl">
							<Image
								src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=1200&auto=format&fit=crop"
								alt="Modern Coworking Space Environment"
								fill
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
						</div>
					</div>
				</section>

				<section className="pb-28 container mx-auto px-4">
					<div className="flex flex-col lg:flex-row gap-10 items-center bg-slate-100 rounded-[3rem] p-8 md:p-16 lg:p-20 border border-slate-200 shadow-sm relative overflow-hidden">
						<div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

						<div className="w-full lg:w-[42%] shrink-0 relative">
							<div className="relative aspect-4/4 rounded-[2.5rem] overflow-hidden shadow-2xl ring-8 ring-white transform -rotate-1 hover:rotate-0 transition-transform duration-700">
								<Image
									src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop"
									alt="Team Collaboration"
									fill
									className="object-cover"
								/>
							</div>
						</div>

						<div className="flex-1 space-y-10">
							<div className="space-y-6">
								<div className="inline-flex items-center gap-3 text-primary font-bold text-xs tracking-[0.3em] uppercase">
									<div className="w-10 h-px bg-primary/30" />
									อนาคตของการทำงาน
								</div>

								<h2 className="text-4xl md:text-6xl font-extrabold text-slate-950 leading-[1.1] tracking-tighter">
									ยกระดับไอเดียของคุณ{" "}
									<span className="text-primary font-serif italic font-medium block">
										ในพื้นที่ที่ใช่
									</span>
								</h2>

								<p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-lg">
									เปลี่ยนการทำงานให้เป็นแรงบันดาลใจ ในพื้นที่ที่คัดสรรมาเพื่อคนทำงานตัวจริง
								</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
								<Button
									size="lg"
									className="rounded-2xl px-10 h-16 text-lg font-bold shadow-xl shadow-primary/20 hover:translate-y-[-2px] transition-all duration-300"
									onClick={() => router.push("/new-coworking/register")}
								>
									เริ่มต้นใช้งานฟรี
									<ArrowRight className="ml-2 h-5 w-5" />
								</Button>

								<div className="flex flex-col">
									<p className="text-sm font-bold text-slate-950">
										สอบถามเพิ่มเติม?
									</p>
									<p className="text-sm text-slate-500 font-medium">
										ติดต่อที่ 02-123-4567
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
