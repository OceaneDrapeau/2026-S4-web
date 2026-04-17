<script setup>
import { ref, computed, watch } from 'vue';
import ArtworkCard from './components/ArtworkCard.vue';
import FiltersPanel from './components/FiltersPanel.vue';
import PaginationItem from './components/PaginationItem.vue';
import AppLoader from './components/AppLoader.vue';
import { getAllDepartments, getAllObjectsInfo } from './services/api/metAPI';


// Fetch data
const isLoading = ref(false);
const errorMessage = ref(null);
const objects = ref([]);
const currentPage = ref(1);

const totalPages= ref(5); // TODO: change this to actual

const loadData = async (page) => {
  try {
    isLoading.value = true;
    errorMessage.value = null;

    const data = await getAllObjectsInfo(page+5);
    objects.value = data;
  } catch(error) {
    console.error("Erreur : ", {error});
    errorMessage.value = "Oops ! Can't load the collection, try again later."
  } finally {
    isLoading.value = false;
  };
}

loadData(currentPage.value);

watch(currentPage, (newPage) => { loadData (newPage);});

const departments = ref({});

const getDepartments = async() => {
  departments.value = await getAllDepartments()
}

getDepartments();

console.log("departments : ", departments)

console.log("objects : ", objects);

// Filters
const openedFilters = ref(false);

const filters = ref ({
  generalSearch: '',
  searchScope: '',
  department: '',
  dateFrom: '',
  dateTo: '',
  orderBy: 'alphabeticalTitle',
  isReversed: false
})

const headerSearch = ref('')

const activeFiltersCount = computed(()=> {
  const filtersValue = filters.value
  return [
    filtersValue.generalSearch,
    filtersValue.department,
    filtersValue.dateFrom || filtersValue.dateTo,
    filtersValue.isReversed
  ].filter(value => value != '' && value !== false).length
})

const filteredObjects = computed(() => {
  return objects.value.filter(obj => {

    // General search filter
    const generalSearchTerm = filters.value.generalSearch.toLowerCase();
    if (generalSearchTerm) {
      const scope = filters.value.searchScope;
      const matchesSearch = (
        !scope && (
          obj.title?.toLowerCase().includes(generalSearchTerm) ||
          obj.artistDisplayName?.toLowerCase().includes(generalSearchTerm) ||
          obj.artistBio?.toLowerCase().includes(generalSearchTerm)
        )
      ) ||
      (scope === 'title' && obj.title?.toLowerCase().includes(generalSearchTerm)) ||
      (scope === 'artist' && obj.artistDisplayName?.toLowerCase().includes(generalSearchTerm))
      // || (scope === 'description' && obj.artistDisplayBio?.toLowerCase.includes(generalSearchTerm))
      if (!matchesSearch) return false;
    }

    // Departments filter
    if (filters.value.department && obj.department !== filters.value.department) {
      return false;
    }

    // Date filter
    const from = filters.value.dateFrom;
    const to = filters.value.dateTo;
    if (from && obj.objectBeginDate < from) return false;
    if (to && obj.objectEndDate > to) return false;

    return true;

  }).sort((a,b)=> {
    // order by
    const modifier = filters.value.isReversed? -1:1;
    if(a.title < b.title) return -1*modifier;
    if(a.title>b.title)  return 1*modifier;
    return 0;
  });

});

watch(headerSearch, (newVal) => {
      filters.value.generalSearch = newVal;
});


</script>

<template>
  <div id = "page">
    <div id = "loader" v-if = "isLoading"> <AppLoader/></div>
        <!-- <div id = "loader"> <AppLoader/></div> -->

    <header>
      <h1>The art collection</h1>
      <input type="text" v-model="headerSearch" placeholder="Browse the collection...">
      <button
        :class="{ active: openedFilters }"
        @click="openedFilters = !openedFilters"
      >
          Filters
          <span v-if="activeFiltersCount>0" id="filter-count">{{ activeFiltersCount }}</span>
      </button>
    </header>

    <div id="body">
    <!-- TODO : change body to div something or remove it entirely bcause incorrect term -->


      <div id="artwork-collection">

        <div v-if="errorMessage" id="error-container">
          <div class="error-content">
            <img src="/icons/info-icon.svg" alt="Error" class="error-icon" />
            <p>{{ errorMessage }}</p>
            <button @click="loadData(currentPage)" class="retry-button">
              Try again !
            </button>
          </div>
        </div>

        <div id="artworks-cards">
       <!-- <ArtworkCard v-for="item in objects" :key="item.objectID" :obj="item" /> -->
        <ArtworkCard v-for="item in filteredObjects" :key = "item.objectID" :obj="item"/>
      </div>

        <PaginationItem :currentPage="currentPage" @update:currentPage= "currentPage=$event" :totalPages = "totalPages"/>

      </div>

      <div id = "filters-panel" v-if = "openedFilters">
        <FiltersPanel
          :departments="departments"
          v-model="filters"
          @close="openedFilters = false"

        />
      </div>
    </div>
    <footer><p>Made with the Metropolitan Museum of Art API</p></footer>
  </div>
</template>

<style scoped>

  * {
    font-family: "InriaSans";
    color: #5A051A;
  }

  #page {
    display:flex;
    flex-direction: column;
    min-height: 100vh;
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
    cursor: pointer;
  }

  header button.active {
    background: #5A051A url("/icons/sort-icon-light.svg") no-repeat right 7% center;
    background-size: 20px 20px;
    color: #E8DEDF;
  }

  #filter-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #5A051A;
    color: #E8DEDF;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    font-size: .65rem;
    font-weight: 600;
    margin-left: 4px;
  }

  header button.active #filter-count{
    background-color: #E8DEDF;
    color:#5A051A;
  }

  #body {
    display: flex;
    /* position: relative; */
    flex: 1;
  }

  #artwork-collection {
    display: flex;
    /* flex-direction: row; */
    flex-direction: column;
    flex: 1;
    /* flex-wrap: wrap; */
    /* align-items: center; */
  }

  #artwork-cards {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  #filters-panel {
    width: 40%;
    flex-shrink: 0;
    display: flex;
  }

  #loader {
    /* background-color: #5A051A; */
    height: 100vh;
    width: 100vw;
    position: fixed;
    top:0;
    left: 0;

    background-color: #5A051A;

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 99999;
  }

  #error-container {
    flex:1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    text-align: center;
  }

  .error-content{
    background-color: #E8DEDF;
    border: 3px solid #5A051A;
    border-radius: 15px;
    padding: 30px;
    max-width: 400px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .error-content p {
    font-weight: 500;
    margin: 0;
  }

  .error-icon{
    width: 40px;
    height: 40px;
  }

  .retry-button {
    background-color: #5A051A;
    color: #EEE9E9;
    border: none;
    padding: 10px 25px;
    border-radius: 20px;
    font-family: "InriaSans";
    cursor: pointer;
    transition: transform 0.2s, background-color 0.2s;
  }

  .retry-button:hover {
    background-color: #7a0723;
    transform: scale(1.05);
  }

  .retry-button:active {
    transform: scale(0.95);
  }
</style>
