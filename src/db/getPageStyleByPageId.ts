import { prisma } from './client';

const getPageStyle = async (pageId: string) => {
    const pageStyle = await prisma.style.findFirst({
        where: {
            page_id: pageId,
        },
        select: {
            id: true,
            background_color: true,
            effect: true,
        },
    });

    return pageStyle;
};

export default getPageStyle;
