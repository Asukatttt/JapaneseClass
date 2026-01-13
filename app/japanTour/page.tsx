"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInUp = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function JapanTourPage() {
	return (
		<motion.div
			className="min-h-screen flex flex-col justify-center items-center bg-[#F2FAEF] text-[#1D3658] relative"
			initial="hidden"
			animate="visible"
			variants={fadeInUp}
		>
			{/* Back to Home button at top-left */}
			<div className="absolute top-6 left-6">
				<Link href="/">
					<button className="bg-[#1D3658] text-[#F2FAEF] px-4 py-2 rounded-lg shadow hover:bg-[#447A9C] transition font-semibold text-base">Back to Home</button>
				</Link>
			</div>
			<h1 className="text-5xl font-bold mb-8">Japan Tour</h1>
			<div className="w-full max-w-5xl flex flex-col md:flex-row md:items-start md:gap-6">
				<div className="md:flex-1">
					<p className="text-xl mb-8 text-center max-w-xl mx-auto">Experience Japan! Join Hiyori-sensei for a special Japan tour program and make unforgettable memories together!</p>
					<div className="hidden md:flex md:items-start md:justify-center md:w-[100%]">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }}
							className="max-w-[480px] w-full"
						>
							<img
								src="/images/S__23560211.jpg"
								alt="HIyori Profile"
								className="rounded-lg w-full h-auto"
							/>
						</motion.div>
					</div>
					<div className="mt-6 bg-[#F9D1A9] mb-6 mx-auto max-w-xl rounded-xl shadow-lg text-center md:text-center px-8 py-10">
						<p className="text-xl mb-6 mx-auto max-w-xl text-red-600">
							To apply for the tour, please send an email to the address below with the subject line "Japan tour".
						</p>
				 		<a
				 			href="mailto:hiyorijapaneseclass@gmail.com"
				 			className="inline-block bg-[#1D3658] text-[#F2FAEF] px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform font-semibold"
				 		>
				 			hiyorijapaneseclass@gmail.com
				 		</a>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
