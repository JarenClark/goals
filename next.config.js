/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/collections/:collectionId",
        headers: [
          {
            key: "x-collection",
            value: ":collectionId", // Matched parameters can be used in the value
          },
        ],
      },
      {
        source: "/collections/:collectionId/;itemId",
        headers: [
          {
            key: "x-collection",
            value: ":collectionId", // Matched parameters can be used in the value
          },
          {
            key: "x-item",
            value: ":itemId", // Matched parameters can be used in the value
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
