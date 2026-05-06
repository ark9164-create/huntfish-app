export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const appPassword = process.env.APP_PASSWORD;
  if (!appPassword) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  try {
    const { password } = await req.json();
    if (password === appPassword) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    return new Response(JSON.stringify({ ok: false, error: 'Wrong password' }), { status: 401 });
  } catch {
    return new Response(JSON.stringify({ error: 'Bad request' }), { status: 400 });
  }
}
