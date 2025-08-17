'use client'

import { useSearchParams } from 'next/navigation'

export default function PaymentComponent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') // URLパラメータからidを取得

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
      {id ? (
        <p className="text-lg">Payment ID: {id}</p>
      ) : (
        <p className="text-lg text-gray-500">No Payment ID provided</p>
      )}
      <button
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        onClick={() => alert('Proceeding to payment...')}
      >
        Pay Now
      </button>
    </div>
  )
}
