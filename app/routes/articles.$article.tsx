import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import matter from "gray-matter";
import fs from "fs/promises";
import path from "path";
import { ArticleHeader } from "~/components/ArticleHeader";
import { ArticleContent } from "~/components/ArticleContent";
import type { Frontmatter } from "~/types/article";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      { title: "Artículo no encontrado – replied.dev" },
      { description: "El artículo que buscas no existe." }
    ];
  }

  const title = `${data.frontmatter.title} – replied.dev`;
  return [
    { title },
    { description: data.frontmatter.excerpt },
    { property: "og:title", content: title },
    { property: "og:description", content: data.frontmatter.excerpt },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: data.frontmatter.excerpt }
  ];
}

function inferTags(content: string): string[] {
  const commonTechTerms = ['react', 'javascript', 'typescript', 'node', 'frontend', 'backend', 'api'];
  const contentWords = content.toLowerCase().split(/\W+/);
  return commonTechTerms.filter(term => contentWords.includes(term));
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { article } = params;
  const articlesPath = path.join(process.cwd(), "app/articles");
  const filePath = path.join(articlesPath, `${article}.md`);

  try {
    const file = await fs.readFile(filePath, "utf-8");
    const { data: frontmatter, content } = matter(file);
    const html = marked(content);

    if (!frontmatter.tags) {
      frontmatter.tags = inferTags(content);
    }

    return Response.json({
      frontmatter: frontmatter as Frontmatter,
      html
    });
  } catch (error) {
    throw new Response("Article not found", { status: 404 });
  }
}

export default function Article() {
  const { frontmatter, html } = useLoaderData<typeof loader>();

  return (
    <article className="w-full mx-auto max-w-4xl px-6">
      <ArticleHeader frontmatter={frontmatter} />
      <ArticleContent html={html} />
    </article>
  );
}
