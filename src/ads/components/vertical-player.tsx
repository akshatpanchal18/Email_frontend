import { useEffect, useRef, useState } from "react";

const VERTICAL_TAG =
  "https://pubads.g.doubleclick.net/gampad/ads" + "?iu=/21775744923/external/single_vertical_ad_samples" + "&sz=360x640" + "&output=vast" + "&unviewed_position_start=1" + "&env=vp" + "&correlator=";

/**
 * Direct Cloudinary video URL.
 *
 * IMPORTANT:
 * Use the res.cloudinary.com URL.
 * Do NOT use player.cloudinary.com/embed.
 */
const FALLBACK_VIDEO = "https://res.cloudinary.com/dg8cwbkdy/video/upload/v1790772184/ad-1_duqjal.mp4";

const VerticalAd = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackVideoRef = useRef<HTMLVideoElement>(null);

  const adsLoaderRef = useRef<any>(null);
  const adsManagerRef = useRef<any>(null);
  const displayContainerRef = useRef<any>(null);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  /**
   * Switch from IMA to fallback video.
   */
  const startFallback = () => {
    console.log("Vertical IMA ad failed. Starting fallback video.");

    setReady(false);
    setError(true);
  };

  /**
   * Once React has rendered the fallback video,
   * explicitly start playback.
   */
  useEffect(() => {
    if (!error) return;

    const fallbackVideo = fallbackVideoRef.current;

    if (!fallbackVideo) {
      console.error("Vertical fallback video element not found.");
      return;
    }

    fallbackVideo.currentTime = 0;

    fallbackVideo
      .play()
      .then(() => {
        console.log("Vertical fallback video started.");
      })
      .catch((err) => {
        console.error("Could not autoplay vertical fallback video:", err);
      });
  }, [error]);

  useEffect(() => {
    /*
     * IMA SDK is required for real ads.
     * If it isn't loaded, immediately use fallback.
     */
    if (!window.google?.ima) {
      console.error("Google IMA SDK is not loaded.");

      startFallback();
      return;
    }

    const adContainer = adContainerRef.current;
    const video = videoRef.current;

    if (!adContainer || !video) {
      console.error("Vertical ad elements are not available.");
      return;
    }

    /*
     * Create IMA display container.
     */
    const displayContainer = new window.google.ima.AdDisplayContainer(adContainer, video);

    displayContainerRef.current = displayContainer;

    /*
     * Create AdsLoader.
     */
    const adsLoader = new window.google.ima.AdsLoader(displayContainer);

    adsLoaderRef.current = adsLoader;

    /**
     * Called when IMA successfully creates AdsManager.
     */
    const onAdsManagerLoaded = (event: any) => {
      console.log("Vertical AdsManager loaded.");

      try {
        const adsManager = event.getAdsManager(video);

        adsManagerRef.current = adsManager;

        /*
         * Real ad started.
         */
        adsManager.addEventListener(window.google.ima.AdEvent.Type.STARTED, () => {
          console.log("Vertical real ad started.");

          setError(false);
          setReady(false);
        });

        /*
         * Impression.
         */
        adsManager.addEventListener(window.google.ima.AdEvent.Type.IMPRESSION, () => {
          console.log("Vertical ad impression.");
        });

        /*
         * Ad completed.
         */
        adsManager.addEventListener(window.google.ima.AdEvent.Type.COMPLETE, () => {
          console.log("Vertical ad completed.");
        });

        /*
         * Ad skipped.
         */
        adsManager.addEventListener(window.google.ima.AdEvent.Type.SKIPPED, () => {
          console.log("Vertical ad skipped.");
        });

        /*
         * Important:
         *
         * If IMA cannot actually play an ad,
         * this error path starts the fallback.
         */
        adsManager.addEventListener(window.google.ima.AdErrorEvent.Type.AD_ERROR, (event: any) => {
          console.error("Vertical AdsManager error:", event.getError());

          startFallback();
        });

        /*
         * The AdsManager is ready.
         *
         * This does NOT necessarily mean that a real ad
         * has started. The actual ad can still fail later.
         */
        setReady(true);
      } catch (err) {
        console.error("Could not create vertical AdsManager:", err);

        startFallback();
      }
    };

    /**
     * IMA loader error.
     *
     * This covers cases where the ad request itself fails.
     */
    const onAdError = (event: any) => {
      console.error("Vertical IMA loading error:", event.getError());

      startFallback();
    };

    adsLoader.addEventListener(window.google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, onAdsManagerLoaded);

    adsLoader.addEventListener(window.google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);

    /*
     * Create ad request.
     */
    const request = new window.google.ima.AdsRequest();

    request.adTagUrl = VERTICAL_TAG;

    request.linearAdSlotWidth = adContainer.clientWidth;

    request.linearAdSlotHeight = adContainer.clientHeight;

    /*
     * Request real ad.
     */
    adsLoader.requestAds(request);

    /*
     * Cleanup.
     */
    return () => {
      try {
        adsManagerRef.current?.destroy();
        adsLoaderRef.current?.destroy();
      } catch {
        // Ignore IMA cleanup errors.
      }

      adsManagerRef.current = null;
      adsLoaderRef.current = null;
      displayContainerRef.current = null;

      /*
       * Stop fallback video if component unmounts.
       */
      const fallbackVideo = fallbackVideoRef.current;

      if (fallbackVideo) {
        fallbackVideo.pause();
        fallbackVideo.removeAttribute("src");
        fallbackVideo.load();
      }
    };
  }, []);

  /**
   * Start the real IMA ad.
   *
   * initialize() is called from the user's click,
   * which satisfies browser interaction requirements.
   */
  const startAd = () => {
    if (!displayContainerRef.current) {
      console.error("Vertical IMA display container is not available.");
      return;
    }

    if (!adsManagerRef.current) {
      console.error("Vertical IMA AdsManager is not available.");
      return;
    }

    if (!adContainerRef.current) {
      console.error("Vertical ad container is not available.");
      return;
    }

    try {
      /*
       * Initialize IMA after user interaction.
       */
      displayContainerRef.current.initialize();

      adsManagerRef.current.init(adContainerRef.current.clientWidth, adContainerRef.current.clientHeight, window.google.ima.ViewMode.NORMAL);

      /*
       * Start the real ad.
       */
      adsManagerRef.current.start();
    } catch (err) {
      console.error("Could not start vertical IMA ad:", err);

      startFallback();
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/*
       * ------------------------------------------------
       * REAL IMA VIDEO
       * ------------------------------------------------
       */}
      <video ref={videoRef} className={`absolute inset-0 h-full w-full object-contain ${error ? "hidden" : ""}`} playsInline muted />

      {/*
       * ------------------------------------------------
       * IMA CONTAINER
       * ------------------------------------------------
       */}
      <div ref={adContainerRef} className={`absolute inset-0 h-full w-full ${error ? "hidden" : ""}`} />

      {/*
       * ------------------------------------------------
       * FALLBACK VIDEO
       *
       * One video only.
       * loop=true makes it play continuously.
       * ------------------------------------------------
       */}
      <video
        ref={fallbackVideoRef}
        src={FALLBACK_VIDEO}
        className={`absolute inset-0 h-full w-full object-contain ${error ? "block" : "hidden"}`}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        onLoadedData={() => {
          console.log("Vertical fallback video loaded.");
        }}
        onPlay={() => {
          console.log("Vertical fallback video playing.");
        }}
        onError={(event) => {
          const video = event.currentTarget;

          console.error("Vertical fallback video error:", {
            src: video.currentSrc,
            code: video.error?.code,
            message: video.error?.message,
          });
        }}
      />

      {/*
       * ------------------------------------------------
       * IMA LOADING
       * ------------------------------------------------
       */}
      {!ready && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-white/70">Loading advertisement...</span>
        </div>
      )}

      {/*
       * ------------------------------------------------
       * PLAY REAL IMA AD
       * ------------------------------------------------
       */}
      {ready && !error && (
        <button type="button" onClick={startAd} className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-5 py-2 text-sm font-medium text-black shadow-lg">
          Play Ad
        </button>
      )}
    </div>
  );
};

export default VerticalAd;
