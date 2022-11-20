import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Plans from '../components/Plans'
import Row from '../components/Row'
import Modal from '../components/Modal'
import requests from '../utils/request'
import { Movie } from '../typings'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import payments from '../lib/stripe'
import Script from 'next/script'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
  products: Product[]
}
const Home = (
  {
    netflixOriginals,
    actionMovies,
    comedyMovies,
    documentaries,
    horrorMovies,
    romanceMovies,
    topRated,
    trendingNow,
    products
  }: Props
) => {
  console.log(products, 'products');
  const { logout, loading, user } = useAuth()
  const subscription = useSubscription(user)
  const showModal = useRecoilValue(modalState)
  if (loading || subscription === null) return null
  if (!subscription) return <Plans products={products} />

  return (
    <div className={`relative h-screen bg-gradient-to-b from-gray-900/10
     to-[#010511] lg:h-[140vh] 
     ${showModal && '!h-screen overflow-hidden'}`}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <!-- Google tag (gtag.js) --> */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-PCVJRW9EWR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GA_MEASUREMENT_ID');
        `}
        </Script>
      </Head>

      <Header />

      <main className="relative  pb-24 lg:space-y-24  ">

        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24  ">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List */}
          {/* {list.length > 0 && <Row title="My List" movies={list} />} */}

          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  )
}

export default Home


export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true
  }).then((res) => res).catch((error) => console.log('error', error.message))
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,

  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products
    },
  }
}
