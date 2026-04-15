"use client";

import { getRoom } from "@/actions/new/booking/get-room";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Page() {
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		(async () => {
			const { data } = await getRoom();
			if (data) setRooms(data);
		})();
	}, []);

	return (
		<div className="min-h-screen bg-gray-50 pb-20">
			<div className="container mx-auto max-w-6xl px-4 pt-10 py-8">
				{/* Top Controls & Header */}
				<div className="mb-8">
					<Link
						href="/"
						className="text-gray-500 hover:text-gray-900 transition-colors flex items-center font-medium text-sm mb-6 w-fit"
					>
						<ChevronLeft className="w-4 h-4 mr-1" /> กลับหน้าหลัก
					</Link>

					<div className="max-w-2xl">
						<h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
							ค้นหาห้องที่เหมาะกับคุณ
						</h1>
						<p className="text-lg text-gray-500">
							พื้นที่ทำงานและห้องประชุมที่ตอบโจทย์ทุกความต้องการ
						</p>
					</div>
				</div>

				<div className="mb-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-bold text-gray-900">ห้องทั้งหมด</h2>
					</div>

					{/* Filter Row */}
					<div className="flex flex-nowrap overflow-x-auto gap-3 pb-4 scrollbar-hide">
						<button
							type="button"
							className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 whitespace-nowrap shadow-sm text-gray-700"
						>
							ประเภทห้อง <ChevronDown className="w-4 h-4 ml-1" />
						</button>
						<button
							type="button"
							className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 whitespace-nowrap shadow-sm text-gray-700"
						>
							ขนาดห้อง <ChevronDown className="w-4 h-4 ml-1" />
						</button>
						<button
							type="button"
							className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 whitespace-nowrap shadow-sm text-gray-700"
						>
							เครื่องดื่มและขนม
						</button>
						<button
							type="button"
							className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 whitespace-nowrap shadow-sm text-gray-700"
						>
							Wi-Fi ความเร็วสูง
						</button>
						<button
							type="button"
							className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 whitespace-nowrap shadow-sm text-gray-700"
						>
							โปรเจคเตอร์
						</button>
					</div>
				</div>

				{/* Cards Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{rooms.map((room) => {
						return (
							<Link key={room.id} href={`/new-coworking/room/${room.id}`}>
								<Card className="overflow-hidden bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group border-gray-100 h-full flex flex-col rounded-2xl">
									<div className="relative aspect-4/3 w-full overflow-hidden">
										<Image
											src={
												room.roomType?.imageUrl ||
												"https://images.unsplash.com/photo-1497366216548-37526070297c"
											}
											alt={room.name}
											fill
											className="object-cover group-hover:scale-105 transition-transform duration-500"
										/>
									</div>
									<CardContent className="p-5 flex flex-col grow">
										<div className="flex justify-between items-start mb-2">
											<div>
												<h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
													{room.name}
												</h3>
												<p className="text-sm text-gray-500">
													{room.roomType?.name || "พื้นที่อเนกประสงค์"}
												</p>
											</div>
										</div>

										<div className="mt-auto pt-4 border-t border-gray-100">
											<div className="flex justify-between items-end">
												<div>
													<div className="text-xs text-gray-500 mb-1">
														ราคาเริ่มต้น
													</div>
													<div className="flex items-baseline gap-1">
														<span className="text-2xl font-bold text-primary">
															฿
															{Number(
																room.roomType?.pricePerHour || 0,
															).toLocaleString()}
														</span>
														<span className="text-sm text-gray-500 font-medium">
															/ ชม.
														</span>
													</div>
												</div>
												<div className="text-right">
													<div className="text-xs text-gray-500 mb-1">
														ปริมาณรองรับ
													</div>
													<div className="text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-md inline-block">
														{room.roomType?.capacity || 2} ท่าน
													</div>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
