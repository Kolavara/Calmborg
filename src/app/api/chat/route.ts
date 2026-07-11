import { NextRequest, NextResponse } from "next/server";
import {
  company,
  companyProfile,
  productCategories,
  whyChooseUs,
  stats,
} from "@/lib/data";

/* ─── System prompt with full product context ─── */
function buildSystemPrompt(): string {
  // Build a compact product catalog summary
  const catalog = productCategories
    .map(
      (cat) =>
        `[${cat.title}] (${cat.brand || "Calm Borg"}): ${cat.subtitle}. Products: ${cat.products.slice(0, 6).join(", ")}${cat.products.length > 6 ? ` +${cat.products.length - 6} more` : ""}`,
    )
    .join("\n");

  return `You are the **Calm Borg AI Product Assistant** — a knowledgeable, friendly sales & technical expert for Calm Borg Precision Tooling Solutions.

## Your Role
- Help users find the right cutting tools, tool holders, inserts, and machining accessories.
- Provide technical advice on CNC machining, tool selection, and application guidance.
- Answer questions about product specifications, materials, coatings, and compatibility.
- Recommend products based on the user's machining needs (material, operation, machine type).
- Be conversational, concise, and professional. Use bullet points for clarity when suggesting multiple products.

## Company Context
- **Name**: ${company.name}
- **Tagline**: "${company.tagline}"
- **Brands**: ${company.authorizedBrands.join(", ")}
- **Experience**: ${company.yearsExperience}+ years
- **Stats**: ${stats.map((s) => `${s.value} ${s.label}`).join(" | ")}
- **Website**: ${company.website}
- **Contact**: ${company.phone} | ${company.email}
- **Location**: ${company.address}
- **Mission**: ${companyProfile.mission}

## Product Catalog
${catalog}

## Key Advantages
${whyChooseUs.map((w) => `- ${w.title}: ${w.description}`).join("\n")}

## Guidelines
1. Always lead with the most relevant product recommendation(s) based on the user's needs.
2. If you need more details (material, operation, machine), ask clarifying questions.
3. Mention brands and specific product names when recommending.
4. Keep responses under 200 words unless the user asks for detailed specs.
5. Be warm and professional — you're a helpful expert, not a robot.
6. If a user asks about something outside your product knowledge, politely say you'll connect them with a human specialist.
7. Use the "**【product name】**" format when mentioning specific products.
8. At the end of longer recommendations, offer to provide pricing or connect with the sales team.

Remember: You are helping manufacturers improve productivity and reduce costs through the right tooling solutions.`;
}

/* ─── POST /api/chat ─── */
export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as {
      messages: { role: "user" | "assistant" | "system"; content: string }[];
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "GROQ_API_KEY is not configured. Please add your Groq API key to the .env.local file.",
        },
        { status: 500 },
      );
    }

    const systemMessage: { role: "system"; content: string } = {
      role: "system",
      content: buildSystemPrompt(),
    };

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [systemMessage, ...messages],
          temperature: 0.7,
          max_completion_tokens: 1024,
          stream: true,
        }),
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Groq API error:", response.status, errorBody);
      return NextResponse.json(
        { error: `Groq API returned ${response.status}: ${errorBody}` },
        { status: response.status },
      );
    }

    // Stream the response back to the client
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
