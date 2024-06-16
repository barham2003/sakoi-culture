import { getAllQuotesID } from "@/actions/quote-actions";
import { MetadataRoute } from "next";
const BASE_URL = "https://www.sakoi-culture.com";

export default async function sitemap({
    id,
}: {
    id: number;
}): Promise<MetadataRoute.Sitemap> {
    const quotesId = await getAllQuotesID();
    const quoteRoutes = quotesId.map(() => ({
        url: `${BASE_URL}/product/${id}`,
    }));

    return [
        {
            url: `${BASE_URL}`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/poetry/list`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/quote/list`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.5,
        },
        ...quoteRoutes,
    ];
}
