<script setup>
import ImageCard from "../component/ImageCard.vue";
import { vInfiniteScroll } from "@vueuse/components";

/**
 * 拉取資料分成 server 和 client 兩邊
 * server 先拉取較少資料，減少 LCP 的時間
 * client 使用 infinite scroll 拉取剩下的資料
 */

const { data: initImagesData } = await useFetch("/api/images", {
  query: { limit: 10 },
});

const images = ref([]);

async function onLoadMore() {
  $fetch("/api/images", {
    method: "GET",
    query: { offset: 10 + images.value.length, limit: 10 },
  }).then((moreImagesData) => {
    images.value.push(...moreImagesData.images);
  });
}
</script>

<template>
  <div
    v-infinite-scroll="[onLoadMore, { distance: 0, interval: 500 }]"
    class="container"
  >
    <ImageCard
      v-for="(img, idx) in initImagesData.images"
      :key="idx"
      :title="img.title"
      :src="img.src"
      :placeHolderSrc="img.placeholder"
    />
    <ImageCard
      v-for="(img, idx) in images"
      :key="idx"
      :title="img.title"
      :src="img.src"
      :placeHolderSrc="img.placeholder"
    />
  </div>
</template>

<style>
.container {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
