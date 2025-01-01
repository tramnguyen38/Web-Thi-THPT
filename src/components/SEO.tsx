import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = 'ExamPro - Nền tảng học tập chuyên nghiệp',
  description = 'Nâng cao kỹ năng của bạn với các khóa học tương tác và kỳ thi chứng chỉ chuyên nghiệp của chúng tôi',
  keywords = 'học trực tuyến, khóa học, kỳ thi, giáo dục, học trực tuyến',
  image = '/og-image.jpg',
  url = window.location.href,
}: SEOProps) {
  const siteTitle = title.includes('ExamPro') ? title : `${title} | ExamPro`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}