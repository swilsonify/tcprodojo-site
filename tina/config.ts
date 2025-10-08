import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io
  
  build: {
    outputFolder: "admin",
    publicFolder: "/",
  },
  
  media: {
    tina: {
      mediaRoot: "assets/images",
      publicFolder: "/",
    },
  },
  
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
