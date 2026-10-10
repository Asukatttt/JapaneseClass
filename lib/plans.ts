// Plan names are also the keys of the Stripe link map in app/payment/page.tsx.
export interface Plan {
  name: string
  lessons: number
  price: number
  recommended?: boolean
}

export const PLANS: Plan[] = [
  { name: '2 Lessons / Month', lessons: 2, price: 84 },
  { name: '4 Lessons / Month', lessons: 4, price: 165 },
  { name: '8 Lessons / Month', lessons: 8, price: 328, recommended: true },
  { name: '12 Lessons / Month', lessons: 12, price: 490 },
]
