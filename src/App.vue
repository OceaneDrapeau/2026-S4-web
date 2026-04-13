<script setup>
import ArtworkCard from './components/ArtworkCard.vue';
import FiltersItem from './components/FiltersItem.vue';
import PaginationItem from './components/PaginationItem.vue';

</script>

<template>
  <header>
    <h1>The art collection</h1>
    <input type="text" v-model="headerSearch" placeholder="Browse the collection...">
    <button>Filters</button>
  </header>
  <div id="body">
    <div id="artwork-collection">
      <div id="artworks-cards">
        <ArtworkCard/>
        <ArtworkCard/>
      </div>
      <PaginationItem/>
    </div>

    <FiltersItem/>

  </div>
  <footer><p>Made with the Metropolitan Museum of Art API</p></footer>
</template>

<style scoped>

  * {
    font-family: "InriaSans";
    color: #5A051A;
  }

  header {
    display: flex;
    border-width: 0 0 3px 0;
    border-style: solid;
    border-color: #5A051A;
    margin:0px;
    padding:0px 30px;
    flex-wrap: wrap;
    /* flex-direction: row; */
    align-items: center;
    justify-content: space-between;
  }

  h1 {
    /* color: #5A051A; */
    font-family: "WinkySans";
    text-transform: uppercase;
    font-size: xx-large;
    font-weight: 600;
  }

  footer{
    border-width: 3px 0 0 0;
    border-style: solid;
    border-color: #5A051A;
    font-size: small;
    display: flex;
    justify-content: center;
  }

  header input {
    width: 20rem;
    background: #E8DEDF url("/icons/search-icon.svg") no-repeat right 4.75% center;
    background-size: 15px 15px;
    padding: 7px 0px 7px 15px;
    border: .1rem solid #5A051A;
    border-radius: 15px;
    /* overflow: hidden; */
    font-size: .75rem;
  }

  header button {
    width: 7rem;
    text-align: left;
    background: #E8DEDF url("/icons/sort-icon.svg") no-repeat right 7% center;
    background-size: 20px 20px;
    padding: 7px 0px 7px 15px; /*top right bottom left*/
    border: .1rem solid #5A051A;
    border-radius: 15px;
  }

  header button:active {
    background: #5A051A url("/icons/sort-icon-light.svg") no-repeat right 7% center;
    background-size: 20px 20px;
    color: #E8DEDF;
  }

  #artwork-cards {
    display: flex;
    flex-wrap: wrap;
  }
  #artwork-collection {
    display: flex;
    flex-direction: column;
  }

  #body {
    display: flex;
  }

</style>
