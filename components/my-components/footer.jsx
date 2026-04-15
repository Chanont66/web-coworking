"use client";

import { Zap } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MyFooter() {
	const pathname = usePathname();
	// เงื่อนไขในการยกเว้นหน้าต่างๆ
	if (
		pathname === "/new-coworking/login" ||
		pathname === "/new-coworking/register"
	) {
		return null;
	}

	return (
		<footer className="bg-[#020617] text-slate-400 py-12 border-t border-slate-800 relative">
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

			<div className="container mx-auto px-6">
				<div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:items-center">
					<div className="space-y-6">
						<div className="flex items-start gap-4">
							<div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner group transition-all">
								<Zap className="h-6 w-6 group-hover:scale-110 transition-transform text-white" />
							</div>

							<div className="space-y-1.5">
								<span className="text-3xl font-extrabold tracking-tighter text-white block">
									CoWork<span className="text-primary/90">.</span>
								</span>
								<div className="flex items-center gap-2">
									<p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-slate-500">
										Web App Project
									</p>
									<span className="text-slate-700">•</span>
									<p className="text-[11px] uppercase tracking-[0.3em] font-medium text-slate-600">
										CSC350
									</p>
								</div>
							</div>
						</div>

						<div className="pl-5 border-l border-slate-800">
							<p className="text-[11px] uppercase tracking-widest text-slate-600 font-medium mb-1.5">
								ออกแบบและพัฒนาโดย
							</p>
							<p className="text-base font-medium text-slate-200">
								Chanont Kulkaew
								<span className="text-slate-600 font-normal mx-2.5">|</span>
								<span className="font-mono text-sm text-slate-600">
									ID: 6605973
								</span>
							</p>
						</div>
					</div>

					<div className="flex flex-col items-start lg:items-end gap-6 w-full lg:w-auto">
						<div className="flex flex-wrap gap-2.5">
							{["Next.js", "Tailwind CSS", "Prisma", "Shadcn/UI"].map(
								(tech) => (
									<span
										key={tech}
										className="px-3.5 py-1.5 text-[11px] font-medium rounded-full bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:shadow-glow transition-all duration-300 shadow-sm"
									>
										{tech}
									</span>
								),
							)}
						</div>

						<div className="flex flex-col lg:items-end gap-1.5">
							<p className="text-[10px] tracking-widest text-slate-600 font-bold uppercase">
								© 2026 COWORK. สงวนลิขสิทธิ์
							</p>
							<div className="h-px w-6 bg-slate-800 rounded-full" />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
