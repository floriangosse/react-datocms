import React from "react";
import "./App.css";
import { useQuery } from "graphql-hooks";
import { Helmet } from "react-helmet";
import {
  Image,
  renderMetaTags,
  renderMetaTagsToString,
  StructuredText,
} from "react-datocms";
import { query } from "./query";

const App = () => {
  const { loading, error, data } = useQuery(query, {
    variables: { first: 10 },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something bad happened</div>;

  const metaTags = data.page.seo.concat(data.site.favicon);

  return (
    <div>
      <Helmet>{renderMetaTags(metaTags)}</Helmet>
      <pre className="seo-inspect">
        Look at all these juicy meta tags! ↴
        <br />
        <br />
        {renderMetaTagsToString(metaTags)}
      </pre>
      <div className="app">
        <div className="app-title">DatoCMS Blog</div>
        <div className="app-subtitle">
          News, tips, highlights, and other updates from the team at DatoCMS.
        </div>
        {data.blogPosts.map((blogPost) => (
          <article key={blogPost.id} className="blogPost">
            <Image
              className="blogPost-image"
              fadeInDuration={1000}
              data={blogPost.coverImage.responsiveImage}
            />
            <h6 className="blogPost-title">
              <a
                href={`https://www.datocms.com/blog/${blogPost.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {blogPost.title}
              </a>
            </h6>
            <div className="blogPost-excerpt">
              <StructuredText data={blogPost.excerpt} />
            </div>

            <footer className="blogPost-author">
              <Image
                className="blogPost-author-image"
                data={blogPost.author.avatar.responsiveImage}
              />
              Written by {blogPost.author.name}
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
};

export default App;
