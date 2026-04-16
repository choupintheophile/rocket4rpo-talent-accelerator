/**
 * v24 — Analytics helper pour GTM dataLayer.
 *
 * Toutes les fonctions de tracking centralisées ici.
 * Chaque event est pushé dans window.dataLayer pour être capté par GTM → GA4.
 *
 * Côté GTM : créer un trigger "Custom Event" pour chaque event name,
 * puis un tag GA4 Event qui forward vers la propriété GA4.
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

// ---------------------------------------------------------------------------
//  Core
// ---------------------------------------------------------------------------

function canTrack(): boolean {
  if (typeof window === "undefined") return false;
  // Respecte le consentement cookies (CookieBanner stocke "cookie-consent")
  try {
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "rejected") return false;
  } catch {
    // localStorage indisponible (incognito strict) → track quand même
  }
  return true;
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!canTrack()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: name,
    ...params,
    _timestamp: new Date().toISOString(),
  });
}

// ---------------------------------------------------------------------------
//  Clicks
// ---------------------------------------------------------------------------

export function trackClick(
  eventName: string,
  label: string,
  destination?: string,
) {
  trackEvent(eventName, {
    click_label: label,
    click_destination: destination || "",
    click_page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

export function trackCTAClick(label: string, destination: string) {
  trackClick("cta_click", label, destination);
}

export function trackHeroCTAClick(label: string, destination: string) {
  trackClick("hero_cta_click", label, destination);
}

export function trackNavbarCTAClick(label: string) {
  trackClick("navbar_cta_click", label, "/rdv");
}

export function trackStickyCTAClick(label: string, destination: string) {
  trackClick("sticky_cta_click", label, destination);
}

export function trackExitIntentClick(label: string, destination: string) {
  trackClick("exit_intent_click", label, destination);
}

export function trackInternalLinkClick(label: string, destination: string) {
  trackClick("internal_link_click", label, destination);
}

export function trackFooterLinkClick(label: string, destination: string) {
  trackClick("footer_link_click", label, destination);
}

// ---------------------------------------------------------------------------
//  Popup / Conversational
// ---------------------------------------------------------------------------

export function trackExitIntentShown() {
  trackEvent("exit_intent_shown", {
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

export function trackConversationalStart() {
  trackEvent("conversational_cta_start", {
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

export function trackConversationalComplete(segment: string) {
  trackEvent("conversational_cta_complete", {
    segment,
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

// ---------------------------------------------------------------------------
//  Scroll depth
// ---------------------------------------------------------------------------

export function trackScrollDepth(depth: number) {
  trackEvent("scroll_depth", {
    depth_percent: depth,
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

// ---------------------------------------------------------------------------
//  Time on page
// ---------------------------------------------------------------------------

export function trackTimeOnPage(seconds: number) {
  trackEvent("time_on_page", {
    seconds,
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

// ---------------------------------------------------------------------------
//  Rage click
// ---------------------------------------------------------------------------

export function trackRageClick(element: string) {
  trackEvent("rage_click", {
    element,
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

// ---------------------------------------------------------------------------
//  Enhanced page view (with UTM params)
// ---------------------------------------------------------------------------

export function trackPageView() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  trackEvent("page_view_enhanced", {
    page_path: url.pathname,
    page_referrer: document.referrer || "",
    utm_source: url.searchParams.get("utm_source") || "",
    utm_medium: url.searchParams.get("utm_medium") || "",
    utm_campaign: url.searchParams.get("utm_campaign") || "",
    utm_content: url.searchParams.get("utm_content") || "",
    utm_term: url.searchParams.get("utm_term") || "",
  });
}
