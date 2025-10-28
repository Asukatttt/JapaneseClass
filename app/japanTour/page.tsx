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
			<p className="text-xl mb-8 text-center max-w-xl">Experience Japan! Join Hiyori-sensei for a special Japan tour program and make unforgettable memories together!</p>
			<div className="mt-6 bg-[#F9D1A9] px-6 py-8 rounded-xl shadow-lg max-w-2xl text-center">
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
		</motion.div>
	);
}
