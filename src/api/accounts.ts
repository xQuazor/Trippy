"use server"

import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/server/db/firebase";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        // Process a POST request
        const data = req.body
        console.log(data);
        return res.status(200)
    } else {
        // Handle any other HTTP method
        return res.status(400)
    }
}

// function createAcccount (email, password) {
//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed up
//             const user = userCredential.user;
//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // ..
//         });
// }