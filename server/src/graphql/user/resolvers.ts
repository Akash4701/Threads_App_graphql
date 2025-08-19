import { prisma } from "../../lib/db";

const queries={};

const mutations={
    CreateUser:async(_,{firstName,LastName,password,email}:{firstName:string,LastName:string,password:string,email:string})=>{
     await prisma.user.create({
        data:{
            firstName,
            LastName,
            password,
            email,
            salt:"fjbjhebf"



        }
     })

    }
};


export const resolvers={queries,mutations};