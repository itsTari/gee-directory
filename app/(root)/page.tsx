import StartupCard, { startupTypeCard }  from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { PLAYLIST_BY_SLUG_QUERY, STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";

export default  async function Home({searchParams}:{searchParams: Promise<{query?: string}>}) {
      const query = (await searchParams).query
      // search input field
      const params = {search: query || null}
      // extracting a session from the home page 
      const session = await auth()
      // console.log(session?.id)

      // fetching post
      // const posts = await client.fetch(STARTUPS_QUERY);
      // const {data: posts} = await sanityFetch({query :STARTUPS_QUERY, params}) 
      // for the category fetch, to get startups by catgory
      // const {select: editorPosts} = await client.fetch( PLAYLIST_BY_SLUG_QUERY, {slug:'editor-picks'})
    // handling multiple request using parallel request
    const [{data: posts},  {select: editorPosts} ] = await Promise.all([
      sanityFetch({query :STARTUPS_QUERY, params}),
      client.fetch( PLAYLIST_BY_SLUG_QUERY, {slug:'editor-picks'})
    ])
      
      
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

      {editorPosts?.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <p className="text-30-semibold">Editors picks</p>
          <ul className="mt-10 mx-2 grid sm:grid-cols-2 gap-5">
            {editorPosts.map((post : startupTypeCard, id:number)=>
              <StartupCard post={post} key={id}/>
            )}
          </ul>
        </div>
      )}

      <SanityLive/>
    </>
  );
}
