export interface Link {
    id: string;
    position: number;
    text: string;
    url: string;
    icon: string;
}

export interface Body {
    style: {
        backgroundColor: string;
        effect: Effect;
    };
    linkStyle: {
        borderRadius: number;
        border: Border;
        backgroundColor: string;
        shadow: Shadow;
        font: {
            family: null | string;
            size: null | number;
            color: null | string;
            bold: number;
        };
    };
}

export interface User {
    id: string;
    title: string;
    profilePicture: string;
    bio: string | null;
}

export interface UserData {
    id: string;
    content: {
        body: Body;
        user: User;
        links: Array<Link>;
    };
}

export interface UserProps {
    page: UserData;
}

type Effect = null | 'synthwave';
type Border = null | '2px black solid';
type Shadow = null | 'box-shadow: 30px 28px 0px -13px rgba(66, 68, 90, 1)';
