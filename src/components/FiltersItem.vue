<script setup>
</script>

<template>
  <div id="filters">
      <div id="filters-header">
        <h2>Filters</h2>
        <h2 style = "cursor: pointer">X</h2>
      </div>

      <div class="filter-group">
        <label>General search</label>
        <div class="row-inputs">
          <select v-model="searchScope">
            <option value="">Everywhere</option>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="description">Description</option>
          </select>
          <input type="text" v-model="generalSearch" placeholder="Search your art">
        </div>
      </div>

      <div class="filter-group">
        <label>Department</label>
        <select v-model="department">
          <option value="">Every departments</option>
          <option value="dep1">European Sculpture and Decorative Arts</option>
          <option value="dep2">Egyptian Art</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Date</label>
        <div class="row-inputs">
          <label class="sublabel">From</label>
          <input type="number" v-model="dateFrom" min="-99999">
          <span>-</span>
          <label class="sublabel">To</label>
          <input type="number" v-model="dateTo" max="99999">
        </div>
      </div>

      <div class="filter-group">
        <label>Order by</label>
        <div class="row-inputs">
          <select v-model="orderBy">
            <option value="alphabeticalTitle">Title (A-Z)</option>
            <option value="reverseAlphabeticalTitle">Title (Z-A)</option>
          </select>
          <button
          :class="{active : isReversed}"
          @click="toggleReverse">
            Reverse order
          </button>
        </div>
      </div>
    </div>
</template>

<style scoped>
  #filters{
      background-color:#E8DEDF;
      width: 30%;
      align-self: stretch;
      border-left: 3px solid #5A051A;
      padding: 16px;
      /* padding-left: 10px; */
      /* max-width: 50vw; */

      display:flex;
      flex-direction: column;

      gap: 24px;
      box-sizing: border-box;
      /* justify-content: space-between; */
      /* padding: 10px; */
  }

  #filters-header {
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .filter-group label {
    font-size: 0.85rem;
    font-weight: 500;
    color: #5A051A;
  }

  .row-inputs {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
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



  #general-search{
    background-color:red;
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




  #date-input{
    display:flex;
    flex-direction: column;

  }

  .from-to-inputs{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  select {
    background: #EEE9E9 url("/icons/arrow-icon.svg") no-repeat right 7% center;
    background-size: 12px 12px;
    padding: 7px 15px 7px 15px; /*top right bottom left*/
    border: .1rem solid #5A051A;
    border-radius: 8px;
    font-size: .75rem;
  }
</style>
