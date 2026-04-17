<script setup>

import {ref} from 'vue';

  const props = defineProps({
    obj: { type: Object, required: true },
  });

  const imageError = ref(false);
  const handleImageError = () => {
    imageError.value = true;
  }

</script>

<template>
  <div id="artwork-card">
    <img
      id = "artwork-picture"
      v-if="props.obj.primaryImageSmall && !imageError"
      :src =  props.obj.primaryImageSmall
      @error = "handleImageError"
      alt = "Artwork"
      loading="lazy"
    />

    <div v-else id="artwork-picture" class="placeholder-box">
      <span>Unavailable picture</span>
    </div>

    <div id = "artwork-informations" >
      <h3>{{ props.obj.title }}</h3>
      <p class = "artwork-artist">{{ props.obj.artistDisplayName }}</p>
      <p class = "artwork-date">{{ props.obj.objectDate }}</p>
      <p class = "artwork-department">{{ props.obj.department }}</p>
    </div>
  </div>
</template>

<style scoped>
  #artwork-card {
    width: 400px;
    height: 200px;

    border-radius: 10px;
    border: 0.5rem solid #E1D5D7;

    overflow: hidden;
    margin: 10px;

    background-color: #E1D5D7;

    position: relative;
    cursor: pointer;

    transition: border-color 0.3s;
  }

  #artwork-picture {
    /* flex:1; */
    width: 50%;
    height: 100%;
    object-fit: cover;

    display:block;
    position: absolute;
    top: 0;
    left: 0;
  }

  #artwork-informations {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;

    background-color: #E8DEDF;
    padding: 20px;

    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;

    transition: background 0.3s, width 0.3s;
    z-index: 2;

  }

  #artwork-informations h3 {
    margin: 0 0 6px;
    font-size: 0.95rem;
    font-weight: 500;
  }

  .artwork-artist {
    margin: 0 0 4px;
    font-weight: 300;
    font-size: 0.85rem;
  }

  .artwork-date {
    margin: 0 0 4px;
    font-size: 0.82rem;
  }

  .artwork-department{
    color: #7a4e59;
    margin: 0;
    font-size: 0.8rem;
    transition: color 0.3s;
  }

  #artwork-card:hover {
    border-color: #5a051a;
  }

  #artwork-card:hover #artwork-picture {
    width: 100%;
    filter: blur(3px);
    transform: scale(1.05)
  }

  #artwork-card:hover #artwork-informations {
    width: 100%;
    background-color:#5a051a90;
    justify-content: flex-end;
    padding: 20px;
    border-radius: 0;

  }

  #artwork-card:hover h3,
  #artwork-card:hover .artwork-artist,
  #artwork-card:hover .artwork-date {
    color:#EEE9E9;
    text-shadow: 0 1px 6px rgba(10, 8, 8, 0.8);
  }

  #artwork-card:hover .artwork-department {
    color: #d4a0ae;
    text-shadow: 0 1px 6px rgba(10, 8, 8, 0.8);
  }

  .placeholder-box {
    background-color: #EEE9E9;

    position: absolute;
    top:0;
    left: 0;
    width: 50%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    padding: 20px;
    box-sizing: border-box;

    font-size: .75rem;
    font-style: italic;
    color: #7a4e59;
    border-right: 1px solid #E1D5D7;
  }

</style>
