import { prisma } from './client';

const getLinksByPageId = async (pageId: string) => {
    const links = await prisma.link.findMany({
        where: {
            page_id: pageId,
        },
        select: {
            id: true,
            text: true,
            url: true,
            icon: true,
            order: true,
        },
    });

    return links;
};

export default getLinksByPageId;
