import { prisma } from './client';

const patchLinkOrder = async (id: string, oldIndex: number, newIndex: number) => {
	await prisma.$transaction([
		oldIndex > newIndex
			? prisma.link.updateMany({
					where: {
						AND: [
							{
								order: {
									gte: newIndex,
								},
							},
							{
								order: {
									lt: oldIndex,
								},
							},
						],
					},
					data: { order: { increment: 1 } },
			  })
			: prisma.link.updateMany({
					where: {
						AND: [
							{
								order: {
									gt: oldIndex,
								},
							},
							{
								order: {
									lte: newIndex,
								},
							},
						],
					},
					data: { order: { decrement: 1 } },
			  }),

		prisma.link.update({ where: { id: id }, data: { order: newIndex } }),
	]);
};

export default patchLinkOrder;
