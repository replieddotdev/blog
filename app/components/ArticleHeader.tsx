import type { Frontmatter } from "~/types/article";

interface ArticleHeaderProps {
  frontmatter: Frontmatter;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('es', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function ArticleHeader({ frontmatter }: ArticleHeaderProps) {
  const createdDate = formatDate(frontmatter.created);
  const updatedDate = frontmatter.updated ? formatDate(frontmatter.updated) : null;

  return (
    <header className="py-16 border-b border-gray-100 dark:border-gray-800 mb-12">
      {frontmatter.category && (
        <span className="font-mono text-sm text-blue-600 dark:text-blue-400 mb-4 inline-block">
          {frontmatter.category}
        </span>
      )}

      <h1 className="text-4xl font-semibold leading-tight tracking-tight mb-6 text-gray-900 dark:text-gray-50">
        {frontmatter.title}
      </h1>

      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 flex-wrap mb-6">
        <AuthorLink writer={frontmatter.writer} />
        <Divider />
        <time dateTime={frontmatter.created}>{createdDate}</time>
        {updatedDate && updatedDate !== createdDate && (
          <>
            <Divider />
            <span className="text-xs">Actualizado: {updatedDate}</span>
          </>
        )}
      </div>

      {frontmatter.tags && frontmatter.tags.length > 0 && <TagsList tags={frontmatter.tags} />}
    </header>
  );
}

function AuthorLink({ writer }: { writer: string }) {
  return (
    <a
      href={`/writers/${writer.toLowerCase().replace(/\s+/g, '-')}`}
      className="font-medium text-gray-900 dark:text-gray-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
    >
      {writer}
    </a>
  );
}

function Divider() {
  return <span className="text-gray-300 dark:text-gray-700">•</span>;
}

function TagsList({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map(tag => (
        <a
          key={tag}
          href={`/tags/${tag.toLowerCase()}`}
          className="font-mono text-xs px-2 py-1 bg-gray-50 dark:bg-gray-800
                   text-gray-600 dark:text-gray-400 rounded
                   hover:bg-blue-50 dark:hover:bg-blue-900/30
                   hover:text-blue-600 dark:hover:text-blue-400
                   transition-colors"
        >
          {tag}
        </a>
      ))}
    </div>
  );
}
