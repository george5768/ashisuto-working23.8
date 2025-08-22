import { Resend } from 'resend';
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, message, mobile, company } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    const data = await resend.emails.send({
      from: 'updates <contact@updates.ashisuto-tech.com>', // must match your verified domain
      to: ['cefinny@ashisuto-tech.com'],
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Company Name:</strong> ${company}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}