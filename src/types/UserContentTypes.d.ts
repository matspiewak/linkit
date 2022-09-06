export type Link = Prisma.LinkGetPayload<{ select: { icon: true, order: true, text: true, url: true, id: true } }>
export type LinkStyle = Prisma.LinkStyleGetPayload<{
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
    }
}>
