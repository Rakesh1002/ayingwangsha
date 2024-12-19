import { NextResponse } from "next/server";

const ADMIN_WHATSAPP = process.env.WHATSAPP_ADMIN_NUMBER;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, service, date, time, message } = body;

    // Format message for WhatsApp
    const whatsappMessage = `
*New Booking Request!*
------------------
*Name:* ${name}
*Phone:* ${phone}
*Service:* ${service}
*Date:* ${date}
*Time:* ${time}
*Message:* ${message}
    `.trim();

    // Generate WhatsApp URL
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`;

    return NextResponse.json({ success: true, whatsappUrl });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
