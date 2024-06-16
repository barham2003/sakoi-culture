import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://www.sakoi-culture.com",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: "https://www.sakoi-culture.com/about",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: "https://www.sakoi-culture.com/poetry/list",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.5,
        },
        {
            url: "https://www.sakoi-culture.com/quote/list",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.5,
        },
    ];
}
