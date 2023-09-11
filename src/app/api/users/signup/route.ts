import connect from '@/app/dbconfig/dbconfig'
import User from '@/app/models/userModel'

import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

export default async (req: NextRequest ) => {

    try {
        //send email and password and username to the server
        const reqBody = await req.json()
        const {username , email , password} = reqBody

        console.log(reqBody)

        //if user exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: 'user already exists'} , {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashPassword =await bcryptjs.hash(password , salt)
        
        //create a new user
        const newUser = new User({
            username,
            email,
            password: hashPassword
        })

        const saveUser = newUser.save() 
        console.log(saveUser)


        
    } catch (error : any) {
        NextResponse.json({error: error.message}, {status: 500})
    }

}