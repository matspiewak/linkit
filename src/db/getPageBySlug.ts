import { prisma } from './client';

const getPageBySlug = async (slug: string) => {
    const page = await prisma.page.findFirst({
        where: {
            slug: slug,
        },
        select: {
            id: true,
            slug: true,
            Link: {
                select: {
                    id: true,
                    text: true,
                    url: true,
                    icon: true,
                    order: true,
                },
            },
            Profile: {
                select: {
                    id: true,
                    title: true,
                    bio: true,
                    image: true,
                },
            },
            Style: {
                select: {
                    id: true,
                    background_color: true,
                    effect: true,
                },
            },
            LinkStyle: {
                select: {
                    id: true,
                    background_color: true,
                    border: true,
                    radius: true,
                    shadow: true,
                    font_color: true,
                    font_size: true,
                    font_weight: true,
                    font_family: true,
                    font_style: true,
                },
            },
        },
    });

    return page;
};

export default getPageBySlug;
