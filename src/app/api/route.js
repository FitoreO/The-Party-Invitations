import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(request) {
    const res = await prisma.passwords.findMany();
    return NextResponse.json({res})
}

export async function POST(request) {
    const res = await prisma.passwords.findMany();
    const body = await request.json();
    console.log(body);



    const password = await prisma.passwords.findFirst({
        where: {
            password: body.password
        }
    })

    console.log('this is a password', password);
    const newUser = await prisma.user.create({
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
            number: body.number,
            email: body.email,
            passwords: {
                connect: {id: password.id}
            },
        }
    })
    return NextResponse.json({newUser})
}