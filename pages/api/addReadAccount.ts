import { prisma, apiHandler } from '../../utils.server'

export default apiHandler().get(async (req, res) => {
  const id = req.query.id

  // const articleList = await prisma.article.update({
  //   where: {
  //     id: Number(id)
  //   },
  //   data: {
  //     readAccount: 1
  //   }
  // })
  res.json({})
})
