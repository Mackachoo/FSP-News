<script lang="ts">
  import { onMount } from "svelte";

  export let cid: string;
  export let categories: string[];
  function cat2str(): string {
    if (categories.length === 0) {
      return "";
    }
    return "categories=" + String(categories) + "&";
  }
  export let page: number;

  const apiKey = "DjNxuBDFjO7wiveBrbi1Jtrmy54UkjZmCPm9de4B";
  // So the limit is set to 10, but the free plan on the API returns only 3. I could have it page through but I'm already running out of requests.
  const endpoint = `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&locale=${cid}&${cat2str()}page=${page}&limit=10`;

  interface Article {
    title: string;
    snippet: string;
    description: string;
    url: string;
    image_url: string;
    source: string;
    categories: string[];
    published_at: string;
  }
  let articles: Article[] = [];

  onMount(async () => {
    let storedArticles = localStorage.getItem(
      `articles-${cid}-${String(categories)}-${page}`,
    );
    let cacheAge = localStorage.getItem("cacheAge");
    if (
      !storedArticles ||
      !cacheAge ||
      Date.now() - Number(cacheAge) > 600000
    ) {
      console.log("cacheAge is null or expired");
      const response = await fetch(endpoint);
      const data = await response.json();
      articles = data.data;
      localStorage.setItem(
        `articles-${cid}-${String(categories)}-${page}`,
        JSON.stringify(articles),
      );
      localStorage.setItem("cacheAge", String(Date.now()));
    } else {
      console.log("cacheAge is not null or expired");
      console.log(storedArticles);
      articles = JSON.parse(storedArticles);
    }
  });
</script>

<div class="flex flex-col space-y-4">
  {#each articles as article}
    <div
      class="container border-gray-800 border-2 rounded p-4 flex flex-row space-x-4 justify-between"
    >
      <div class="flex flex-col justify-between">
        <div>
          <h4 class="h4 pb-2">{article.title}</h4>
          <p>{article.description}</p>
        </div>
        <div class="flex flex-row justify-between items-center">
          <div class="flex space-x-4">
            {#each article.categories as category}
              <div class="bg-gray-800 rounded py-1 px-2 capitalize">
                {category}
              </div>
            {/each}
          </div>
          <a
            href={article.url}
            target="_blank"
            class="my-6 mx-4 text-orange-600 hover:text-orange-800"
          >
            <i class="fa-solid fa-arrow-up-right-from-square fa-xl" />
          </a>
        </div>
      </div>
      <img
        src={article.image_url}
        alt={article.title}
        class="rounded w-1/3 object-cover"
      />
    </div>
  {/each}
</div>
