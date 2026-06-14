import { scalekit } from '@/app/lib/scalekit'
import {NextRequest, NextResponse} from "next/server";
export async function GET(req:NextRequest) {
     const{searchParams}= new URL(req.url)
     const redirectUri=`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
     const code = searchParams.get("code");
     if(!code){
        return NextResponse.json({message:"Code Not Found"},{status:400})}
const session = await scalekit.authenticateWithCode(
  code,
  redirectUri
);
NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`)
    }