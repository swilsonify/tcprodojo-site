import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: 29614480-677f-4dd1-a969-a2e5ffdd191e
  token: 9fc63b6a4b245e22501e182dfdd1b0c7829f9296
, // Get this from tina.io
  
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
