// LIB TYPES
import type { GetServerSidePropsContext } from 'next';
// TYPES
import type { GSSP } from 'src/interfaces';
// FUNCTIONS
import { getUserFromAuthToken, getUser } from 'src/firebase/admin/utils/user';
// COMPONENTS
import { ViewSetter } from 'src/components/setters';

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
    try {
        if (!req.cookies.authToken) throw 'authToken is missing';
        const { uid } = await getUserFromAuthToken(req.cookies.authToken);
        const user = await getUser(uid);
        return {
            props: {
                result: {
                    error: null,
                    body: { user },
                },
            },
        };
    } catch (error: any) {
        const message = typeof error === 'object' ? error.message : error;
        return {
            props: {
                result: {
                    error: message,
                    body: null,
                },
            },
        };
    }
}

export default function Home({ result }: GSSP) {
    return (
        <ViewSetter
            {...{
                gssp: result,
                pageBase: 'home',
                isPageUsingSidebar: false,
            }}
        >
            <div>Home</div>
        </ViewSetter>
    );
}