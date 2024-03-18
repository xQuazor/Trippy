import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/server/db/firebase";

export async function POST(request: Request, context: { params: any }) {
  const registration_form = context.params.body;// '1'
}