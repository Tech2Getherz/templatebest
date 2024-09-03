exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allContentfulBlog {
        nodes {
          title
          slug
          content {
            raw
          }
          author
          publishDate
          image {
            title
            url
          }
          introText {
            raw
          }
          imageOrigin {
            raw
          }
        }
      }
    }
  `);

  result.data.allContentfulBlog.nodes.forEach(blog => {
    createPage({
      path: `/blog/${blog.slug}`,
      component: require.resolve('./src/components/BlogPage.tsx'),
      context: {
        blog,
      },
    });
  });
};