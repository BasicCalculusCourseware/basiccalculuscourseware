// LIB TYPES
import type { NextApiResponse, NextApiRequest } from 'next';
// FUNCTIONS
import { getUser, getUserByEmail } from 'src/firebase/admin/utils/user';
import { getTeachers } from 'src/firebase/admin/utils/teacher';
import { getStudents } from 'src/firebase/admin/utils/student';
import { sign } from 'src/utils';
import verifyAcess from 'src/utils/verifyAccess';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = verifyAcess(req);
        if (data.action === 'getUser') {
            if (!data.uid) throw 'parameter is missing';
            const user = await getUser(data.uid);
            return res.json({
                responseToken: sign({
                    error: null,
                    body: { user },
                }),
            });
        } else if (data.action === 'getUserByEmail') {
            if (!data.email) throw 'parameter is missing';
            const user = await getUserByEmail(data.email);
            return res.json({
                responseToken: sign({
                    error: null,
                    body: { user },
                }),
            });
        } else if (data.action === 'getTeachers') {
            const teachers = await getTeachers();
            return res.json({
                responseToken: sign({
                    error: null,
                    body: { teachers },
                }),
            });
        } else if (data.action === 'getStudents') {
            const students = await getStudents();
            return res.json({
                responseToken: sign({
                    error: null,
                    body: { students },
                }),
            });
        } else throw new Error();
    } catch (error: any) {
        const message = typeof error === 'object' ? error.message : error;
        console.log('[api/users|error]:', message);
        const responseToken = sign({ error: message, body: null });
        res.json({ responseToken });
    }
}