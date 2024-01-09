import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export default async function handler(request) {
    const loginUserName = process.env.NEXT_PUBLIC_USERNAME;
    const loginPassword = process.env.NEXT_PUBLIC_PASSWORD;

    const body = await request.json();

    if (body.username === loginUserName && body.password === loginPassword) {
        console.log('Credentials are correct from server');
        return NextResponse.json({ success: true });
    } else {
        return NextResponse.json({ error: 'Invalid credentials' });
    }
}
