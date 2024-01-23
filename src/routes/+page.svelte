<script lang="ts">
  import TopNews from "../components/TopNews.svelte";
  import { Autocomplete, popup } from "@skeletonlabs/skeleton";
  import { categoryOptions, countryOptions } from "../components/options";
  import { fly } from "svelte/transition";
  import type {
    AutocompleteOption,
    PopupSettings,
  } from "@skeletonlabs/skeleton";

  let input: string = "";
  let country: string = "United Kingdom";
  let cid: string = "gb";
  let categories: string[] = [];
  let page: number = 1;

  function countrySelection(
    event: CustomEvent<AutocompleteOption<string>>,
  ): void {
    country = event.detail.label;
    cid = event.detail.value;
  }

  function flipCategory(category: string): void {
    if (categories.includes(category)) {
      categories = categories.filter((c) => c !== category);
    } else {
      categories = [...categories, category];
    }
  }

  let popupSettings: PopupSettings = {
    event: "focus-click",
    target: "popupAutocomplete",
    placement: "bottom",
  };
</script>

<div
  class="container h-full w-full lg:w-2/3 mx-auto flex justify-start items-center pt-10"
>
  <div class="px-4 w-full">
    <div class="flex flex-row justify-between">
      <h1 class="h1">FSP News</h1>
      <div class="w-1/4">
        <input
          class="input autocomplete rounded"
          type="search"
          name="autocomplete-search"
          bind:value={input}
          placeholder="Choose country..."
          use:popup={popupSettings}
        />
        <div
          data-popup="popupAutocomplete"
          class="w-1/4 p-1 bg-gray-600 rounded max-h-96 overflow-scroll"
        >
          <Autocomplete
            bind:input
            options={countryOptions}
            allowlist={countryOptions.map((option) => option.value)}
            on:selection={countrySelection}
          />
        </div>
      </div>
    </div>
    <div class="w-full h-[2px] bg-gray-100 mt-1 mb-6" />
    {#if country != ""}
      <h3 class="h3">
        Top Stories in {country[0] === "U" ? "the" : ""}
        {country}
      </h3>

      <!-- Categories Buttons -->
      <div class="flex flex-row flex-wrap justify-between my-2">
        {#each categoryOptions as category}
          <button
            class={"my-2 mx-1 py-1 px-2 text-gray-900 bg-orange-600 rounded capitalize overflow-clip " +
              (categories.includes(category)
                ? "bg-opacity-100"
                : "bg-opacity-50")}
            on:click={() => flipCategory(category)}
          >
            {category}
          </button>
        {/each}
      </div>

      <!-- News Articles -->
      {#key [cid, categories, page]}
        <div in:fly={{ x: "50%", delay: 500 }} out:fly={{ x: "-50%" }}>
          <TopNews {cid} {categories} {page} />
        </div>
      {/key}
    {/if}
    <div class="group w-full flex justify-center">
      <button
        class="btn btn-primary"
        on:click={() => (page = page - 1)}
        disabled={page === 1}
      >
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <button class="btn btn-primary" on:click={() => (page = page + 1)}>
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </div>
</div>
