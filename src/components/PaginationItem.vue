<script setup>
  import {ref} from 'vue';
  const totalPages = 5;
  const currentPage = ref(1);
</script>

<template>
  <div id="pagination">
    <img
      id="goBackward"
      src="/icons/arrow-icon.svg"
      alt="go to previous page"
      :class="{disabled: currentPage === 1 }"
      @click="currentPage>1 && currentPage--"
    />
    <p
      v-for="page in totalPages"
      :key="page"
      :class="{active: currentPage === page}"
      @click="currentPage = page">
      {{ page }}
    </p>

    <img
      id="goForward"
      src="/icons/arrow-icon.svg"
      alt="go to next page"
      :class="{disabled: currentPage === totalPages }"
      @click="currentPage<totalPages && currentPage++"
    />
  </div>
</template>

<style scoped>
  #pagination {
      align-self: center;
      display:flex;
      align-items: center;
      justify-content: space-around;
      padding: 4px;
    }

  #pagination img {
    width: 10px;
    height: 10px;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  #pagination img.disabled {
    opacity: .3;
    cursor: default;
    pointer-events: none;
  }

  #goBackward {
    transform: rotate(90deg);
  }

  #goForward {
    transform: rotate(-90deg);
  }

  #pagination p {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin: 0 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  #pagination p:hover {
    background-color: #E1D5D7;
  }

  #pagination p.active {
    background-color: #5a051a;
    color: #EEE9E9;
  }
</style>
