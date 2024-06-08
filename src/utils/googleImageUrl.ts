import { chromium } from "playwright";

export const googleImageUrl = async (title: string): Promise<string[]> => {

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://images.google.com/')
    await page.waitForLoadState();
    await page.getByLabel('Buscar', { exact: true }).fill(title);
    await page.getByLabel('Buscar con Google', { exact: true }).click()

    await page.locator('div[aria-controls="hdtbMenus"]').waitFor({ state: 'visible', timeout: 5000 }).catch(() => null)
    await page.locator('#tools_1').waitFor({ state: 'visible', timeout: 5000 }).catch(() => null)
    await page.waitForLoadState();
    const imagenes = await page.locator('img').all()

    let urls: string[] = []

    for (let i = 0; i < imagenes.length; i++) {
        if (urls.length == 3) {
         
            await page.close()
            return urls
        }

        const width = await imagenes[i].getAttribute('width').catch(() => null)
        const alt = await imagenes[i].getAttribute('alt').catch(() => null)

        if (width !== null && width !== undefined && parseInt(width) > 200 && urls.length < 3) {
            await imagenes[i].click()

            if (alt!.length > 0) {
                const link = await page.locator(`a[target="_blank"] img[alt="${alt}"]`).all()



                if (link.length == 1) {
                    const url = await link[0].getAttribute('src')
                    if (url) urls.push(url)
                } else if (link.length > 1) {
                    const url = await link[1].getAttribute('src')
                    if (url) urls.push(url)

                }
            }

        }
    }


    await page.close()
    return urls
}