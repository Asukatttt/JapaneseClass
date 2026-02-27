import Link from "next/link";

export default function Home() {
  return (
  <div className="min-h-screen flex flex-col justify-center items-center bg-[#FFF0F6] text-[#1D3658] px-6">
      {/* タイトル */}
      <h1 className="text-6xl font-extrabold mb-4 drop-shadow-md text-center">
        Welcome!
      </h1>
      <p className="text-lg mb-12 text-[#1D3658]/80 text-center">
        Learn Japanese & Explore Japan 🇯🇵
      </p>

      {/* ボタンエリア */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
        {/* Japanese Lesson */}
        <Link href="/top" className="w-full">
          <div className="bg-[#1D3658] text-[#F2FAEF] px-10 py-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all text-2xl font-semibold text-center">
            Japanese Lesson
          </div>
        </Link>

        {/* Japan Tour */}
        <Link href="/guidePage" className="w-full">
          <div className="bg-[#F9D1A9] text-[#1D3658] px-10 py-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all text-2xl font-semibold text-center">
            Japan Tour
          </div>
        </Link>
      </div>

      {/* フッターテキスト */}
      <p className="mt-16 text-sm text-[#1D3658]/70">
        Experience Japan — Learn, Travel, and Enjoy 🌸
      </p>
    </div>
  );
}
