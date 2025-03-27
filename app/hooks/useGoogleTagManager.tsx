import { useEffect } from "react";

const useGoogleTagManager = () => {
  useEffect(() => {
    // Load Google Tag Manager script dynamically
    const gtmScript = document.createElement("script");
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-WK5TTRZD');
    `;
    document.head.appendChild(gtmScript);

    // Load Google Analytics (gtag.js) script dynamically
    const analyticsScript = document.createElement("script");
    analyticsScript.async = true;
    analyticsScript.src = "https://www.googletagmanager.com/gtag/js?id=AW-16913596225";
    document.head.appendChild(analyticsScript);

    // Initialize Google Analytics (gtag)
    const gtagScript = document.createElement("script");
    gtagScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-16913596225');
    `;
    document.head.appendChild(gtagScript);

    // Google Ads Conversion Tracking
    const conversionScript = document.createElement("script");
    conversionScript.innerHTML = `
       gtag('event', 'conversion', {
         'send_to': 'AW-16913596225/Ie7GCKavoacaEMH-g4E_',
         'value': 1.0,
         'currency': 'PKR'
       });
    `;
    document.head.appendChild(conversionScript);
  }, []);
};

export default useGoogleTagManager;
