"use client";

import { Receipt, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { booking } from "@/actions/new/booking/booking";
import { getBookedTimeSlots } from "@/actions/new/booking/time-slots";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function BookingForm({ roomInfo, timeSlots }) {
	const [date, setDate] = useState("");
	const [selectedSlots, setSelectedSlots] = useState([]); // เก็บ id ของ slot ที่เลือกแล้ว

	const [sessions, setSessions] = useState({}); // เก็บรายการที่เลือกไว้ (แยกบิล)

	const [bookedSlotIdsInDB, setBookedSlotIdsInDB] = useState([]); // เก็บไอดีที่โดนจองแล้วใน Database
	const [isLoadingSlots, setIsLoadingSlots] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const pricePerRound = roomInfo.roomType.pricePerRound;
	const capacity = roomInfo.roomType.capacity;

	const todayStr = new Date().toISOString().split("T")[0];
	const maxDate = new Date(new Date().setDate(new Date().getDate() + 30))
		.toISOString()
		.split("T")[0];

	useEffect(() => {
		if (!date || !roomInfo?.id) {
			setBookedSlotIdsInDB([]);
			setSelectedSlots([]); // ล้างการเลือกเมื่อเปลี่ยนวัน
			return;
		}

		setIsLoadingSlots(true);
		getBookedTimeSlots(roomInfo.id, date).then((res) => {
			if (res.status === 200) {
				setBookedSlotIdsInDB(res.data);
			}
			setIsLoadingSlots(false);
		});
	}, [date, roomInfo?.id]); // ดึงข้อมูลทุกครั้งที่วันหรือห้องเปลี่ยนไป

	// เก็บ id ของ slot ที่เลือกไว้ ในวันนั้นๆของมัน
	const handleAddToCart = () => {
		setSessions((prev) => {
			const existing = prev[date] || [];
			return {
				...prev,
				[date]: Array.from(new Set([...existing, ...selectedSlots])),
			};
		});
		setSelectedSlots([]);
	};

	// time slot ทั้งหมด + เพิ่ม tag ตาม id ที่โดนจอง
	const renderSlots = timeSlots?.map((slot) => ({
		...slot,
		isBooked: bookedSlotIdsInDB.includes(slot.id),
	}));

	// หา id ของ time slot ที่ถูกเลือกแล้ว
	const slotsInCartForToday = sessions[date] || [];

	const handleConfirmBooking = async () => {
		setIsSubmitting(true);
		try {
			for (const dateStr of Object.keys(sessions)) {
				const slotIds = sessions[dateStr];
				for (const slotId of slotIds) {
					const payload = {
						roomId: roomInfo.id,
						timeSlotId: parseInt(slotId, 10),
						bookingDate: dateStr,
						totalPrice: parseInt(pricePerRound, 10),
					};

					const res = await booking(payload);
					if (res.status !== 200) {
						throw new Error(res.message || "เกิดข้อผิดพลาดในการจอง");
					}
				}
			}

			toast.success("ทำรายการจองสำเร็จเรียบร้อยแล้ว");
			setSessions({}); // ล้างตะกร้า

			// รีเฟรชข้อมูลที่จองไปแล้วในวันนั้น
			if (date && roomInfo?.id) {
				const res = await getBookedTimeSlots(roomInfo.id, date);
				if (res.status === 200) {
					setBookedSlotIdsInDB(res.data);
				}
			}
		} catch (error) {
			toast.error(error.message || "เกิดข้อผิดพลาดในการจอง");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="lg:col-span-1">
			<div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-24 max-w-md mx-auto overflow-hidden">
				<h3 className="text-xl font-bold text-gray-900 mb-6">
					รายละเอียดการจอง
				</h3>

				{/* ราคาและราคาความจุ */}
				<div className="space-y-4 mb-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center text-gray-500">
							<Receipt className="w-4 h-4 mr-2" />
							<span className="text-sm">ราคาต่อรอบ</span>
						</div>
						<span className="text-lg font-bold text-blue-600">
							฿{pricePerRound}
						</span>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center text-gray-500">
							<Users className="w-4 h-4 mr-2" />
							<span className="text-sm">ความจุสูงสุด</span>
						</div>
						<span className="text-sm font-semibold text-gray-900">
							{capacity} ท่าน
						</span>
					</div>
				</div>

				<Separator className="mb-6" />

				{/* ------ ส่วนกรอกข้อมูลทีละวัน ------ */}
				<div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
					<h4 className="font-semibold text-gray-800 mb-4 text-sm flex items-center">
						<span className="bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">
							1
						</span>
						เลือกวันและเวลาที่ต้องการ
					</h4>

					{/* เลือกวันที่ */}
					<div className="mb-5">
						<Label
							htmlFor="bookingDate"
							className="mb-2 block text-xs font-semibold text-gray-600"
						>
							วันที่จอง (จองล่วงหน้าได้ 30 วัน)
						</Label>
						<Input
							id="bookingDate"
							type="date"
							min={todayStr}
							max={maxDate}
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className="rounded-xl border-gray-200 focus:ring-blue-500 bg-white"
						/>
					</div>

					{/* เลือกรอบเวลา (Layout ใหม่) */}
					<div className="mb-5">
						<div className="flex items-center justify-between mb-3">
							<Label className="text-xs font-semibold text-gray-600">
								เลือกรอบเวลา
							</Label>
							<span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
								{selectedSlots.length > 0
									? `${selectedSlots.length} Selected`
									: "Available Slots"}
							</span>
						</div>

						<ToggleGroup
							type="multiple" // อนุญาตให้เลือกได้หลายอัน
							value={selectedSlots}
							onValueChange={(value) => setSelectedSlots(value)} // value จะเป็น array ของ id ที่ถูกเลือก
							className="grid grid-cols-3 gap-2 w-full"
						>
							{renderSlots.map((slot_) => {
								const isAlreadyInCart = slotsInCartForToday.includes(slot_.id);
								const isDisabled =
									!date || slot_.isBooked || isAlreadyInCart || isLoadingSlots;

								return (
									<ToggleGroupItem
										key={slot_.id}
										value={slot_.id} // ส่งค่า id เข้าไป
										disabled={isDisabled}
										className={`
											flex flex-col h-auto py-2 px-1 border-[1.5px] rounded-md!
											data-[state=on]:bg-blue-50 data-[state=on]:border-blue-500 data-[state=on]:ring-1 data-[state=on]:ring-blue-500
											${isAlreadyInCart ? "bg-indigo-50 opacity-80" : "bg-white"}
										`}
									>
										<span className="text-[11px] font-bold tabular-nums text-gray-800">
											{slot_.startTime} <br /> {slot_.endTime}
										</span>
										<span className="text-[10px] uppercase text-gray-700">
											{isAlreadyInCart
												? "ในตะกร้า"
												: slot_.isBooked
													? "จองแล้ว"
													: slot_.label}
										</span>
									</ToggleGroupItem>
								);
							})}
						</ToggleGroup>
					</div>

					<Button
						type="button"
						disabled={selectedSlots.length === 0}
						onClick={handleAddToCart}
						className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 font-bold py-2 rounded-xl text-sm"
					>
						+ เพิ่มวันและเวลานี้เข้ารายการ
					</Button>
				</div>

				{/* ------ รายการบิลที่เลือก ------ */}
				{Object.keys(sessions).length > 0 && (
					<div className="mb-6 space-y-3">
						<h4 className="font-semibold text-gray-800 text-sm flex items-center mb-3">
							<span className="bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">
								2
							</span>
							รายการจองของคุณ ({Object.keys(sessions).length} บิล)
						</h4>

						{Object.keys(sessions).map((date) => (
							<div
								key={date}
								className="bg-white border border-gray-200 p-3 rounded-xl flex justify-between items-start shadow-sm relative"
							>
								<Button
									variant="ghost"
									size="icon"
									className="absolute top-2 right-2 h-6 w-6 text-gray-300 hover:text-red-500 cursor-pointer"
									onClick={() =>
										setSessions((prev) => {
											const newSessions = { ...prev };
											delete newSessions[date];
											return newSessions;
										})
									}
								>
									<X className="h-4 w-4 mb-3 ml-2" />
									<span className="sr-only">ลบรายการนี้</span>
								</Button>
								<div>
									<div className="text-sm font-bold text-gray-900 mb-1">
										{new Date(date).toLocaleDateString("th-TH", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</div>
									<div className="text-xs text-gray-500">
										จอง {sessions[date].length} รอบเวลา
									</div>
								</div>
								<div className="text-right mr-6">
									<div className="text-sm font-bold text-primary">
										฿{sessions[date].length * pricePerRound}
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{/* Footer Actions */}
				<div className="space-y-4">
					<p className="text-[11px] text-gray-400 text-center leading-relaxed">
						การจองแต่ละวันจะถูกแยกเป็นบิลย่อยชำระรวมกัน <br />
						กรุณาตรวจสอบรายละเอียดก่อนยืนยันค่ะ
					</p>
					<Button
						disabled={Object.keys(sessions).length === 0 || isSubmitting}
						onClick={handleConfirmBooking}
						className="w-full bg-gray-900 text-white hover:bg-black font-bold py-6 rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:bg-gray-300 disabled:opacity-50"
					>
						{isSubmitting ? "กำลังยืนยัน..." : "ยืนยันการจองทั้งหมด"}
					</Button>
				</div>
			</div>
		</div>
	);
}
