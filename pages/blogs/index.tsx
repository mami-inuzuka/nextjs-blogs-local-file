import { GetStaticProps } from "next";
import fs from 'fs';
import path from 'path';
import matter from "gray-matter";

type Post = {
  id: string;
  title: string;
  date: string;
}

type Props = {
  allPostsData: Post[];
}

const postsDirectory = path.join(process.cwd(), 'posts');

export const getStaticProps:GetStaticProps<Props> = async () => {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData= fileNames.map((fileName)=> {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
    }
  });

  return {
    props: {
      allPostsData
    }
  }
}

const Index = ({allPostsData}:Props) => {

  return (
    <div>
      <h1>Index</h1>
      <ul>
        {allPostsData.map(({id, title, date}) => (
          <li key={id}>{title} / {date}</li>
        ))}
      </ul>
    </div>
  )
}

export default Index;
