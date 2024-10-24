import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeFirebaseAdmin } from '@/app/lib/firebaseAdmin';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    initializeFirebaseAdmin();
    const { walletAddress } = await req.json();
    const customToken = await getAuth().createCustomToken(walletAddress);
    console.log('customToken', customToken);
    return NextResponse.json({ customToken });
  } catch (error) {
    console.error('Error generating custom token:', error);
    return NextResponse.json({ error: 'Failed to generate custom token' }, { status: 500 });
  }
}
