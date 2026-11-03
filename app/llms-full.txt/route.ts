import { buildLlmsFullTxt, TEXT_HEADERS } from '@/lib/llms';
import { getEvents, getInvestments } from '@/lib/data';

export const dynamic = 'force-static';

export function GET() {
  const body = buildLlmsFullTxt({ investments: getInvestments(), events: getEvents() });
  return new Response(body, { headers: TEXT_HEADERS });
}
