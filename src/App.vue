<script setup>
import ArtworkCard from './components/ArtworkCard.vue';

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
        <div id="artwork-card-hover">
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
      </div>
      <div id="pagination">
        <img id="goBackward" src="/icons/arrow-icon.svg" alt="go to previous page"/>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <img id="goForward" src="/icons/arrow-icon.svg" alt="go to next page"/>
      </div>
    </div>

    <div id="filters">
      <div id="box-header">
        <h2>Filters</h2>
        <h2>X</h2>
      </div>

      <div id="general-search">
        <label for="search-scope-select">General search</label>

        <select name="search-scope-select">
          <option value="">Everywhere</option>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="description">Description</option>
        </select>

        <input type="text" v-model="generalSearch" placeholder="Search your art">
      </div>
      <div>
        <label for="department-select">Department</label>
        <select name="department-select">
          <option value="">Every departments</option>
          <option value="nameDepartment">European Sculpture and Decorative Arts</option>
          <option value="nameDepartment">European Sculpture and Decorative Arts</option>
          <option value="nameDepartment">European Sculpture and Decorative Arts</option>
          <option value="nameDepartment">European Sculpture and Decorative Arts</option>
          <option value="nameDepartment">European Sculpture and Decorative Arts</option>
          <option value="nameDepartment">European Sculpture and Decorative Arts</option>
          <option value="nameDepartment">European Sculpture and Decorative Arts</option>
        </select>
      </div>
      <div id="date-input">
        <p>Date</p>
        <div class="from-to-inputs">
          <label for="dateFrom">From</label>
          <input type="number" v-model="dateFrom" min="-99999">
          <p> - </p>
          <label for="dateTo">To</label>
          <input type="number" v-model="dateTo" max="99999">
        </div>
      </div>
      <div id="order-by">
        <label for="order-by-select">Order by</label>
        <select name="order-by-select">
          <option value="alphabeticalTitle">Title (A-Z)</option>
          <option value="reverseAlphabeticalTitle">Title (Z-A)</option>
        </select>
        <button>Reverse order</button>
      </div>


    </div>

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

  #order-by button {
    width: 8rem;
    text-align: left;
    background: #E8DEDF url("/icons/reverse-icon.svg") no-repeat right 7% center;
    background-size: 15px 15px;
    padding: 7px 0px 7px 15px; /*top right bottom left*/
    border: .1rem solid #5A051A;
    border-radius: 15px;
  }

  #order-by button:active {
    background: #5A051A url("/icons/reverse-icon-light.svg") no-repeat right 7% center;
    background-size: 15px 15px;
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


  #artwork-card-hover {
    width: 400px;
    height: 200px;

    padding: 10px;
    border-radius: 10px;
    border: 0.5rem solid #5A051A;

    overflow: hidden;
    margin: 10px;
    background-color: #E1D5D7;

  }

  #artwork-card-hover #artwork-informations {
    background-color:#5a051a90;
    position: relative;
    width: 400px;
    height: 200px;
    top: -220px;
    left: -20px;
  }

  #artwork-card-hover .artwork-artist, #artwork-card-hover h3, #artwork-card-hover .artwork-date {
    color:#EEE9E9;
  }

  #artwork-card-hover .artwork-department {
    color: #EEE9E9;
  }

  #artwork-card-hover #artwork-picture{
    width: 100%;
    max-height: 100%;
  }

  #body {
    display: flex;
  }

  #filters{
    background-color:#E8DEDF;
    width: 30%;
    align-self: stretch;
    border-left: 3px solid;
    padding-left: 10px;
    /* max-width: 50vw; */

    display:flex;
    flex-direction: column;
    justify-content: space-between;
    /* padding: 10px; */
  }
  #general-search{
    background-color:red;
  }

  select {
    background: #EEE9E9 url("/icons/arrow-icon.svg") no-repeat right 7% center;
    background-size: 12px 12px;
    padding: 7px 15px 7px 15px; /*top right bottom left*/
    border: .1rem solid #5A051A;
    border-radius: 8px;
    font-size: .75rem;
  }

  /* TODO: when selected with options arrow going up instead of down */
  #general-search input {
    width: 15rem;
    background: #EEE9E9 url("/icons/search-icon.svg") no-repeat right 4.75% center;
    background-size: 15px 15px;
    padding: 7px 0px 7px 15px;
    border: .1rem solid #5A051A;
    border-radius: 8px;
    /* overflow: hidden; */
    font-size: .75rem;
  }

  #date-input input{
    width: 4rem;
    background-color:#EEE9E9;
    background-size: 15px 15px;
    padding: 7px 0px 7px 15px;
    border: .1rem solid #5A051A;
    border-radius: 8px;
    /* overflow: hidden; */
    font-size: .75rem;
  }

  #box-header {
    display:flex;
    justify-content: space-between;
  }


  #date-input{
    display:flex;
    flex-direction: column;

  }

  .from-to-inputs{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #pagination {
    align-self: flex-end;
    display:flex;
    align-items: center;
    justify-content: space-around;
  }

  #pagination img {
    width: 15px;
    height: 15px;
  }

</style>
