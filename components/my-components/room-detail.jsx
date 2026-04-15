"use client";

import { CheckCircle2, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BookingForm from "@/components/my-components/booking-form";

export default function RoomDetail({ roomInfo, timeSlots }) {
	if (!roomInfo) return null;

	return (
		<div className="min-h-screen bg-gray-50 pb-20">
			<div className="container mx-auto max-w-5xl px-4 pt-10 py-8">
				<Link
					href="/new-coworking/room"
					className="text-gray-500 hover:text-gray-900 transition-colors flex items-center font-medium text-sm mb-6 w-fit"
				>
					<ChevronLeft className="w-4 h-4 mr-1" /> กลับไปหน้ารายการห้อง
				</Link>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* คอลัมน์ซ้าย: รูปและรายละเอียด */}
					<div className="lg:col-span-2 space-y-6">
						{/* รูปภาพ */}
						<div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-sm">
							<Image
								src={
									roomInfo.roomType?.imageUrl ||
									"https://images.unsplash.com/photo-1497366216548-37526070297c"
								}
								alt={roomInfo.name}
								fill
								className="object-cover"
							/>
						</div>

						{/* รายละเอียด */}
						<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
							<div className="mb-4">
								<span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
									{roomInfo.roomType?.name}
								</span>
							</div>
							<h1 className="text-3xl font-bold text-gray-900 mb-2">
								{roomInfo.name}
							</h1>
							<p className="text-gray-600 mb-6 leading-relaxed">
								{roomInfo.description ||
									"พื้นที่ทำงานและห้องประชุมเงียบสงบ พร้อมสิ่งอำนวยความสะดวกครบครัน เหมาะสำหรับทุกรูปแบบการประชุมและนำเสนองาน"}
							</p>

							<h3 className="text-lg font-bold text-gray-900 mb-4">
								สิ่งอำนวยความสะดวก:
							</h3>
							<div className="grid grid-cols-2 gap-4">
								<div className="flex items-center text-gray-700">
									<CheckCircle2 className="w-5 h-5 text-green-500 mr-2" /> Wi-Fi
									ความเร็วสูง
								</div>
								<div className="flex items-center text-gray-700">
									<CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />{" "}
									เครื่องดื่มและขนม
								</div>
								<div className="flex items-center text-gray-700">
									<CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />{" "}
									จอมอนิเตอร์
								</div>
								<div className="flex items-center text-gray-700">
									<CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />{" "}
									กระดานไวท์บอร์ด
								</div>
							</div>
						</div>
					</div>

					{/* คอลัมน์ขวา: Card สำหรับจองห้อง */}
					<BookingForm roomInfo={roomInfo} timeSlots={timeSlots} />
				</div>
			</div>
		</div>
	);
}
