import { Prisma } from "@prisma/client"
import styled from "styled-components"
import { User } from '../types/UserContentTypes'

/* eslint-disable @next/next/no-img-element */
const UserContainer = ({ profile }: { profile: Prisma.ProfileGetPayload<{ select: { title: true, bio: true, image: true } }> }) => {
    return (
        <Container>
            <img alt="user profile picture" src={profile.image}
                style={{ width: '120px', height: '120px', objectFit: 'cover', objectPosition: 'top left', borderRadius: '50%' }}
            />
            <UserName>{profile.title}</UserName>
            <UserBio>{profile.bio}</UserBio>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;    
    gap: 0.3em;
`
const UserName = styled.h1`
    font-weight: bold;
    font-size: 1.25em;
    margin: 0;
`

const UserBio = styled.h2`
    font-weigt: 500;
    font-size: 1.05em;
    margin: 0;
`

export default UserContainer