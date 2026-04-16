"use server";

import { revalidatePath } from "next/cache";
import { getSessionUserId } from "@/lib/get-user-id";
import { prisma } from "@/lib/prisma";

export async function topUp(amount) {
	try {
		const userId = await getSessionUserId();

		if (!amount || amount <= 0) {
			return { status: 400, message: "จำนวนเงินไม่ถูกต้อง" };
		}

		await prisma.$transaction([
			prisma.profile.update({
				where: { id: userId },
				data: {
					balance: {
						increment: amount,
					},
				},
			}),
			prisma.transaction.create({
				data: {
					userId: userId,
					amount: amount,
					description: "เติมเงิน (Top-up)",
				},
			}),
		]);

		revalidatePath("/new-coworking/top-up");
		revalidatePath("/new-coworking/my-profile");

		return { status: 200, message: "เติมเงินสำเร็จ" };
	} catch (error) {
		console.error("Top-up error:", error);
		return { status: 500, message: "เติมเงินไม่สำเร็จ" };
	}
}
