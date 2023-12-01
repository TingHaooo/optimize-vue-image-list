<script setup>
defineProps(["src", "title", "placeHolderSrc"]);
</script>

<template>
  <div class="container__item">
    <p>{{ title }}</p>
    <!-- 引入 NuxtImg，根據不同類型的來源可以優化圖片，並加上 lazy loading
    如果有不同裝置，應該正確設計 srcset，降低圖片大小 -->
    <NuxtImg :src="placeHolderSrc" loading="lazy" class="placeholder-img" />
    <NuxtImg :src="src" loading="lazy" />
  </div>
</template>

<style>
.container__item {
  /* 圖片都標示清楚的 width 和 height，避免 CLS */
  width: calc(50% - 16px);
  height: 400px;
  margin: 8px;
  position: relative;
}

img {
  width: 100%;
  height: calc(100% - 50px);
  object-fit: cover;
  position: absolute;
  bottom: 0;
  left: 0;
}

.placeholder-img {
  z-index: -1;
}
</style>
