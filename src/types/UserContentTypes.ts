export interface Button {
    id: string;
    position: number;
    text: string;
    url: string;
    icon: string;
    style: {
        inline: number;
        backgroundColor: string;
        font: {
            color: string;
            fontStyle: string;
        };
        shadow: string;
        border: {
            color: string;
            size: number;
        };
    };
}

export interface Page {
    id: string;
    user: string;
    bio: string;
    style: {
        backgroundColor: string;
        type: string;
    };
}

export interface UserData {
    profile_content: {
        page: Page;
        buttons: Array<Button>;
    };
}

export interface ProfileProps {
    profile: UserData;
}
