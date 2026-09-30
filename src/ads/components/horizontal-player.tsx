import { useEffect, useRef, useState } from "react";

const HORIZONTAL_TAG =
  "https://pubads.g.doubleclick.net/gampad/ads" +
  "?iu=/21775744923/external/single_preroll_skippable" +
  "&sz=640x480" +
  "&ciu_szs=300x250,728x90" +
  "&gdfp_req=1" +
  "&output=vast" +
  "&unviewed_position_start=1" +
  "&env=vp" +
  "&correlator=";

const FALLBACK_VIDEO = "https://res.cloudinary.com/dg8cwbkdy/video/upload/f_mp4/ad-2_swwsq";

const FALLBACK_RETRY_DELAY = 2000;

const HorizontalAd = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackVideoRef = useRef<HTMLVideoElement>(null);

  const adsLoaderRef = useRef<any>(null);
  const adsManagerRef = useRef<any>(null);
  const displayContainerRef = useRef<any>(null);

  const fallbackRetryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [ready, setReady] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  /**
   * Switch to fallback video.
   */
  const startFallback = () => {
    console.log("Horizontal: starting fallback video");

    setReady(false);
    setShowFallback(true);
  };

  /**
   * Play fallback video.
   */
  const playFallback = () => {
    const video = fallbackVideoRef.current;

    if (!video) {
      console.error("Horizontal: fallback video element not found");
      return;
    }

    video
      .play()
      .then(() => {
        console.log("Horizontal: fallback video playing");
      })
      .catch((error) => {
        console.error("Horizontal: fallback autoplay failed:", error);

        fallbackRetryTimeoutRef.current = setTimeout(() => {
          playFallback();
        }, FALLBACK_RETRY_DELAY);
      });
  };

  /**
   * Start fallback after React renders it.
   */
  useEffect(() => {
    if (!showFallback) return;

    const video = fallbackVideoRef.current;

    if (!video) return;

    video.currentTime = 0;

    playFallback();

    return () => {
      if (fallbackRetryTimeoutRef.current) {
        clearTimeout(fallbackRetryTimeoutRef.current);

        fallbackRetryTimeoutRef.current = null;
      }
    };
  }, [showFallback]);

  useEffect(() => {
    if (!window.google?.ima) {
      console.error("Google IMA SDK is not loaded");

      startFallback();

      return;
    }

    const adContainer = adContainerRef.current;

    const video = videoRef.current;

    if (!adContainer || !video) {
      console.error("Horizontal ad elements are not available");

      startFallback();

      return;
    }

    /**
     * Create IMA display container.
     */
    const displayContainer = new window.google.ima.AdDisplayContainer(adContainer, video);

    displayContainerRef.current = displayContainer;

    /**
     * Create AdsLoader.
     */
    const adsLoader = new window.google.ima.AdsLoader(displayContainer);

    adsLoaderRef.current = adsLoader;

    /**
     * AdsManager loaded.
     */
    const onAdsManagerLoaded = (event: any) => {
      console.log("Horizontal: AdsManager loaded");

      try {
        const adsManager = event.getAdsManager(video);

        adsManagerRef.current = adsManager;

        /**
         * Real ad started.
         */
        adsManager.addEventListener(window.google.ima.AdEvent.Type.STARTED, () => {
          console.log("Horizontal: real ad started");

          setShowFallback(false);
          setReady(false);
        });

        /**
         * Ad loaded.
         */
        adsManager.addEventListener(window.google.ima.AdEvent.Type.LOADED, () => {
          console.log("Horizontal: real ad loaded");

          try {
            adsManager.start();
          } catch (error) {
            console.error("Horizontal: failed to start IMA ad:", error);

            startFallback();
          }
        });

        /**
         * Impression.
         */
        adsManager.addEventListener(window.google.ima.AdEvent.Type.IMPRESSION, () => {
          console.log("Horizontal: ad impression");
        });

        /**
         * Complete.
         */
        adsManager.addEventListener(window.google.ima.AdEvent.Type.COMPLETE, () => {
          console.log("Horizontal: ad completed");
        });

        /**
         * Skipped.
         */
        adsManager.addEventListener(window.google.ima.AdEvent.Type.SKIPPED, () => {
          console.log("Horizontal: ad skipped");
        });

        /**
         * IMA error/no-fill.
         */
        adsManager.addEventListener(window.google.ima.AdErrorEvent.Type.AD_ERROR, (event: any) => {
          console.error("Horizontal: IMA ad error:", event.getError());

          startFallback();
        });

        setReady(true);

        /**
         * Automatically initialize and start.
         *
         * No Play Ad button.
         */
        try {
          displayContainer.initialize();

          adsManager.init(adContainer.clientWidth, adContainer.clientHeight, window.google.ima.ViewMode.NORMAL);

          adsManager.start();
        } catch (error) {
          console.error("Horizontal: automatic IMA start failed:", error);

          startFallback();
        }
      } catch (error) {
        console.error("Horizontal: could not create AdsManager:", error);

        startFallback();
      }
    };

    /**
     * IMA loader error.
     */
    const onAdError = (event: any) => {
      console.error("Horizontal: IMA loader error:", event.getError());

      startFallback();
    };

    adsLoader.addEventListener(window.google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, onAdsManagerLoaded);

    adsLoader.addEventListener(window.google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);

    /**
     * Request real ad.
     */
    const request = new window.google.ima.AdsRequest();

    request.adTagUrl = HORIZONTAL_TAG;

    request.linearAdSlotWidth = adContainer.clientWidth;

    request.linearAdSlotHeight = adContainer.clientHeight;

    adsLoader.requestAds(request);

    /**
     * Cleanup.
     */
    return () => {
      if (fallbackRetryTimeoutRef.current) {
        clearTimeout(fallbackRetryTimeoutRef.current);
      }

      try {
        adsManagerRef.current?.destroy();
        adsLoaderRef.current?.destroy();
      } catch {
        // Ignore IMA cleanup errors.
      }

      adsManagerRef.current = null;
      adsLoaderRef.current = null;
      displayContainerRef.current = null;

      const fallbackVideo = fallbackVideoRef.current;

      if (fallbackVideo) {
        fallbackVideo.pause();
        fallbackVideo.removeAttribute("src");
        fallbackVideo.load();
      }
    };
  }, []);

  /**
   * Retry fallback video if the source itself fails.
   */
  const handleFallbackError = () => {
    console.error("Horizontal: fallback video failed. Retrying...");

    if (fallbackRetryTimeoutRef.current) {
      clearTimeout(fallbackRetryTimeoutRef.current);
    }

    fallbackRetryTimeoutRef.current = setTimeout(() => {
      const video = fallbackVideoRef.current;

      if (!video) return;

      video.load();

      video.play().catch((error) => {
        console.error("Horizontal: fallback retry failed:", error);

        handleFallbackError();
      });
    }, FALLBACK_RETRY_DELAY);
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* IMA video */}
      <video ref={videoRef} className={`absolute inset-0 h-full w-full object-contain ${showFallback ? "hidden" : ""}`} playsInline muted />

      {/* IMA container */}
      <div ref={adContainerRef} className={`absolute inset-0 h-full w-full ${showFallback ? "hidden" : ""}`} />

      {/* Fallback video */}
      <video
        ref={fallbackVideoRef}
        src={FALLBACK_VIDEO}
        className={`absolute inset-0 h-full w-full object-contain ${showFallback ? "block" : "hidden"}`}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        onLoadedData={() => {
          console.log("Horizontal: fallback video loaded");
        }}
        onPlay={() => {
          console.log("Horizontal: fallback video playing");
        }}
        onError={handleFallbackError}
      />

      {/* Loading */}
      {!ready && !showFallback && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-white/70">Loading advertisement...</span>
        </div>
      )}
    </div>
  );
};

export default HorizontalAd;
