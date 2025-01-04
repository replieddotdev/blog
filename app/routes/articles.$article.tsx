import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import matter from "gray-matter";
import fs from "fs/promises";
import path from "path";

interface Frontmatter {
  title: string;
  writer: string;
  created: string;
  updated?: string;
  tags?: string[];
  category?: string;
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
      const commonTechTerms = ['react', 'javascript', 'typescript', 'node', 'frontend', 'backend', 'api'];
      const contentWords = content.toLowerCase().split(/\W+/);
      const inferredTags = commonTechTerms.filter(term => contentWords.includes(term));
      frontmatter.tags = inferredTags;
    }

    return json({
      frontmatter: frontmatter as Frontmatter,
      html
    });
  } catch (error) {
    throw new Response("Article not found", { status: 404 });
  }
}

export default function Article() {
  const { frontmatter, html } = useLoaderData<typeof loader>();

  const createdDate = new Date(frontmatter.created).toLocaleDateString('es', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const updatedDate = frontmatter.updated
    ? new Date(frontmatter.updated).toLocaleDateString('es', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
    : null;

  return (
    <article className="container mx-auto max-w-[768px] px-6">
      <header className="py-16 border-b border-gray-100 dark:border-gray-800 mb-12">
        {/* Category - if available */}
        {frontmatter.category && (
          <span className="font-mono text-sm text-blue-600 dark:text-blue-400 mb-4 inline-block">
            {frontmatter.category}
          </span>
        )}

        {/* Title */}
        <h1 className="text-4xl font-semibold leading-tight tracking-tight mb-6
                     text-gray-900 dark:text-gray-50">
          {frontmatter.title}
        </h1>

        {/* Meta information */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 flex-wrap mb-6">
          <a
            href={`/writers/${frontmatter.writer.toLowerCase().replace(/\s+/g, '-')}`}
            className="font-medium text-gray-900 dark:text-gray-50
                     hover:text-blue-600 dark:hover:text-blue-400
                     transition-colors"
          >
            {frontmatter.writer}
          </a>
          <span className="text-gray-300 dark:text-gray-700">•</span>
          <time dateTime={frontmatter.created}>{createdDate}</time>
          {updatedDate && updatedDate !== createdDate && (
            <>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span className="text-xs">
                Actualizado: {updatedDate}
              </span>
            </>
          )}
        </div>

        {/* Tags */}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {frontmatter.tags.map(tag => (
              <a
                key={tag}
                href={`/tags/${tag.toLowerCase()}`}
                className="font-mono text-xs px-2 py-1
                         bg-gray-50 dark:bg-gray-800
                         text-gray-600 dark:text-gray-400
                         rounded
                         hover:bg-blue-50 dark:hover:bg-blue-900/30
                         hover:text-blue-600 dark:hover:text-blue-400
                         transition-colors"
              >
                {tag}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Article content */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none pb-16
                   prose-headings:font-semibold prose-headings:tracking-tight
                   prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6
                   prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4

                   prose-p:text-gray-600 dark:prose-p:text-gray-300
                   prose-p:leading-relaxed

                   prose-a:text-blue-600 dark:prose-a:text-blue-400
                   hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300

                   prose-pre:bg-gray-50 dark:prose-pre:bg-gray-800/50
                   prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700

                   prose-code:text-gray-800 dark:prose-code:text-gray-200
                   prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                   prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded

                   prose-pre:p-4 prose-pre:rounded-lg
                   prose-img:rounded-lg

                   prose-strong:text-gray-900 dark:prose-strong:text-white
                   prose-em:text-gray-800 dark:prose-em:text-gray-200

                   prose-ul:text-gray-600 dark:prose-ul:text-gray-300
                   prose-ol:text-gray-600 dark:prose-ol:text-gray-300

                   prose-li:text-gray-600 dark:prose-li:text-gray-300

                   prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
                   prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
