import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/validate — AI Validation Panel
 *
 * Sends audience / goal / messages to Claude and returns a JSON verdict:
 * winner, why-it-won, objections, improved options.
 *
 * Edge-incompatible (uses Node fetch with a long timeout); runs on the
 * default Node runtime so we can comfortably wait on Anthropic.
 */

export const runtime = 'nodejs';
export const maxDuration = 60;

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-6';

const SYSTEM_PROMPT = `You are an AI marketing research moderator running an AI Validation Panel.
Your job is to act as a neutral, critical evaluator of marketing messages for a specific audience and goal.
Always return concise, practical output as JSON only, matching the provided schema.`;

interface ValidateResponse {
  winnerMessage: string;
  whyItWon: string;
  objections: string[];
  improvedOptions: string[];
}

function sanitize(s: unknown, max: number): string {
  if (typeof s !== 'string') return '';
  return s.trim().slice(0, max);
}

function buildUserMessage(
  audience: string,
  goal: string,
  messages: string[],
): string {
  const numbered = messages.map((m, i) => `${i + 1}) ${m}`).join('\n');
  return `Audience:
${audience}

Goal:
${goal}

Messages to evaluate:
${numbered}

Step 1:
Infer exactly 4 distinct buyer persona types that fit this audience (roles, company types, goals, pains, objections).
You do NOT need to output the personas; just use them internally to inform your judgment.

Step 2:
For all personas combined, evaluate EACH message on:
- Clarity (1–5)
- Relevance (1–5)
- Credibility (1–5)
- Curiosity (1–5)
- Actionability (1–5)
- Objections: what might make buyers skeptical or resistant

Step 3:
Choose ONE overall winner message and explain:
- Why it wins overall
- Where it might still create skepticism or confusion

Step 4:
Propose 2–3 improved versions of the winning message that:
- Keep its core promise
- Address the major objections
- Stay realistic and believable

Return final output ONLY as valid JSON, with this exact schema:

{
  "winnerMessage": string,
  "whyItWon": string,
  "objections": string[],
  "improvedOptions": string[]
}`;
}

function extractJson(text: string): unknown {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/i, '');
  const first = cleaned.indexOf('{');
  const last = cleaned.lastIndexOf('}');
  if (first === -1 || last === -1) {
    throw new Error('No JSON object found in model response');
  }
  return JSON.parse(cleaned.slice(first, last + 1));
}

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => String(x ?? '').trim()).filter(Boolean);
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server is not configured (missing ANTHROPIC_API_KEY).' },
      { status: 500 },
    );
  }

  let raw: any;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const audience = sanitize(raw?.audience, 2000);
  const goal = sanitize(raw?.goal, 2000);
  const messages: string[] = Array.isArray(raw?.messages)
    ? raw.messages
        .map((m: unknown) => sanitize(m, 1000))
        .filter(Boolean)
        .slice(0, 20)
    : [];

  if (!audience || !goal || messages.length < 2) {
    return NextResponse.json(
      {
        error:
          'Please provide an audience, a goal, and at least 2 messages to compare.',
      },
      { status: 422 },
    );
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 55_000);

  try {
    const upstream = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: buildUserMessage(audience, goal, messages),
          },
        ],
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => '');
      console.error('Anthropic upstream error:', upstream.status, detail);
      return NextResponse.json(
        { error: 'The validation panel could not run. Please try again.' },
        { status: 502 },
      );
    }

    const data: any = await upstream.json();
    const textBlock = Array.isArray(data?.content)
      ? data.content.find((c: any) => c?.type === 'text')
      : null;
    const text: string = typeof textBlock?.text === 'string' ? textBlock.text : '';

    let parsed: any;
    try {
      parsed = extractJson(text);
    } catch (e) {
      console.error('Failed to parse model JSON:', e, 'raw:', text.slice(0, 500));
      return NextResponse.json(
        { error: 'The panel returned an unexpected shape. Please try again.' },
        { status: 502 },
      );
    }

    const result: ValidateResponse = {
      winnerMessage: sanitize(parsed?.winnerMessage, 4000),
      whyItWon: sanitize(parsed?.whyItWon, 4000),
      objections: asStringArray(parsed?.objections).slice(0, 12),
      improvedOptions: asStringArray(parsed?.improvedOptions).slice(0, 6),
    };

    return NextResponse.json(result);
  } catch (err: any) {
    clearTimeout(timer);
    if (err?.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timed out. Try fewer or shorter messages.' },
        { status: 504 },
      );
    }
    console.error('Validate route failed:', err);
    return NextResponse.json(
      { error: 'Something went wrong on our end. Please try again.' },
      { status: 500 },
    );
  }
}
