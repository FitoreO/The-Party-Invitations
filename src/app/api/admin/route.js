import {NextResponse} from 'next/server';
import {PrismaClient} from "../../../../prisma/generated/client";

const prisma = new PrismaClient();

export async function POST(request) {
    const loginUserName = process.env.FORM_LOGIN_USERNAME;
    const loginPassword = process.env.FORM_LOGIN_PASSWORD;
    const body = await request.json();

    if (body.username === loginUserName && body.password === loginPassword) {
        console.log('Credentials are correct from server');
        const res = await prisma.user.findMany();
        return NextResponse.json({res})
    } else {
        return NextResponse.json({error: 'Invalid credentials'});
    }
}