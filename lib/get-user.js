"use server";
// this function is used to get the current user from the session

export async function get_current_user() {
	try {
		const session = await cookies();
		const userId = session.get("session")?.value;

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
			},
		});

		if (!user) return { status: 404, user: null };

		return { status: 200, user };
	} catch {
		return { status: 500, user: null };
	}
}
