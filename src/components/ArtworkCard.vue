<script setup>
  // const props = defineProps({

  // })
</script>

<template>
  <div id="artwork-card">
    <img
      id = "artwork-picture"
      src = "https://collectionapi.metmuseum.org/api/collection/v1/iiif/325693/2345379/main-image"
      alt = "artwork"
    />
    <div id = "artwork-informations" >
      <h3>Vessel with six animal friezes</h3>
      <p class = "artwork-artist">Unknown artist</p>
      <p class = "artwork-date">ca. 10th–8th century BCE</p>
      <p class = "artwork-department">Ancient West Asian Art Department</p>
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
  }
  }
