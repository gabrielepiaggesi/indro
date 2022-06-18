export async function loadJSON (url) {
    const res = await fetch(url);
    return await res.json();
}