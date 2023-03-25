import {db} from "../src/libs/prisma";

async function seed() {
    const user = await db.user.create({
        data: {
            email: "example@gmail.com",
            userName: "seed-user-1",
            role: "admin",
            dataCreate: new Date(Date.now()),
            profile: {
                create: {
                    lastName: "Ivanov",
                    firstName: "Ivan",
                    state: "male"
                }
            }
        }
    })
}

seed();