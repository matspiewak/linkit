import { prisma } from './client';

const getLinkStyleByPageId = async (pageId: string) => {
    const linkStyle = await prisma.linkStyle.findFirst({
        where: {
            page_id: pageId,
        },
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
    });

    return linkStyle;
};

export default getLinkStyleByPageId;
