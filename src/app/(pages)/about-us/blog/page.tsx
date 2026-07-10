import { BlogHeroSection, LatestArticlesSection } from "@/components/blog"
import { Pagination } from "@/components/ui"

const Blog = ()=>{
    return(
        <>
         <BlogHeroSection/>
         <LatestArticlesSection/>
         <Pagination/>
        </>
    )
}

export default Blog