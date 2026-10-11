/** @type {import('next').NextConfig} */

// 全ページに付けるセキュリティヘッダー。
// CSP(Content-Security-Policy)は、GA・YouTubeの許可リストが必要なため、ここでは入れていない。
const securityHeaders = [
  // 他サイトの iframe に埋め込まれるのを防ぐ(決済ページの偽装対策)
  { key: 'X-Frame-Options', value: 'DENY' },
  // ブラウザによる Content-Type の推測を止める
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // 外部へ送る Referer を、オリジンだけにする(YouTube の埋め込みはこの設定で動く)
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // このサイトでは使わない機能を無効にする
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig = {
  // 'X-Powered-By: Next.js' を出さない
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  async redirects() {
    // 削除した旧デザインのページ。リンクが残っていても 404 にならないようにする
    return [{ source: '/japanTour', destination: '/guidePage', permanent: false }]
  },
}

module.exports = nextConfig
