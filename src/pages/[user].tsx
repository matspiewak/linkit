import { NextPage } from 'next/types';
import { GetStaticProps, GetStaticPaths } from 'next';

const User: NextPage = () => {
    return <div>yo</div>;
};
//! export types to keep them in one place and reference them! Also, https://github.com/vercel/examples/blob/main/solutions/reuse-responses/pages/%5Bid%5D.tsx
export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch('http://localhost:3000/api/userPaths');
    const users = await res.json();

    const paths = users.map((user: { username: string }) => ({
        params: { user: user.username },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: { post: { id: 1 } },
    };
};

export default User;
