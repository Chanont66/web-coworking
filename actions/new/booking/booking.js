"use server";

import { getSessionUserId } from "@/lib/get-user-id";
import { prisma } from "@/lib/prisma";

export async function booking(data) {
	const { roomId, timeSlotId, bookingDate, totalPrice } = data;
	const userId = await getSessionUserId();

	if (!userId) {
		return { status: 401, message: "กรุณาเข้าสู่ระบบก่อนทำการจอง" };
	}

	try {
		await prisma.$transaction(async (tx) => {
			const had_booking = await tx.booking.findFirst({
				where: {
					roomId: roomId,
					timeSlotId: timeSlotId,
					bookingDate: new Date(bookingDate),
				},
			});

			if (had_booking) {
				throw new Error("ห้องนี้ถูกจองแล้วในช่วงเวลาดังกล่าว");
			}

			// จอง
			await tx.booking.create({
				data: {
					userId: userId,
					roomId: roomId,
					timeSlotId: timeSlotId,
					bookingDate: new Date(bookingDate),
					totalPrice: totalPrice,
				},
			});

			// ตรวจสอบและหักเงิน
			const userProfile = await tx.profile.findUnique({
				where: { id: userId },
				select: { balance: true },
			});

			if (!userProfile || userProfile.balance < totalPrice) {
				throw new Error("ยอดเงินไม่เพียงพอ");
			}

			await tx.profile.update({
				where: { id: userId },
				data: {
					balance: {
						decrement: totalPrice,
					},
				},
			});

			// ดึงข้อมูลห้องและช่วงเวลา เพื่อเอามาเขียน description
			const room = await tx.room.findUnique({
				where: { id: roomId },
				select: { name: true },
			});

			const timeSlot = await tx.timeSlot.findUnique({
				where: { id: timeSlotId },
				select: { startTime: true, endTime: true, label: true },
			});

			const formattedDate = new Date(bookingDate).toLocaleDateString("th-TH", {
				year: "numeric",
				month: "long",
				day: "numeric",
			});

			// เพิ่มรายการธุรกรรม (ประวัติ)
			await tx.transaction.create({
				data: {
					userId: userId,
					amount: totalPrice,
					description: `จองห้อง ${room?.name || roomId} (${timeSlot?.label}: ${timeSlot?.startTime}-${timeSlot?.endTime}) วันที่จอง ${formattedDate}`,
				},
			});
		});

		return { status: 200, message: "ทำรายการจองห้องสำเร็จ" };
	} catch (error) {
		return { status: 500, message: error.message };
	}
}
