'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import CopyEmail from '../../components/CopyEmail'
import { Button, Section } from '../../components/ui'

export default function PaymentPageWrapper() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-ink-soft">Loading...</div>}>
      <PaymentPage />
    </Suspense>
  )
}

function PaymentPage() {
  const searchParams = useSearchParams()
  const price = searchParams.get('price')
  const name = searchParams.get('name')

  const stripeMap: Record<string, string> = {
    '2 Lessons / Month': 'https://buy.stripe.com/9B614p79ufNqaRVeyS6EU03',
    '4 Lessons / Month': 'https://buy.stripe.com/3cIfZjeBW7gU1hl9ey6EU02',
    '8 Lessons / Month': 'https://buy.stripe.com/aFadRbgK41WA2lpbmG6EU01',
    '12 Lessons / Month': 'https://buy.stripe.com/9B600l0L644I6BF8au6EU00',
    'Trial Lesson / 50 minutes': 'https://buy.stripe.com/dRmaEZ51m7gU6BFeyS6EU04',
  }

  const checkoutUrl = name ? stripeMap[name] : undefined
  const isTrial = !!name?.includes('Trial')

  return (
    <Section bg="cream" className="!py-12 md:!py-20">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-8">
        <h1 className="text-center text-4xl">Payment</h1>

        {price && name ? (
          <div className="flex w-full flex-col gap-6 rounded-[1.75rem] bg-white p-8 shadow-card">
            <div className="flex flex-col gap-1 text-center">
              <p className="text-xl font-semibold">{name}</p>
              <p className="font-heading text-4xl font-bold">
                ${price} <span className="text-base font-medium text-ink-soft">{isTrial ? '/ one-time' : '/ month'}</span>
              </p>
            </div>

            {checkoutUrl ? (
              <Button href={checkoutUrl} variant="accent">
                Proceed to checkout
              </Button>
            ) : (
              <p className="rounded-full bg-sand px-6 py-3.5 text-center font-semibold text-ink-soft">
                No checkout URL available for this plan.
              </p>
            )}

            <hr className="border-line" />

            <div className="flex flex-col gap-3">
              <p className="font-semibold">After completing your payment, please contact me at the email below.</p>
              <CopyEmail />
              <p className="text-sm text-ink-soft">※ This email address is also listed on the home page.</p>
            </div>
          </div>
        ) : (
          <p className="text-xl text-ink-soft">No plan selected</p>
        )}

        <Button href={isTrial ? '/priceList/trialPage' : '/priceList'} variant="outline">
          Back to Page
        </Button>
      </div>
    </Section>
  )
}
