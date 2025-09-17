/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // app ディレクトリの場合
    "./pages/**/*.{js,ts,jsx,tsx}", // pages ディレクトリの場合
    "./components/**/*.{js,ts,jsx,tsx}", // コンポーネント
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
