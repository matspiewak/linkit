import { unstable_getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse, NextPage } from 'next/types';
import { authOptions } from '../api/auth/[...nextauth]';
import { prisma } from '../../db/client';
import { IncomingMessage, ServerResponse } from 'http';
import { ChangeEvent, useState } from 'react';

const Admin = ({ session, page }: { session: any, page: any }) => {

        return (
            <div>
                <h2>{session.user.email}{"'s dashboard"}</h2>
                <h2>{page.content.user.title}</h2>
                <LinkCard />
            </div>
        );
};

interface IState {
    text: string,
    url: string
}

//! fetched sessions requires all cookies, so i have to find some function that requires it and check if i can make it STAHP
const LinkCard = () => {
    const [linkInputs, setLinkInputs] = useState<IState>({ text: "", url: "" })
    const [icon, setIcon] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [position, setPosition] = useState<number>(0);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        setLinkInputs({
            ...linkInputs,
            [name]: e.target.value
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor='text'>Link text</label>
                <input type='text' name='text' value={linkInputs.text} onChange={(e) => handleInputChange(e)} />
                <label htmlFor='url'>Link url</label>
                <input type='text' name='url' value={linkInputs.url} onChange={(e) => handleInputChange(e)} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export async function getServerSideProps(context: { req: (IncomingMessage & { cookies: Partial<{ [key: string]: string; }>; }) | NextApiRequest; res: ServerResponse | NextApiResponse<any>; }) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions) as any

    if (!session?.user) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const page = await prisma.page.findFirst({
        where: {
            user_id: session.user.id,
        },
        select: {
            id: true,
            content: true
        }
    })

    return {
        props: {
            session,
            page
        },
    }
}

export default Admin;
