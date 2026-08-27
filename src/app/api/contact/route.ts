import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Lead from "@/lib/models/Lead";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      workEmail,
      countryCode = "+1",
      phoneNumber = "",
      practiceName,
      role,
      specialty,
      primaryService,
      challenges = "",
      source = "Strategy Call Form",
    } = body;

    // Validation
    if (!firstName || !lastName || !workEmail || !practiceName || !role || !specialty || !primaryService) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // 1. Save Lead to MongoDB Atlas Database
    await connectToDatabase();

    const newLead = await Lead.create({
      firstName,
      lastName,
      workEmail,
      countryCode,
      phoneNumber,
      practiceName,
      role,
      specialty,
      primaryService,
      challenges,
      status: "New",
      source,
    });

    // 2. Forward to Web3Forms for Instant Email Notification
    const web3formsAccessKey =
      process.env.WEB3FORMS_ACCESS_KEY || "9cad453d-531f-4e5a-bba1-85ddc2b9e3df";

    let emailSent = false;
    if (web3formsAccessKey && web3formsAccessKey.trim() !== "") {
      try {
        const web3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3formsAccessKey,
            subject: `🚀 New Strategy Call Request: ${firstName} ${lastName} (${practiceName})`,
            from_name: "gosvizzera Lead Notification",
            name: `${firstName} ${lastName}`,
            email: workEmail,
            phone: `${countryCode} ${phoneNumber}`,
            practice_name: practiceName,
            role,
            specialty,
            primary_service: primaryService,
            challenges: challenges || "None specified",
            submitted_at: new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }),
          }),
        });

        const web3Data = await web3Res.json();
        if (web3Data.success) {
          emailSent = true;
        } else {
          console.warn("Web3Forms API response warning:", web3Data);
        }
      } catch (err) {
        console.error("Web3Forms forwarding error:", err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your strategy session request has been received.",
        leadId: newLead._id,
        emailSent,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Contact Form Submission Error:", error);
    const message = error instanceof Error ? error.message : "Failed to process request";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
