// Midtrans Payment Integration
// Install: npm install midtrans-client

/**
 * Example implementation for Midtrans payment gateway
 * Uncomment and configure when ready to integrate payments
 */

// import midtransClient from 'midtrans-client'

// const snap = new midtransClient.Snap({
//   isProduction: process.env.NODE_ENV === 'production',
//   serverKey: process.env.MIDTRANS_SERVER_KEY,
//   clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
// })

// export async function createMidtransTransaction(data: {
//   amount: number
//   email: string
//   firstName: string
//   lastName?: string
//   phone?: string
// }) {
//   try {
//     const transaction = await snap.createTransaction({
//       transaction_details: {
//         order_id: `order-${Date.now()}`,
//         gross_amount: data.amount,
//       },
//       customer_details: {
//         email: data.email,
//         first_name: data.firstName,
//         last_name: data.lastName,
//         phone: data.phone,
//       },
//     })

//     return transaction
//   } catch (error) {
//     console.error('Midtrans error:', error)
//     throw error
//   }
// }

// export async function getMidtransToken(transaction: any) {
//   return transaction.token
// }

// For webhook verification
// import crypto from 'crypto'

// export function verifyMidtransSignature(
//   orderId: string,
//   statusCode: string,
//   grossAmount: string,
//   signatureKey: string
// ): boolean {
//   const hash = crypto
//     .createHash('sha512')
//     .update(`${orderId}${statusCode}${grossAmount}${process.env.MIDTRANS_SERVER_KEY}`)
//     .digest('hex')

//   return hash === signatureKey
// }

export {}
