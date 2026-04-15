"use server";

import { getSessionUserId } from "@/lib/get-user-id";
import { prisma } from "@/lib/prisma";

export async function getUserInfo() {
	try {
		const userId = await getSessionUserId();

		if (!userId) return { status: 404, user: null };

		const user = await prisma.profile.findUnique({
			where: { id: userId },
			select: {
				id: true,
				username: true,
				email: true,
				firstName: true,
				lastName: true,
				phone: true,
				balance: true,
			},
		});

		if (!user) return { status: 404, user: null };

		return { status: 200, user };
	} catch {
		return { status: 500, user: null };
	}
}
