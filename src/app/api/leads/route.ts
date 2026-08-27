import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Lead from "@/lib/models/Lead";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (status !== "all") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { workEmail: { $regex: search, $options: "i" } },
        { practiceName: { $regex: search, $options: "i" } },
        { specialty: { $regex: search, $options: "i" } },
        { primaryService: { $regex: search, $options: "i" } },
      ];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 }).lean();

    // Calculate quick stats
    const totalCount = await Lead.countDocuments();
    const newCount = await Lead.countDocuments({ status: "New" });
    const contactedCount = await Lead.countDocuments({ status: "Contacted" });
    const closedCount = await Lead.countDocuments({ status: "Closed" });

    return NextResponse.json({
      leads,
      stats: {
        total: totalCount,
        new: newCount,
        contacted: contactedCount,
        closed: closedCount,
      },
    });
  } catch (error: unknown) {
    console.error("Fetch Leads Error:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch leads";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
