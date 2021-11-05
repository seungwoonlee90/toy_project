import os
import aiohttp
import asyncio
import aiofiles


async def img_downloader(session, img):
    img_name = img.split("/")[-1].split("?")[0]
    try:
        os.mkdir("./images")
    except FileExistsError:
        pass

    async with session.get(img) as response:
        if response.status == 200:
            async with aiofiles.open(f"./images/{img_name}", mode="wb") as file:
                img_data = await response.read()
                await file.write(img_data)


async def fetch(session, url, i):
    print(i + 1)
    headers = {
        "X-Naver-Client-Id": "id",
        "X-Naver-Client-Secret": "key"
    }  # 개인 api 정보를 입력해주세요

    async with session.get(url, headers=headers) as response:
        result = await response.json()
        items = result["items"]
        images = [item["link"] for item in items]
        await asyncio.gather(*[img_downloader(session, img) for img in images])


async def main():
    Base_url = "https://openapi.naver.com/v1/search/image"
    keyword = "keyword"  # keyword를 입력해주세요
    urls = [
        f"{Base_url}?query={keyword}&display=20&start={1 + i*20}" for i in range(10)]
    async with aiohttp.ClientSession() as session:
        await asyncio.gather(*[fetch(session, url, i) for i, url in enumerate(urls)])

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
