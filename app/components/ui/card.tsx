import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "overflow-hidden transition-all border rounded-lg hover:shadow-md hover:-translate-y-1",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
        filled:
          "bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800",
        outline:
          "bg-transparent dark:bg-transparent border-gray-200 dark:border-gray-700",
      },
      size: {
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const titleVariants = cva(
  "font-semibold text-gray-900 dark:text-white mb-3 block hover:text-blue-600 dark:hover:text-blue-400",
  {
    variants: {
      size: {
        sm: "text-base",
        md: "text-xl",
        lg: "text-2xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface CardProps extends VariantProps<typeof cardVariants> {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags?: string[];
  className?: string;
  href?: string;
}

export const BlogCard = ({
  title,
  excerpt,
  author,
  date,
  tags = [],
  variant,
  size,
  className,
  href = "#",
}: CardProps) => {
  return (
    <div className={cardVariants({ variant, size, className })}>
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span>{author}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
        <a href={href} className={titleVariants({ size })}>
          {title}
        </a>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {excerpt}
        </p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs py-1 px-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
