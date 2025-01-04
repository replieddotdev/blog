const markdownStyles = `
  prose prose-lg dark:prose-invert max-w-none pb-16
  prose-headings:font-semibold prose-headings:tracking-tight
  prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6
  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4

  prose-p:text-gray-600 dark:prose-p:text-gray-300
  prose-p:leading-relaxed

  prose-a:text-blue-600 dark:prose-a:text-blue-400
  hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300

  prose-pre:bg-gray-50 dark:prose-pre:bg-gray-800/50
  prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700
  prose-pre:p-4 prose-pre:rounded-lg

  prose-code:text-gray-800 dark:prose-code:text-gray-200
  prose-code:bg-gray-100 dark:prose-code:bg-gray-800
  prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded

  prose-img:rounded-lg

  prose-strong:text-gray-900 dark:prose-strong:text-white
  prose-em:text-gray-800 dark:prose-em:text-gray-200

  prose-ul:text-gray-600 dark:prose-ul:text-gray-300
  prose-ol:text-gray-600 dark:prose-ol:text-gray-300
  prose-li:text-gray-600 dark:prose-li:text-gray-300

  prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
  prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700
`;

interface ArticleContentProps {
  html: string;
}

export function ArticleContent({ html }: ArticleContentProps) {
  return (
    <div
      className={`markdown-content ${markdownStyles}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
