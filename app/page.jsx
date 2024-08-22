import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col font-Titillium Web'>
    <h1 className='black_gradient head_text text-center'>
      Discover & Share
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> Your Amazing ideas</span>
    </h1>
    <p className='desc text-center'>
      Mind Memoir : Explore, create, and share creative prompts with a vibrant community.

    </p>

    <Feed />
  </section>
);

export default Home;
