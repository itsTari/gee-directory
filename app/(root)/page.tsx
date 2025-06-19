import SearchForm from "../../components/SearchForm";

export default  async function Home({searchParams}:{searchParams: Promise<{query?: string}>}) {
      const query = (await searchParams).query
  return (
    <>
      <section className="w-full bg-[#EE2B69] min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6;">
        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5;">Pitch Your Startup, <br/> Connect With Enterpreneurs</h1>
        <p className="font-medium text-[20px] text-white max-w-3xl text-center break-words"> Submit ideas, vote on pitches and get noticed in virtual competitions</p>
        <SearchForm  query={query}/>
      </section>
    </>
  );
}
