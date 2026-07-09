import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'Missing API key' }, { status: 500 })
  }

  const resend = new Resend(apiKey)

  const {
    email,
    name,
    company,
    jobTitle,
    contactNumber,
    invitedBy,
    aiDevelopmentStatus,
    questionsBeforehand,
  } = await req.json()

  if (!email || !name || !company || !jobTitle || !contactNumber || !invitedBy || !aiDevelopmentStatus) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const data = await resend.emails.send({
      from: 'updates <contact@updates.ashisuto-tech.com>',
      to: ['ashisutoglobal@ashisuto-global.com'],
      subject: 'New Semicon Event Registration – July 30',
      html: `
        <h2>New Semicon Event Registration</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        <p><strong>Contact Number:</strong> ${contactNumber}</p>
        <p><strong>Invited By:</strong> ${invitedBy}</p>
        <p><strong>Current AI Development Status:</strong> ${aiDevelopmentStatus}</p>
        <p><strong>Questions Beforehand:</strong><br/>${questionsBeforehand || '—'}</p>
      `,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
