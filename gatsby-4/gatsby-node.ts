import { ShopstoryClient } from "@shopstory/core/client";
import type { CreatePagesArgs, CreateWebpackConfigArgs } from "gatsby";
import path from "path";
import { shopstoryConfig } from "../shared/shopstory/config";

export async function createPages({
  actions: { createPage, createRedirect },
  graphql,
}: CreatePagesArgs) {
  const shopstoryContentQueryResult = await graphql<{
    shopstoryContent: Queries.ContentfulShopstoryBlockConnection;
  }>(`
    {
      shopstoryContent: allContentfulShopstoryBlock {
        edges {
          node {
            id
            content {
              internal {
                content
              }
            }
            contentful_id
          }
        }
      }
    }
  `);

  if (!shopstoryContentQueryResult.data) {
    return;
  }

  const shopstoryClient = new ShopstoryClient(shopstoryConfig, {
    locale: "en-US",
    contentful: {
      preview: true,
    },
  });

  for (const shopstoryContentEdge of shopstoryContentQueryResult.data
    .shopstoryContent.edges) {
    const shopstoryContent =
      shopstoryContentEdge.node.content?.internal.content;

    if (shopstoryContent) {
      try {
        const content = shopstoryClient.add(JSON.parse(shopstoryContent));
        const meta = await shopstoryClient.fetch();

        createPage({
          component: path.resolve(
            "./src/templates/ShopstoryBlockPageTemplate.tsx"
          ),
          path: `/shopstory-block/${shopstoryContentEdge.node.contentful_id}`,
          context: {
            content,
            meta,
          },
        });
      } catch {
        if (process.env.NODE_ENV === "production") {
          createRedirect({
            fromPath: `/shopstory-block/${shopstoryContentEdge.node.contentful_id}`,
            toPath: "/404",
          });
        }

        console.error(
          `Creating page for ShopstoryBlock entry with id ${shopstoryContentEdge.node.contentful_id} failed`
        );
      }
    }
  }
}

export function onCreateWebpackConfig({ actions }: CreateWebpackConfigArgs) {
  actions.setWebpackConfig({
    resolve: {
      modules: ["node_modules", path.resolve(__dirname, "../shared")],
    },
  });
}
