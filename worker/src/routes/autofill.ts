import type { Env } from "../index";
import { json } from "../lib/utils";

interface EnvWithAI extends Env {
    AI?: { run: (model: string, opts: unknown) => Promise<{ response?: string }> };
    OPENAI_API_KEY?: string;
}

const SYSTEM_PROMPT = `You are a technical report writer for ANBE Nigeria Limited, an indigenous oil & gas engineering company in Nigeria.

When given a project description, generate a complete close-out report in JSON format.

Return ONLY valid JSON with these exact keys (no markdown, no explanation):
{
  "project_title": "string — concise project title",
  "contractor": "ANBE Nigeria Limited",
  "introduction": "string — 2-3 sentence paragraph introducing the project, client, and location",
  "scope_of_work": "string — detailed paragraph describing all work performed",
  "conclusion": "string — 2-3 sentence professional summary of project outcome",
  "achievements": ["string", "..."],
  "hse_notes": ["string", "..."],
  "hse_status": [["HSE item", "Status"], ...],
  "personnel": [["Role", "Number"], ...],
  "equipment": [["Equipment", "Quantity"], ...],
  "work_summary": {
    "mechanical": [["Activity description", "Quantity/unit"], ...],
    "civil": [["Activity description", "Quantity/unit"], ...],
    "ei": [["Activity description", "Quantity/unit"], ...]
  },
  "materials": {
    "mechanical": [["1", "Material description", "Qty supplied", "Qty used", "Balance"], ...],
    "civil": [["1", "Material description", "Qty supplied", "Qty used", "Balance"], ...],
    "ei": [["1", "Material description", "Qty supplied", "Qty used", "Balance"], ...]
  }
}

Rules:
- Use professional engineering language appropriate for Nigerian oil & gas close-out reports
- HSE notes should include typical items: toolbox talks, PTW compliance, LTI record, PPE usage
- Personnel should list realistic roles: Project Supervisor, Engineers, Welders, Fitters, HSE Officer etc.
- Equipment should list typical construction equipment used
- If info is not provided, use realistic placeholder values based on the project type
- Always include at least 3 achievements, 4 HSE notes, 3 personnel roles
- Materials should be realistic for the project type (pipeline, flare, fabrication, maintenance)`;

async function callAI(env: EnvWithAI, prompt: string): Promise<Record<string, unknown>> {
    const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
    ];

    // Try Cloudflare Workers AI first (free, no key needed)
    if (env.AI) {
        try {
            const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
                messages,
                max_tokens: 3000,
                temperature: 0.3,
            });
            const raw = (result.response ?? "").trim();
            const start = raw.indexOf("{");
            const end = raw.lastIndexOf("}");
            if (start !== -1 && end !== -1) {
                return JSON.parse(raw.slice(start, end + 1));
            }
            throw new Error("No JSON found in AI response");
        } catch (e) {
            console.error("CF AI error:", String(e));
            if (!env.OPENAI_API_KEY) throw e;
        }
    }

    // Fallback: OpenAI
    if (env.OPENAI_API_KEY) {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages,
                temperature: 0.3,
                max_tokens: 3000,
                response_format: { type: "json_object" },
            }),
        });
        const data = await res.json<{ choices?: { message?: { content?: string } }[] }>();
        const raw = data.choices?.[0]?.message?.content ?? "{}";
        return JSON.parse(raw);
    }

    throw new Error("No AI service configured. Please contact your administrator.");
}

export async function handleAutofill(request: Request, env: EnvWithAI): Promise<Response> {
    if (request.method !== "POST") return json({ error: "POST required" }, 405);

    const contentType = request.headers.get("content-type") ?? "";

    // Mode 1: AI generation from a text prompt
    if (contentType.includes("application/json")) {
        const body = await request.json<{ prompt?: string; text?: string }>();
        const input = body.prompt ?? body.text ?? "";
        if (!input.trim()) return json({ error: "Please provide a project description." }, 400);

        try {
            const data = await callAI(env as EnvWithAI, `Generate a complete close-out report for this project:\n\n${input}`);
            return json({ data });
        } catch (e) {
            return json({ error: (e as Error).message }, 500);
        }
    }

    // Mode 2: Extract from uploaded document
    if (contentType.includes("multipart/form-data")) {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        if (!file) return json({ error: "No file provided" }, 400);

        const buf = await file.arrayBuffer();
        const decoder = new TextDecoder("utf-8", { fatal: false });
        let text = decoder.decode(buf)
            .replace(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\uFFFF]/g, " ")
            .replace(/\s{3,}/g, "\n")
            .slice(0, 10000);

        if (!text.trim()) return json({ error: "Could not read text from file. Try a plain text or Word document." }, 400);

        try {
            const data = await callAI(env as EnvWithAI, `Extract and enhance this close-out report document into a complete structured report:\n\n${text}`);
            return json({ data });
        } catch (e) {
            return json({ error: (e as Error).message }, 500);
        }
    }

    return json({ error: "Unsupported content type" }, 400);
}
