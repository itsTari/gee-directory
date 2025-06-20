import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";

export default  async function Home({searchParams}:{searchParams: Promise<{query?: string}>}) {
      const query = (await searchParams).query

      // dummy post
      const posts = [
        {
          _createdAt: new Date(),
          views:55,
          author:{_id:1, name: 'Glory Samuel'},
          _id:1,
          description:'This is a description',
          image:'https://t3.ftcdn.net/jpg/09/84/48/08/240_F_984480896_M8qTvRmYP94cVsgMZY9zx0pXolTqN0Ok.jpg',
          category:'Robots',
          title:'We Robots'
        }
      ]
  return (
    <>
      <section className="w-full bg-[#EE2B69] min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6;">
        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5;">Pitch Your Startup, <br/> Connect With Enterpreneurs</h1>
        <p className="font-medium text-[20px] text-white max-w-3xl text-center break-words"> Submit ideas, vote on pitches and get noticed in virtual competitions</p>
        <SearchForm  query={query}/>
      </section>
      <section className="px-6 py-10 max-w-7xl mx-auto;">
          <p className="font-semibold text-[30px] text-black">{query ? `Search Results For "${query}"` : 'All Startups'}</p>
        <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5">
            {posts.length > 0 ? (
              posts.map((post: startupCardTypes, id: number)=>(
              <StartupCard key={post?._id} post={post}/>
            ))):(<p className="text-black-100 text-sm font-normal">No Startups Found</p>)
            }
        </ul>
      </section>
    </>
  );
}
