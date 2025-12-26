

const SUPABASE_URL = "https://cvxrsyznfgojlzclkzdn.supabase.co";
const SUPABASE_KEY = "sb_publishable_Iz7YD8LwfWwC7X6dNFsKKA_ALpeOoUh";

async function pingSupabase() {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/reviews?select=*&limit=1`, {
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            }
        });

        if (res.ok) {
            console.log("Ping réussi !");
        } else {
            console.error("Erreur ping:", res.status);
        }
    } catch (err) {
        console.error("Erreur réseau ping:", err.message);
    }
}

pingSupabase();
