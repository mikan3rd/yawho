import React from "react";

import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="google-site-verification" content="lhrIBgvKmE5lXsXKci8nY3wNNFe4PjfaLY6aZF7UjUM" />
          <script
            data-ad-client="ca-pub-2915249860974702"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-54DGPF3');`,
            }}
          />
          {/* End Google Tag Manager */}

          {/* Global site tag (gtag.js) */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-800237180" />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-800237180');`,
            }}
          />

          {/* Event snippet for Website traffic conversion page */}
          <script
            dangerouslySetInnerHTML={{
              __html: `gtag('event', 'conversion', {'send_to': 'AW-800237180/YKAgCLvc4qUCEPzMyv0C'});`,
            }}
          />
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-54DGPF3"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          {/* End Google Tag Manager (noscript) */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
