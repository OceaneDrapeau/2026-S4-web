<script setup>
import { ref, computed, watch } from 'vue';
import ArtworkCard from './components/ArtworkCard.vue';
import FiltersPanel from './components/FiltersPanel.vue';
import PaginationItem from './components/PaginationItem.vue';
import { getAllDepartments, getAllObjectsInfo } from './services/api/metAPI';


// Fetch data
const isLoading = ref(false);
const objects = ref([]);
const currentPage = ref(1);

const totalPages= ref(5); // TODO: change this to actual

const loadData = async (page) => {
  try {
    isLoading.value = true;
    const data = await getAllObjectsInfo(page+5);
    objects.value = data;
  } catch(error) {
    console.error("Erreur : ", {error});
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

</script>

<template>
  <div id = "page">
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
        <div id="artworks-cards">
       <ArtworkCard v-for="item in objects" :key="item.objectID" :obj="item" />
      </div>

        <PaginationItem v-model = "currentPage" :totalPages = "totalPages"/>
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
    background-color: #54051A;
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
</style>
