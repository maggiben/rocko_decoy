import { NextRequest, NextResponse } from 'next/server';

const { SLACK_WEBHOOK_URL } = process.env;

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: NextRequest) {
  if (SLACK_WEBHOOK_URL) {
    try {
      const { message, level } = await req.json();

      await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: `${level.toUpperCase()}: ${message}`,
        }),
      });

      return NextResponse.json({ msg: 'OK' }, { status: 200 });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return NextResponse.json(
        { error: 'Error Proccessing Log' },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json({ error: 'Logging Unavailable' }, { status: 501 });
  }
}
