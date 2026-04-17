<script setup>
import { ref, computed, watch } from 'vue';
import ArtworkCard from '../components/ArtworkCard.vue';
import FiltersPanel from '../components/FiltersPanel.vue';
import PaginationItem from '../components/PaginationItem.vue';
import AppLoader from '../components/AppLoader.vue';
import { getAllDepartments, getAllObjectsInfo } from '../services/api/metAPI';

// Init
const isLoading = ref(false);
const errorMessage = ref(null);

// Data to be fetched
const objects = ref([]);
const departments = ref({});

// Pagination
const currentPage = ref(1);
const totalPages= ref(5); // TODO: change this to actual number of pages

// Filters
const filters = ref ({
  generalSearch: '',
  searchScope: '',
  department: '',
  dateFrom: '',
  dateTo: '',
  orderBy: 'alphabeticalTitle',
  isReversed: false
})

const headerSearch = ref(''); // TODO : move this with header
const openedFilters = ref(false);


// Fetch data
const loadData = async (page) => {
  try {
    isLoading.value = true;
    errorMessage.value = null;

    const data = await getAllObjectsInfo(page+5);
    objects.value = data;
  } catch(error) {
    console.error("Error : ", {error});
    errorMessage.value = "Oops ! Can't load the collection, try again later."
  } finally {
    isLoading.value = false;
  };
}

loadData(currentPage.value);

const getDepartments = async() => {
  departments.value = await getAllDepartments()
}

getDepartments();


// Filters

// number of active filters
const activeFiltersCount = computed(()=> {
  const filtersValue = filters.value
  return [
    filtersValue.generalSearch,
    filtersValue.department,
    filtersValue.dateFrom || filtersValue.dateTo,
    filtersValue.isReversed
  ].filter(value => value != '' && value !== false).length
})

// Filters application
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

// Watchers

watch(headerSearch, (newVal) => {
      filters.value.generalSearch = newVal;
});

watch(currentPage, (newPage) => { loadData (newPage);});


</script>

<template>
  <div id = "page">
    <div id = "loader" v-if = "isLoading"> <AppLoader/></div>

    <!-- TODO: separate header and footer to components to reuse them across the site -->
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
      <p>current page : {{ currentPage }}</p>
    </header>

    <div id="body">

      <div id="artwork-collection">

        <!-- Error handling-->
        <div v-if="errorMessage" id="error-container">
          <div class="error-content">
            <img src="/icons/info-icon.svg" alt="Error" class="error-icon" />
            <p>{{ errorMessage }}</p>
            <button @click="loadData(currentPage)" class="retry-button">
              Try again !
            </button>
          </div>
        </div>

        <!-- Call artwork component (for...loop) | uses filteredObjects -->
        <div id="artworks-cards">
          <ArtworkCard v-for="item in filteredObjects" :key = "item.objectID" :obj="item"/>
        </div>

        <!-- Pagination -->
        <PaginationItem :currentPage="currentPage" @update:currentPage= "currentPage=$event" :totalPages = "totalPages"/>

      </div>

      <!-- Filters -->
      <div id = "filters-panel" v-if = "openedFilters">
        <FiltersPanel
          :departments="departments"
          v-model="filters"
          @close="openedFilters = false"

        />
      </div>
    </div>
    <!-- TODO: separate header and footer to components to reuse them across the site -->
    <footer><p>Made with the Metropolitan Museum of Art API</p></footer>
  </div>
</template>


