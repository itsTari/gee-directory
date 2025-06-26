import StartupCard, { startupTypeCard }  from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default  async function Home({searchParams}:{searchParams: Promise<{query?: string}>}) {
      const query = (await searchParams).query
      // search input field
      const params = {search: query || null}

      // extracting a session from the home page 
      const session = await auth()
      // if (!session) {
      // // Handle unauthenticated state
      // return <div>Please sign in</div>
      // }
      console.log(session?.id)

      // fetching post
      // const posts = await client.fetch(STARTUPS_QUERY);
      const {data: posts} = await sanityFetch({query :STARTUPS_QUERY, params})
      // console.log(JSON.stringify(posts, null, 2))
      
      
  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading">Pitch Your Startup, <br/> Connect With Enterpreneurs</h1>
        <p className="sub-heading"> Submit ideas, vote on pitches and get noticed in virtual competitions</p>
        <SearchForm  query={query}/>
      </section>
      <section className="section_container">
          <p className="text-30-semibold">{query ? `Search Results For "${query}"` : 'All Startups'}</p>
        <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5">
            {posts.length > 0 ? (
              posts.map((post:  startupTypeCard , id: number)=>(
              <StartupCard key={post?._id} post={post}/>
            ))):(<p className="text-black-100 text-sm font-normal">No Startups Found</p>)
            }
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
