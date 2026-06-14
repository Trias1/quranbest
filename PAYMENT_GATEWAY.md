# Payment Gateway Integration Guide

Panduan integrasi payment gateway untuk fitur donasi di QuranBest.

## Option 1: Midtrans

### Setup Midtrans

1. Buat akun di [Midtrans](https://midtrans.com)
2. Dapatkan API keys dari dashboard Midtrans
3. Setup untuk production dan sandbox environment

### Install Midtrans SDK

```bash
npm install midtrans-client
```

### Implementation

```typescript
// src/lib/midtrans.ts
import midtransClient from 'midtrans-client'

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
})

export async function createTransaction(data: {
  amount: number
  email: string
  firstName: string
}) {
  return snap.createTransaction({
    transaction_details: {
      order_id: `order-${Date.now()}`,
      gross_amount: data.amount,
    },
    customer_details: {
      email: data.email,
      first_name: data.firstName,
    },
  })
}
```

### Webhook Handling

```typescript
// src/app/api/webhook/midtrans/route.ts
import crypto from 'crypto'
import { donationService } from '@/services/firestoreService'

export async function POST(request: Request) {
  const body = await request.json()
  
  // Verify signature
  const hash = crypto
    .createHash('sha512')
    .update(`${body.order_id}${body.status_code}${process.env.MIDTRANS_SERVER_KEY}`)
    .digest('hex')

  if (hash !== body.signature_key) {
    return Response.json({ error: 'Invalid signature' }, { status: 403 })
  }

  // Update donation status
  if (body.transaction_status === 'settlement') {
    // Success
    await donationService.update(body.order_id, 'success')
  } else if (body.transaction_status === 'pending') {
    // Pending
    await donationService.update(body.order_id, 'pending')
  } else if (body.transaction_status === 'deny' || body.transaction_status === 'expire') {
    // Failed
    await donationService.update(body.order_id, 'failed')
  }

  return Response.json({ ok: true })
}
```

## Option 2: Xendit

### Setup Xendit

1. Buat akun di [Xendit](https://xendit.co)
2. Dapatkan API keys
3. Setup webhook URL

### Install Xendit SDK

```bash
npm install xendit-node
```

### Implementation

```typescript
// src/lib/xendit.ts
import { Xendit } from 'xendit-node'

const xenditClient = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY,
})

export async function createInvoice(data: {
  amount: number
  email: string
  name: string
}) {
  const { Invoice } = xenditClient
  const invoiceSpecificOptions = {}

  return Invoice.createInvoice(
    {
      externalID: `donation-${Date.now()}`,
      amount: data.amount,
      payer_email: data.email,
      description: `Donasi QuranBest - ${data.name}`,
      shouldSendEmail: true,
      invoiceDuration: 86400, // 24 jam
    },
    invoiceSpecificOptions
  )
}
```

## Environment Variables

Tambahkan ke `.env.local`:

```bash
# Midtrans
MIDTRANS_SERVER_KEY=your_server_key
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_client_key

# Xendit
XENDIT_SECRET_KEY=your_secret_key
NEXT_PUBLIC_XENDIT_PUBLIC_KEY=your_public_key
```

## Testing Payment

### Midtrans Test Cards

- **Visa Success**: 4811 1111 1111 1114
- **Visa Decline**: 4111 1111 1111 1111
- **Mastercard**: 5555 5555 5555 4444

### Xendit Test

Gunakan sandbox environment untuk testing.

## Handling Payment Webhook

```typescript
// Webhook untuk menangani callback pembayaran
export async function handlePaymentWebhook(event: any) {
  const { status, order_id } = event

  if (status === 'success') {
    // Update donation status ke success
    await updateDonationStatus(order_id, 'success')
    
    // Send confirmation email
    await sendDonationConfirmationEmail(order_id)
  }
}
```

## Best Practices

1. **Always verify webhook signature** - Pastikan webhook benar-benar dari payment gateway
2. **Idempotency** - Handle duplikasi webhook
3. **Timeout handling** - Set timeout untuk transaksi
4. **Error handling** - Tangani berbagai error scenarios
5. **Logging** - Log semua transaksi untuk audit trail

## Next Steps

1. Pilih payment gateway (Midtrans atau Xendit)
2. Setup akun dan dapatkan credentials
3. Install SDK
4. Implementasi di donation page
5. Setup webhook endpoint
6. Testing dengan test cards
7. Go live dengan production keys

---

Untuk dokumentasi lengkap:
- [Midtrans Docs](https://docs.midtrans.com)
- [Xendit Docs](https://xendit.co/docs)
