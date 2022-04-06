import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
import axios from 'axios'
import MainLayout from '../layout/MainLayout'
import HomeArticleCard from '../components/homeArticleCard/HomeArticleCard'
import { getUserFromReq } from '../utils.server'
require('../styles/home.less')

export type ArticleType = {
  id: number
  userId: number
  title: string
  content: string
  createAt: string
  tag?: string
  readAccount: number
}

type PropsType = {
  user: {
    email: string
  }
  data?: ArticleType[]
}

const homePage = ({ data, user }: PropsType) => {
  return (
    <MainLayout page="home" userName={user.email}>
      <div className="content-container">
        {[{ id: 1, title: 'fjfjfj' }].map((item) => {
          return (
            <div key={item.id} style={{ marginBottom: '20px' }}>
              <HomeArticleCard title={item.title}></HomeArticleCard>
            </div>
          )
        })}
      </div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const user = await getUserFromReq(ctx.req)
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    }
  }

  const baseData: ArticleType[] = await axios.get('api/getArticleList')

  return {
    props: {
      user: {
        email: user?.email,
      },
      data: baseData,
    },
  }
}

export default homePage
