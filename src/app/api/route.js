import {NextResponse} from "next/server";
import { PrismaClient} from "../../../prisma/generated/client";

const prisma = new PrismaClient();

export async function GET(request) {
    const res = await prisma.user.findMany();
    return NextResponse.json({res})
}

export async function POST(request) {
    const body = await request.json();

    const password = await prisma.passwords.findFirst({
        where: {
            password: body.password
        }
    })

    if (!password) {
        return NextResponse.json({
            error: 'Wrong Password. Please try again'
        }, {status: 500})
    }

    const doesUserExist = await prisma.user.findFirst({
        where: {
            email: body.email
        }
    })

    if (doesUserExist) {
        return NextResponse.json({
            error: 'User with this email already exists'
        }, {status: 500})
    }

    try {
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
    } catch (error) {
        return NextResponse.json({
            error: 'Unexpected error'
        }, {status: 500})
    }
}