import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/navbar';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>My Music Gigs</title>
      </Head>
      <Navbar></Navbar>
      <div className="m-2 h-96 w-96 bg-black text-white">Home Box</div>
      <div></div>
    </div>
  );
};

export default Home;
