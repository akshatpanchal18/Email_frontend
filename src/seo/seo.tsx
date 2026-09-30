import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;

  /**
   * Defaults to "index, follow"
   */
  robots?: string;

  /**
   * Open Graph
   */
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article";

  /**
   * Twitter
   */
  twitterCard?: "summary" | "summary_large_image";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;

  /**
   * Optional structured data
   */
  structuredData?: Record<string, unknown>;

  /**
   * Optional language
   */
  locale?: string;
}

const SEO = ({
  title,
  description,
  canonical,
  robots = "index, follow",

  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",

  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,

  structuredData,
  locale = "en_US",
}: SEOProps) => {
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>

      {description && <meta name="description" content={description} />}

      <meta name="robots" content={robots} />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle ?? title} />

      {(ogDescription ?? description) ? <meta property="og:description" content={ogDescription ?? description} /> : null}

      <meta property="og:type" content={ogType} />

      {canonical && <meta property="og:url" content={canonical} />}

      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta property="og:locale" content={locale} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />

      <meta name="twitter:title" content={twitterTitle ?? ogTitle ?? title} />

      {(twitterDescription ?? ogDescription ?? description) && <meta name="twitter:description" content={twitterDescription ?? ogDescription ?? description} />}

      {(twitterImage ?? ogImage) ? <meta name="twitter:image" content={twitterImage ?? ogImage} /> : null}

      {/* Structured Data */}
      {structuredData && <script type="application/ld+json">{JSON.stringify(structuredData)}</script>}
    </Helmet>
  );
};

export default SEO;
