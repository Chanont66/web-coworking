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
					OR: [
						{
							status: "confirmed",
						},
						{
							status: "pending",
							createdAt: {
								gte: new Date(Date.now() - 15 * 60 * 1000),
							},
						},
					],
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
					status: "pending",
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

			// เพิ่มรายการธุรกรรม (ประวัติ)
			await tx.transaction.create({
				data: {
					userId: userId,
					amount: totalPrice,
					type: "payment",
					description: `รายการจองห้อง ${roomId}`,
				},
			});
		});

		return { status: 200, message: "ทำรายการจองห้องสำเร็จ" };
	} catch (error) {
		return { status: 500, message: error.message };
	}
}
