/* Data and Application definitions for Smart TV Salon */

const CUSTOM_STORAGE_KEY = "titanos_custom_shortcut_v1";

    function loadCustomShortcut() {
      try {
        const raw = localStorage.getItem(CUSTOM_STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed.url !== "string") return null;
        const validated = new URL(parsed.url);
        if (validated.protocol !== "https:" && validated.protocol !== "http:") return null;
        return {
          name: (typeof parsed.name === "string" && parsed.name.trim()) ? parsed.name.trim().slice(0, 28) : validated.hostname,
          url: validated.href
        };
      } catch (e) {
        return null;
      }
    }

    const SECTIONS = [
      { title: "À l'affiche", isDock: true },
      { title: "Chaînes TV & Replay", isDock: false },
      { title: "Streaming, Sport & Musique", isDock: false },
      { title: "Télévision, Système & Web", isDock: false }
    ];

    const ICONS_SVG = {
      settings: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.77 1.02 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
      sources: `<svg viewBox="0 0 24 24"><path d="M4 7h16l-2 10H6L4 7z"/><path d="M8 11h8"/></svg>`,
      tv: `<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
      epg: `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
      web: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
    };

    const APPS = [
      // ROW 1 : À L'AFFICHE
      {
        id: "freetv",
        name: "Free TV",
        badge: "TV EN DIRECT & REPLAY",
        desc: "Avec Free TV, regardez plus de 170 chaînes et 25 000 programmes en replay, même sans abonnement. Les abonnés Free ou Free TV+ profitent de plus de 300 chaînes, dont la TNT, et 45 000 programmes en replay inclus.",
        img: "https://eu.app.titanos.tv:443/img/aubf5u4qk4tc3u86ypfju57c8809",
        heroBg: "https://eu.app.titanos.tv:443/img/f4uhjgrqnzh4oxv7p7kfrhyh77on",
        url: "https://smarttv.oqee.net",
        appName: "Free TV",
        appType: "NetTV",
        bg: "linear-gradient(135deg, #ff002f 0%, #7a0016 100%)",
        glow1: "rgba(255, 0, 47, 0.52)",
        glow2: "rgba(140, 0, 30, 0.38)",
        ambilight: { r: 255, g: 0, b: 45 }
      },
      {
        id: "netflix",
        name: "Netflix",
        badge: "FILMS, SÉRIES & CRÉATIONS ORIGINALES",
        desc: "Vous cherchez les séries et les films dont tout le monde parle ? Ils sont tous sur Netflix. Nous proposons des séries, films, documentaires et émissions spéciales de comédie primés.",
        img: "https://eu.app.titanos.tv:443/img/y8hvbh81owjjfs2vgsdkygbfrj44",
        heroBg: "https://eu.app.titanos.tv:443/img/exew7my3ksh1qprwdr8cr30whkd2",
        url: "https://www.netflix.com",
        fallbackUrl: "https://www.netflix.com",
        bg: "linear-gradient(135deg, #e50914 0%, #83050b 100%)",
        glow1: "rgba(229, 9, 20, 0.52)",
        glow2: "rgba(130, 0, 10, 0.35)",
        ambilight: { r: 255, g: 10, b: 20 }
      },
      {
        id: "youtube",
        name: "YouTube",
        badge: "VIDÉOS, MUSIQUE & DIRECTS",
        desc: "Partagez des vidéos avec vos amis, votre famille et le reste du monde.",
        img: "https://eu.app.titanos.tv:443/img/5upsmitbp6muebctbktk6os77is8",
        heroBg: "https://eu.app.titanos.tv:443/img/s5o6fl3zhyrmyhzo3h1kz9rww88o",
        url: "https://www.youtube.com/tv?launch=menu",
        fallbackUrl: "https://www.youtube.com/tv?launch=menu",
        appName: "YouTube",
        appType: "NetTVSpecial",
        bg: "linear-gradient(135deg, #ff0033 0%, #99001f 100%)",
        glow1: "rgba(255, 0, 51, 0.48)",
        glow2: "rgba(200, 30, 0, 0.35)",
        ambilight: { r: 255, g: 20, b: 20 }
      },
      {
        id: "prime",
        name: "Prime Video",
        badge: "AMAZON ORIGINALS, FILMS & SPORT",
        desc: "Amazon Prime comprend Prime Video et bien d’autres avantages, comme l’expédition gratuite sous une journée.",
        img: "https://eu.app.titanos.tv:443/img/r092kydaykhkux1hszycqxis1w04",
        heroBg: "https://eu.app.titanos.tv:443/img/5kjlp97ssn38v2zrh0mbhifbw3x9",
        url: "https://www.primevideo.com",
        fallbackUrl: "https://www.primevideo.com",
        bg: "linear-gradient(135deg, #00a8e1 0%, #004b76 100%)",
        glow1: "rgba(0, 168, 225, 0.52)",
        glow2: "rgba(0, 75, 118, 0.38)",
        ambilight: { r: 0, g: 170, b: 255 }
      },
      {
        id: "disney",
        name: "Disney+",
        badge: "DISNEY • PIXAR • MARVEL • STAR WARS • NATIONAL GEOGRAPHIC",
        desc: "Profitez d’un monde de divertissement sans fin avec Disney+, réunissant les dernières sorties Disney, Pixar, Marvel, Star Wars, National Geographic et bien plus encore.",
        img: "https://eu.app.titanos.tv:443/img/w1lkbaz5xsigrnkd1bav6jmvjxxq",
        heroBg: "https://eu.app.titanos.tv:443/img/2phbt3chcorhywq3mj8tv2hqzds1",
        url: "https://www.disneyplus.com/fr-fr",
        bg: "linear-gradient(135deg, #113ccf 0%, #061556 100%)",
        glow1: "rgba(17, 60, 207, 0.52)",
        glow2: "rgba(6, 21, 86, 0.42)",
        ambilight: { r: 20, g: 70, b: 255 }
      },
      {
        id: "appletv",
        name: "Apple TV",
        badge: "APPLE ORIGINALS & MLS SEASON PASS",
        desc: "Apple TV vous permet d’accéder aux films et séries Apple Originals disponibles en exclusivité, ainsi qu’au MLS Season Pass, tous réunis au même endroit.",
        img: "https://eu.app.titanos.tv:443/img/sabaj5ggsa5ra5qkl3gjqqjeyz08",
        heroBg: "https://eu.app.titanos.tv:443/img/9bq84r3w9uq4rqj9v5n0zf62x60s",
        url: "https://atve.tv.apple.com/94819831-5404-4438-810e-afb648d6a826/tvw_6c13f5c2893b4cb593e593eea79a1447/",
        appName: "Apple TV",
        appType: "NetTV",
        bg: "linear-gradient(135deg, #2c2c2e 0%, #111113 100%)",
        glow1: "rgba(200, 210, 230, 0.42)",
        glow2: "rgba(60, 70, 90, 0.38)",
        ambilight: { r: 200, g: 220, b: 255 }
      },

      // ROW 2 : CHAÎNES TV & REPLAY
      {
        id: "canal",
        name: "CANAL+",
        badge: "LIVE, CINÉMA, SÉRIES & SPORT",
        desc: "Avec l'application CANAL+, suivez les grands moments en live, retrouvez vos émissions en replay et découvrez nos recommandations personnalisées. Cinéma, séries, sport, divertissements, docs et programmes jeunesse.",
        img: "https://eu.app.titanos.tv:443/img/n3zxr64us8eemi8dhsvsls2181eg",
        heroBg: "https://eu.app.titanos.tv:443/img/9717ilrpzm7cjn9lptcgu392krna",
        url: "https://fork.prod.middle-bo.canal.canalplustech.pro/service/titan",
        appName: "CANAL+",
        appType: "NetTV",
        bg: "linear-gradient(135deg, #1c1c1e 0%, #000000 100%)",
        glow1: "rgba(255, 255, 255, 0.3)",
        glow2: "rgba(80, 80, 90, 0.3)",
        ambilight: { r: 220, g: 220, b: 255 }
      },
      {
        id: "francetv",
        name: "france.tv",
        badge: "DIRECT, REPLAY & AVANT PREMIÈRES",
        desc: "Regardez gratuitement tous vos programmes et émissions en replay, de nombreux extraits et avant premières : séries, documentaires, culture et grands événements sportifs en direct.",
        img: "https://eu.app.titanos.tv:443/img/tgre7ga9092rnimkzoyocbpf1zgj",
        heroBg: "https://eu.app.titanos.tv:443/img/d312bt74vxk2q8hgk3nm3s6mibug",
        url: "https://philips-smart-tv.yatta.francetv.fr/",
        appName: "france.tv",
        appType: "NetTV",
        bg: "linear-gradient(135deg, #0023ff 0%, #000e66 100%)",
        glow1: "rgba(0, 60, 255, 0.48)",
        glow2: "rgba(0, 20, 120, 0.38)",
        ambilight: { r: 0, g: 80, b: 255 }
      },
      {
        id: "tf1",
        name: "TF1+",
        badge: "TF1 • TMC • TFX • TF1 SÉRIES FILMS • LCI",
        desc: "Streaming gratuit, TV en direct ou replay : TF1, TMC, TFX, TF1 Séries Films, LCI.",
        img: "https://eu.app.titanos.tv:443/img/bmq53nb2ir7hs2nalgoqqaarkhqg",
        heroBg: "https://eu.app.titanos.tv:443/img/d60nwgyw6ue3x7reek1ajr1evntb",
        url: "https://smart-tv-titanos.prod.p.tf1.fr/",
        appName: "TF1+",
        appType: "NetTV",
        bg: "linear-gradient(135deg, #0033cc 0%, #cc0033 100%)",
        glow1: "rgba(0, 80, 255, 0.48)",
        glow2: "rgba(220, 0, 60, 0.42)",
        ambilight: { r: 60, g: 40, b: 255 }
      },
      {
        id: "m6",
        name: "M6+",
        badge: "GROUPE M6 EN DIRECT & STREAMING",
        desc: "M6+, la plateforme de streaming du Groupe M6. Retrouvez vos programmes en direct et en replay, des avant premières exclusives et toutes les chaînes du Groupe M6.",
        img: "https://eu.app.titanos.tv:443/img/7vdxztzlg7va3lwlicv26xjeh7w4",
        heroBg: "https://eu.app.titanos.tv:443/img/qzq2vw5a6om8c5cxum20gtti6ybe",
        url: "https://smart-alliance--m6plus.6cloud.fr/",
        appName: "M6+",
        appType: "NetTV",
        bg: "linear-gradient(135deg, #ff2d55 0%, #5e5ce6 100%)",
        glow1: "rgba(255, 45, 85, 0.48)",
        glow2: "rgba(94, 92, 230, 0.38)",
        ambilight: { r: 255, g: 40, b: 100 }
      },
      {
        id: "arte",
        name: "ARTE",
        badge: "CHAÎNE CULTURELLE EUROPÉENNE",
        desc: "Chaîne culturelle européenne proposant une plateforme complète de documentaires, films de cinéma, séries, concerts et grands reportages en accès libre.",
        img: "https://eu.app.titanos.tv:443/img/n5eyhqxpry0mcrqncb0x2mb86qsh",
        heroBg: "https://eu.app.titanos.tv:443/img/6an1wk9evrc5eu9ljr12x2lowz7z",
        url: "https://smarttv.arte.tv/static/smartTV-html5-subset/current/?utm_source=titanos&utm_medium=portal&utm_campaign=thumbnail_app",
        appName: "ARTE",
        appType: "NetTV",
        bg: "linear-gradient(135deg, #ff3b00 0%, #8f1d00 100%)",
        glow1: "rgba(255, 59, 0, 0.5)",
        glow2: "rgba(143, 29, 0, 0.38)",
        ambilight: { r: 255, g: 60, b: 0 }
      },
      {
        id: "france24",
        name: "France 24",
        badge: "INFORMATION INTERNATIONALE EN CONTINU",
        desc: "Suivez toute l'actualité internationale en continu 24h/24 en français, anglais, espagnol et arabe : journaux en direct, reportages exclusifs et grands débats.",
        img: "https://eu.app.titanos.tv:443/img/z2jgzb7e9o4o03eimz0e44069l9f",
        heroBg: "https://eu.app.titanos.tv:443/img/z94w59hs8cne9epbjv51u0fipllj",
        url: "http://france24.tv.dotscreen.com/zeasn/index.html?languages=FR,EN,ES,AR",
        appName: "France24",
        appType: "NetTV",
        bg: "linear-gradient(135deg, #009dff 0%, #003e70 100%)",
        glow1: "rgba(0, 157, 255, 0.48)",
        glow2: "rgba(0, 62, 112, 0.38)",
        ambilight: { r: 0, g: 157, b: 255 }
      },

      // ROW 3 : STREAMING, SPORT & MUSIQUE
      {
        id: "max",
        name: "HBO Max",
        badge: "HBO • DC • DISCOVERY • WARNER BROS.",
        desc: "Les films et les séries les plus populaires du moment avec les univers de HBO, DC, Discovery et bien plus encore.",
        img: "https://eu.app.titanos.tv:443/img/qx7so0f46pgk1p2vx5rihnrt8083",
        heroBg: "https://eu.app.titanos.tv:443/img/9o0i2y7kr6t9ql24vij9h6xqmwxr",
        url: "https://titan.play.max.com",
        appName: "HBO Max",
        appType: "NetTV",
        bg: "linear-gradient(135deg, #002be7 0%, #000b4f 100%)",
        glow1: "rgba(0, 85, 255, 0.5)",
        glow2: "rgba(0, 20, 110, 0.4)",
        ambilight: { r: 0, g: 70, b: 255 }
      },
      {
        id: "dazn",
        name: "DAZN",
        badge: "SPORT EN DIRECT & À LA DEMANDE",
        desc: "Profitez de LaLiga, de la Premier League, de la Formule 1, du MotoGP, de l’Euroligue de basket ball et bien plus avec DAZN.",
        img: "https://eu.app.titanos.tv:443/img/jhcsogry1z33x7o4z5qo5dm2cuj5",
        heroBg: "https://eu.app.titanos.tv:443/img/6kfd0wgxy9pcy619kdstacggcvos",
        url: "https://tv.dazn.com/app/titanos/",
        appName: "DAZN",
        appType: "NetTV",
        bg: "linear-gradient(135deg, #1b1b1d 0%, #000000 100%)",
        glow1: "rgba(0, 161, 255, 0.45)",
        glow2: "rgba(40, 40, 50, 0.38)",
        ambilight: { r: 0, g: 160, b: 255 }
      },
      {
        id: "crunchyroll",
        name: "Crunchyroll",
        badge: "ANIMATION JAPONAISE & SIMULCAST",
        desc: "Envie d'anime ? Que ce soit des classiques ou des nouvelles pépites, regardez vos anime préférés en streaming et sans pub sur Crunchyroll.",
        img: "https://eu.app.titanos.tv:443/img/7nxiwi49txej2safpnen68nhs5n4",
        heroBg: "https://eu.app.titanos.tv:443/img/f0579knmqad40w7as5l9jny3roof",
        url: "https://crunchyroll.com/tetsuo/titanos-prod/",
        appName: "Crunchyroll",
        appType: "NetTV",
        bg: "linear-gradient(135deg, #f47521 0%, #8a3800 100%)",
        glow1: "rgba(244, 117, 33, 0.5)",
        glow2: "rgba(138, 56, 0, 0.38)",
        ambilight: { r: 255, g: 115, b: 20 }
      },
      {
        id: "plutotv",
        name: "Pluto TV",
        badge: "CHAÎNES FAST & FILMS GRATUITS",
        desc: "Regardez gratuitement plus de cent chaînes thématiques en direct ainsi que des milliers de films et séries à la demande, sans inscription.",
        img: "https://eu.app.titanos.tv:443/img/kxaemia02va30ht2m4bi053oux6q",
        heroBg: "https://eu.app.titanos.tv:443/img/1cth78ckcqntsf2pk925jajxn7wk",
        url: "https://app-philipsnovatek.pluto.tv/",
        appName: "Pluto TV",
        appType: "NetTV",
        bg: "linear-gradient(135deg, #222228 0%, #09090c 100%)",
        glow1: "rgba(255, 242, 0, 0.42)",
        glow2: "rgba(255, 0, 47, 0.35)",
        ambilight: { r: 255, g: 220, b: 0 }
      },
      {
        id: "rakuten",
        name: "Rakuten TV",
        badge: "VIDÉO À LA DEMANDE & CHAÎNES GRATUITES",
        desc: "Rakuten TV est l’une des principales plateformes de vidéo à la demande en Europe, proposant les dernières nouveautés cinéma ainsi que des chaînes gratuites.",
        img: "https://eu.app.titanos.tv:443/img/wr3pjynpt7qwkfebpj478gx60g9d",
        heroBg: "https://eu.app.titanos.tv:443/img/x3yfw5m347x9zj9h3j05t5nr3wux",
        url: "https://prod-philips-ui40-app.rakuten.tv/",
        appName: "Rakuten TV",
        appType: "NetTV",
        bg: "linear-gradient(135deg, #bf0000 0%, #4d0000 100%)",
        glow1: "rgba(255, 13, 0, 0.48)",
        glow2: "rgba(100, 0, 0, 0.38)",
        ambilight: { r: 255, g: 20, b: 0 }
      },
      {
        id: "deezer",
        name: "Deezer",
        badge: "MUSIQUE, PLAYLISTS & FLOW",
        desc: "Écoutez les meilleurs titres du moment, vos playlists favorites et découvrez de nouveaux morceaux sur votre téléviseur grâce à Deezer Flow.",
        img: "https://eu.app.titanos.tv:443/img/ox0tnk9s1ydrw6xe2i8ej5fst042",
        heroBg: "https://eu.app.titanos.tv:443/img/ppvvva3tx4xszveggke55bcaid1s",
        url: "http://tv2.deezer.com/philips",
        appName: "Deezer",
        appType: "NetTV",
        bg: "linear-gradient(135deg, #a238ff 0%, #3b0d75 100%)",
        glow1: "rgba(162, 56, 255, 0.5)",
        glow2: "rgba(59, 13, 117, 0.4)",
        ambilight: { r: 162, g: 56, b: 255 }
      },

      // ROW 4 : TÉLÉVISION, SYSTÈME & WEB
      {
        id: "settings",
        name: "Paramètres",
        badge: "CONFIGURATION DU TÉLÉVISEUR",
        desc: "Accédez aux réglages d'image, de son, d'Ambilight, du réseau sans fil et des préférences système de votre téléviseur.",
        svgIcon: ICONS_SVG.settings,
        localUI: "setting",
        bg: "linear-gradient(135deg, #48484a 0%, #1c1c1e 100%)",
        glow1: "rgba(160, 170, 190, 0.42)",
        glow2: "rgba(60, 65, 80, 0.38)",
        ambilight: { r: 180, g: 190, b: 210 }
      },
      {
        id: "sources",
        name: "Sources HDMI",
        badge: "HDMI 1 • HDMI 2 • HDMI 3",
        desc: "Basculez instantanément vers vos appareils branchés en HDMI : console de salon, décodeur TV, ordinateur ou boîtier multimédia.",
        svgIcon: ICONS_SVG.sources,
        localUI: "sources",
        bg: "linear-gradient(135deg, #5e5ce6 0%, #242368 100%)",
        glow1: "rgba(94, 92, 230, 0.48)",
        glow2: "rgba(44, 43, 124, 0.38)",
        ambilight: { r: 110, g: 90, b: 255 }
      },
      {
        id: "tv",
        name: "Chaînes TV",
        badge: "TNT & TÉLÉVISION EN DIRECT",
        desc: "Ouvrez le syntoniseur TV intégré pour regarder vos chaînes hertziennes, câble, satellite ou chaînes IP en direct.",
        svgIcon: ICONS_SVG.tv,
        localUI: "tv",
        bg: "linear-gradient(135deg, #0a84ff 0%, #003370 100%)",
        glow1: "rgba(10, 132, 255, 0.48)",
        glow2: "rgba(0, 51, 112, 0.38)",
        ambilight: { r: 10, g: 132, b: 255 }
      },
      {
        id: "epg",
        name: "Guide TV",
        badge: "GRILLE DES PROGRAMMES",
        desc: "Consultez le programme complet des chaînes de télévision en cours et à venir dans la soirée.",
        svgIcon: ICONS_SVG.epg,
        localUI: "epg",
        bg: "linear-gradient(135deg, #30d158 0%, #0f5c24 100%)",
        glow1: "rgba(48, 209, 88, 0.45)",
        glow2: "rgba(15, 92, 36, 0.38)",
        ambilight: { r: 48, g: 209, b: 88 }
      },
      {
        id: "plex",
        name: "Plex",
        badge: "SERVEUR MULTIMÉDIA & STREAMING",
        desc: "Organisez toute votre vidéothèque personnelle et accédez à des centaines de chaînes et films en streaming sur grand écran avec Plex.",
        img: "https://eu.app.titanos.tv:443/img/jyigvwg7ltfo4lo87ssst6floi4u",
        heroBg: "https://eu.app.titanos.tv:443/img/vqrgg17izatqbdfa651srt0b7apc",
        url: "https://app.plex.tv/tv-v5-generic?platform=titan",
        appName: "Plex",
        appType: "NetTV",
        bg: "linear-gradient(135deg, #e5a00d 0%, #593b00 100%)",
        glow1: "rgba(229, 160, 13, 0.48)",
        glow2: "rgba(89, 59, 0, 0.38)",
        ambilight: { r: 229, g: 160, b: 13 }
      },
      {
        id: "custom_web",
        name: "Portail Web",
        badge: "RACCOURCI WEB PERSONNALISÉ",
        desc: "Ajoutez votre propre application web (Jellyfin, Home Assistant, serveur média ou site favori). Appuyez sur la touche 0 ou Options pour modifier l'adresse à tout moment.",
        svgIcon: ICONS_SVG.web,
        isCustom: true,
        bg: "linear-gradient(135deg, #ff9500 0%, #ff2d55 100%)",
        glow1: "rgba(255, 149, 0, 0.5)",
        glow2: "rgba(255, 45, 85, 0.4)",
        ambilight: { r: 255, g: 120, b: 30 }
      }
    ];

    function syncCustomTileData() {
      const customApp = APPS.find((a) => a.isCustom);
      if (!customApp) return;
      const saved = loadCustomShortcut();
      if (saved) {
        customApp.name = saved.name;
        customApp.url = saved.url;
        customApp.badge = "RACCOURCI WEB ENREGISTRÉ";
        customApp.desc = `Accès direct vers ${saved.url}. Appuyez sur OK pour ouvrir ou sur la touche 0 pour modifier ce raccourci local.`;
      } else {
        customApp.name = "Portail Web";
        customApp.url = "";
        customApp.badge = "RACCOURCI WEB PERSONNALISÉ";
        customApp.desc = "Ajoutez votre propre application web (Jellyfin, Home Assistant, serveur média ou site favori). Vos préférences restent stockées uniquement en local sur votre appareil.";
      }
    }
