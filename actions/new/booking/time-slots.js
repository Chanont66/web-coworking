"use server";

import { prisma } from "@/lib/prisma";

export async function getTimeSlots() {
	try {
		const res = await prisma.timeSlot.findMany({
			orderBy: {
				id: "asc", // เรียงลำดับตามเวลาเริ่ม
			},
		});
		return { status: 200, data: JSON.parse(JSON.stringify(res)) };
	} catch {
		return { status: 500, message: "เกิดข้อผิดพลาดในการดึงข้อมูลช่วงเวลา" };
	}
}

export async function getBookedTimeSlots(roomId, date) {
	try {
		const bookedSlots = await prisma.booking.findMany({
			where: {
				roomId: Number(roomId),
				bookingDate: new Date(date),
			},
			select: { timeSlotId: true },
		});

		const bookedSlotIds = bookedSlots.map((b) => b.timeSlotId);
		return { status: 200, data: bookedSlotIds };
	} catch {
		return { status: 500, message: "เกิดข้อผิดพลาดในการดึงข้อมูลช่วงเวลา" };
	}
}
