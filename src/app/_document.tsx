import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Cocktail Viewer</title>
        <meta name="description" content="Search and save your favorite cocktails" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
