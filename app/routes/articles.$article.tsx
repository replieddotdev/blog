import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import matter from "gray-matter";
import fs from "fs/promises";
import path from "path";

export async function loader({ params }: LoaderFunctionArgs) {
  const { article } = params;
  const articlesPath = path.join(process.cwd(), "app/articles");
  const filePath = path.join(articlesPath, `${article}.md`);

  try {
    const file = await fs.readFile(filePath, "utf-8");
    const { data: frontmatter, content } = matter(file);
    const html = marked(content);

    return {
      frontmatter,
      html
    };
  } catch (error) {
    throw new Response("Article not found", { status: 404 });
  }
}

export default function Article() {
  const { frontmatter, html } = useLoaderData<typeof loader>();

  return (
    <article>
      <header>
        <h1>{frontmatter.title}</h1>
        <p>Por {frontmatter.writer}</p>
        <time>Creado: {new Date(frontmatter.created).toLocaleDateString()}</time>
        {frontmatter.updated && (
          <time>Actualizado: {new Date(frontmatter.updated).toLocaleDateString()}</time>
        )}
      </header>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
