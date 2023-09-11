import connect from '@/app/dbconfig/dbconfig';
import User from '@/app/models/userModel';

import { NextRequest , NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect()

export default async function POST(request : NextRequest){
    try{
        const reqBody = await request.json()
        const {email , password} = reqBody
        console.log(reqBody)

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: 'User not found'} , {status : 400})
        }
        console.log('uer exists')
        //check if password is correct
        const validPassword = await bcryptjs.compare(password , user.password)

        if(!validPassword){
            return NextResponse.json({error: 'Invalid Password'} , {status : 400})
        }
        console.log('user exists')

        //create token data
        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }

        //crete token
        const token = jwt.sign(tokenData , process.env.TOKEN_SECRET! , {expiresIn: 'id'})

        const response = NextResponse.json({
            message: 'login successful',
            success: true,
        })

        response.cookies.set('token' , token , {
            httpOnly : true,
        })
        return response;

    }catch(error : any){
        return NextResponse.json({error: error.message} , {status : 500});
    }
}