import fs from 'fs'
import path from 'path'
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';


const root = process.cwd()

export const getFiles = () => fs.readdirSync(path.join(root,'data'))
 

export const getFileBySlug = async (slug) => {
    const mdxSource = fs.readFileSync(path.join(root, 'data',`${slug}.mdx`), 'utf8')
    

    const {data, content} =  await matter(mdxSource)
    

    const source = await serialize(content,{})
    console.log(source)
    return {
        source,
        frontMatter: {
            slug,
            ...data
        }
    }
}


export const getAllFilesMetadata = () => {
    const files = getFiles()
    return files.reduce( (allpost, postSlug) => {
        const mdxSource = fs.readFileSync(path.join(root, 'data' , postSlug), 'utf8')
        // console.log(allpost)
        const {data} = matter(mdxSource)
         return [{ ...data, slug:postSlug.replace('.mdx','')}, ...allpost]
    }, [ ])

}