if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,c)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(i[a])return;let o={};const t=e=>n(e,a),r={module:{uri:a},exports:o,require:t};i[a]=Promise.all(s.map((e=>r[e]||t(e)))).then((e=>(c(...e),o)))}}define(["./workbox-22673765"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/RjRinePIF-5wYAiBd6Lfo/_buildManifest.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/RjRinePIF-5wYAiBd6Lfo/_middlewareManifest.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/RjRinePIF-5wYAiBd6Lfo/_ssgManifest.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/1-12b2fdf12fcb926d.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/204-74cb6e442e61e230.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/29107295-2c3ce868677a27a4.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/299-9fc2fe5494eeae6a.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/508-570c2014858a1e90.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/724-62ce9b74cad39023.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/745-47b273f47423675b.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/74fdba35-3f0deebf9a7b695e.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/753-f28e0734d262f5f8.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/78e521c3-4c0e7b93edfbe84e.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/920-3470cdedaf091c3e.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/a908dc70-9fbfa84c7cb4e85d.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/c9184924-853d3fb4f532e4c8.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/framework-686549ad788ffa49.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/main-dd50fd4df4cf64e6.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/404-5a0169704353c7ac.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/_app-32fb9dbb21d9d3fc.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/_error-a3f18418a2205cb8.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/companies-52ff4f8c159ad92a.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/crew/%5Bid%5D-4b4fb62f8f8f2a78.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/daily-report/%5Bid%5D-bf44875bec04e2d0.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/daily-report/%5Bid%5D/pdf-266e949160211a6d.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/daily-reports-afea303b2a071581.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/employee/%5Bid%5D-1c39576609cbe272.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/index-07f9ab3cae053d2c.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/jobsite/%5Bid%5D-d8c889cc0f2782cb.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/login-3ea123561a4a2cd0.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/me-a736fbea14b01217.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/password-reset/%5Btoken%5D-71f993f6fcd6abfb.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/reports-8982fba9ce22867f.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/search-34fe06d8e64b1c8e.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/settings-d83b096fdcb9893a.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/signup-c725427062696b93.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/pages/vehicle/%5Bid%5D-e1e45c47fc344e9b.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/_next/static/chunks/webpack-fec8acd75be94c2e.js",revision:"RjRinePIF-5wYAiBd6Lfo"},{url:"/browserconfig.xml",revision:"653d077300a12f09a69caeea7a8947f8"},{url:"/favicon.ico",revision:"e45b8d0032fc02d2c3402e83987f3883"},{url:"/icons/android-icon-144x144.png",revision:"3b098c3ed2f2ffe6f4d0defb3839f8e0"},{url:"/icons/android-icon-192x192.png",revision:"ab13a04b767c861be078193e9385e7e8"},{url:"/icons/android-icon-36x36.png",revision:"1b35e985276a5cab248e1a70cd359857"},{url:"/icons/android-icon-48x48.png",revision:"322abcfaca44a3e4f5bce301dac2f6c4"},{url:"/icons/android-icon-72x72.png",revision:"b8c713f4014011779001ba50641d8611"},{url:"/icons/android-icon-96x96.png",revision:"9d438e9146db7299f9362353d58005d5"},{url:"/icons/apple-icon-114x114.png",revision:"d08e733d009b5bb6fdac99d60ec46672"},{url:"/icons/apple-icon-120x120.png",revision:"1152f4e2aa71ecd603d77bc45de8acd7"},{url:"/icons/apple-icon-144x144.png",revision:"76bad600d6e6927ae33f4179dd68d8ba"},{url:"/icons/apple-icon-152x152.png",revision:"d69ffde5069ad0a1877cedea94f1e0f8"},{url:"/icons/apple-icon-180x180.png",revision:"a421a98ffa8eff64f21e966991ff7919"},{url:"/icons/apple-icon-57x57.png",revision:"12b04d983d4394b202cea58231e144e4"},{url:"/icons/apple-icon-60x60.png",revision:"7ced725c8922a8f9d6c88184221951bc"},{url:"/icons/apple-icon-72x72.png",revision:"4ef448bcdb9f24b6bbeba40eb20bcc77"},{url:"/icons/apple-icon-76x76.png",revision:"67fb586ce1b2f24b80c53e059daeedd5"},{url:"/icons/apple-icon-precomposed.png",revision:"a71307a88483a401cdce19dd6d00faf6"},{url:"/icons/apple-icon.png",revision:"a71307a88483a401cdce19dd6d00faf6"},{url:"/icons/favicon-16x16.png",revision:"1079c2917c1843d995824213a6123783"},{url:"/icons/favicon-32x32.png",revision:"28aeaf4677fe2940afc528d572319086"},{url:"/icons/favicon-96x96.png",revision:"6ee9dc5844876a3523c07c13fde62929"},{url:"/icons/list.png",revision:"d1b794925d335307ed269851dffddb2c"},{url:"/icons/ms-icon-144x144 - Copy.png",revision:"76bad600d6e6927ae33f4179dd68d8ba"},{url:"/icons/ms-icon-150x150 - Copy.png",revision:"7973bf5b9ec8f5c35844e08dfea0c85d"},{url:"/icons/ms-icon-310x310 - Copy.png",revision:"5d0266ab7d1af7be183a735a79232018"},{url:"/icons/ms-icon-70x70 - Copy.png",revision:"f1f9a87363114f8fa09178f0f222739b"},{url:"/icons/ms-icon-70x70.png",revision:"f1f9a87363114f8fa09178f0f222739b"},{url:"/images/logo.png",revision:"2a1fc3e8fec994ee7b1df723bb236abd"},{url:"/manifest-concrete.json",revision:"0cce39f2c474cee23aa9077b6b66ef94"},{url:"/manifest-paving.json",revision:"f28990af5e4899add091b31ce0be5dba"},{url:"/manifest.json",revision:"6dbe6f1412db9a32ee2c215525c0e5e5"},{url:"/robots.txt",revision:"6bc8db4824978cc452f0358adc6c63a9"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:n,state:s})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
