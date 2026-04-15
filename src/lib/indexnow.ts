/**
 * IndexNow — protocole ouvert (Bing, Yandex, Seznam) pour notifier les moteurs
 * de recherche d'une modification instantanément. Google ne consomme pas
 * IndexNow directement mais Bingbot alimente ensuite son index et c'est
 * souvent re-propagé vers d'autres moteurs.
 *
 * https://www.indexnow.org/documentation
 *
 * Workflow :
 * 1. Clé unique de 8+ caractères hex, publiée en /[key].txt à la racine
 * 2. POST vers l'endpoint IndexNow avec la liste d'URLs modifiées
 * 3. Les moteurs ping l'URL de clé pour vérifier la propriété
 */

// Clé IndexNow — doit correspondre au fichier public/[KEY].txt
// Générée une fois, stable. Regenerer ne casse pas le service : ancienne clé
// reste valide jusqu'à nouvel appel.
export const INDEXNOW_KEY = "rocket4rpo-indexnow-2026-a1b2c3d4e5f6";

const SITE_HOST = "rocket4rpo.com";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";

/**
 * Envoie un batch d'URLs à IndexNow. Renvoie { ok, status, submitted }.
 * - URLs doivent être absolues et pointer vers `SITE_HOST`
 * - Max 10 000 URLs par requête
 * - IndexNow accepte 1 call toutes les 2 secondes environ
 */
export async function submitToIndexNow(urls: string[]): Promise<{
  ok: boolean;
  status: number;
  submitted: number;
  error?: string;
}> {
  if (!urls || urls.length === 0) {
    return { ok: false, status: 400, submitted: 0, error: "no urls" };
  }

  // Sécurise : ne garde que les URLs de notre domaine
  const valid = urls.filter((u) => u.includes(SITE_HOST)).slice(0, 10000);
  if (valid.length === 0) {
    return { ok: false, status: 400, submitted: 0, error: "no valid urls" };
  }

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
        urlList: valid,
      }),
    });

    // Codes acceptés par IndexNow :
    // 200 = OK (traité)
    // 202 = Accepted (en queue)
    // 400 = Bad request (mauvaise URL)
    // 403 = Forbidden (mauvaise clé)
    // 422 = Unprocessable (URLs hors domaine)
    // 429 = Too many requests (ralentir)
    return {
      ok: res.status === 200 || res.status === 202,
      status: res.status,
      submitted: valid.length,
    };
  } catch (e) {
    return {
      ok: false,
      status: 0,
      submitted: 0,
      error: e instanceof Error ? e.message : "network error",
    };
  }
}

/** Ping rapide d'une seule URL (shorthand) */
export async function pingIndexNow(url: string) {
  return submitToIndexNow([url]);
}
