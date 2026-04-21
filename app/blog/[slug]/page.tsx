import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogHeader } from "../BlogHeader";
import styles from "../blog.module.css";
import { blogPostMap, blogPosts } from "../posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostMap.get(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | youtube2mp3.io`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostMap.get(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <BlogHeader />
        <article className={styles.articleShell}>
          <div>
            <Link className={styles.back} href="/blog">
              Back to Blog
            </Link>
            <span className={styles.meta}>{post.sourceFile}</span>
            <span className={styles.date} style={{ marginLeft: "0.75rem" }}>
              {post.createdAt}
            </span>
            <h1 className={styles.title} style={{ marginTop: "1rem" }}>
              {post.title}
            </h1>
            <p className={styles.lede}>{post.lede}</p>
          </div>

          <Image className={styles.heroImage} src={post.coverImage} alt={post.imageAlt} priority />

          <div className={styles.content}>
            {post.sections.map((section) => {
              if (section.type === "paragraphs") {
                return (
                  <section key={section.heading} className={styles.section}>
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                );
              }

              if (section.type === "list") {
                return (
                  <section key={section.heading} className={styles.section}>
                    <h2>{section.heading}</h2>
                    {section.intro ? <p>{section.intro}</p> : null}
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                );
              }

              if (section.type === "table") {
                return (
                  <section key={section.heading} className={styles.section}>
                    <h2>{section.heading}</h2>
                    {section.intro ? <p>{section.intro}</p> : null}
                    <div className={styles.tableWrap}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            {section.columns.map((column) => (
                              <th key={column}>{column}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.rows.map((row) => (
                            <tr key={row.join("|")}>
                              {row.map((cell) => (
                                <td key={cell}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                );
              }

              return (
                <section key={section.heading} className={styles.section}>
                  <h2>{section.heading}</h2>
                  <div className={styles.faqList}>
                    {section.items.map((item) => (
                      <div key={item.question} className={styles.faqItem}>
                        <h3>{item.question}</h3>
                        <p>{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

            <section className={styles.section}>
              <h2>Useful Links</h2>
              <p>
                If you want to try the main conversion workflow described in this guide, open{" "}
                <a className={styles.inlineLink} href="https://www.youtube2mp3.io/" target="_blank" rel="noopener noreferrer">
                  https://www.youtube2mp3.io/
                </a>{" "}
                and paste a public YouTube link directly into the converter.
              </p>
              {post.includeBgmgenLink ? (
                <p>
                  If you also need royalty-free music creation after downloading references or planning
                  audio ideas, you can explore{" "}
                  <a className={styles.inlineLink} href="https://bgmgen.com" target="_blank" rel="noopener noreferrer">
                    https://bgmgen.com
                  </a>{" "}
                  for AI music generation workflows.
                </p>
              ) : null}
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
