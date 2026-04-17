<script setup>
import {computed } from 'vue';

const props = defineProps({
  departments : {type: Array},
  modelValue: {type: Object},
})

const emit = defineEmits(['update:modelValue', 'close'])

const filters = computed({
  get: () => props.modelValue,
  set: (val)=> emit ('update:modelValue', val)
})

function update(key, value) {
  emit('update:modelValue', {...props.modelValue, [key]:value})
}

function toggleReverse(){
  update('isReversed', !props.modelValue.isReversed);
}

const searchPlaceholder = computed(()=> {
  const map = {
    '': 'Search everywhere',
    'title': 'Search in title',
    'artist': 'Search in artist',
  }
  return map[props.modelValue.searchScope] ?? 'Search the collection'
})

</script>

<template>
  <div id="filters">
      <div id="filters-header">
        <h2>Filters</h2>
        <h2 style = "cursor: pointer" @click="emit('close')">X</h2>
      </div>

      <div class="filter-group">
        <label>General search</label>
        <div class="row-inputs">
          <select :value="filters.searchScope" @change="update('searchScope', $event.target.value)">
            <option value="">Everywhere</option>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
          </select>
          <input type="text" :value="filters.generalSearch" @input="update('generalSearch', $event.target.value)" :placeholder="searchPlaceholder">

          <p>search : {{ filters.generalSearch }}</p>
          <p>scope of the search : {{ filters.searchScope }}</p>
        </div>
      </div>

      <div class="filter-group">
        <label>Department</label>
        <div class="select-wrapper">
          <select :value="filters.department" @change="update('department', $event.target.value)">
            <option value="">Every departments</option>
            <option v-for = "department in props.departments" :key = "department.departmentId" :value = "department.displayName">{{department.displayName}}</option>
          </select>
          <img src="/icons/arrow-icon.svg" class="select-arrow" alt="" />
        </div>

      </div>

      <div class="filter-group">
        <label>Date</label>
        <div class="row-inputs">
          <label class="sublabel">From</label>
          <input type="number" :value="filters.dateFrom" @change="update('dateFrom', $event.target.value)" min="-99999" placeholder="-99999">
          <span>-</span>
          <label class="sublabel">To</label>
          <input type="number" :value="filters.dateTo" @change="update('dateTo', $event.target.value)" max="99999" placeholder="99999">
        </div>
      </div>

      <div class="filter-group">
        <label>Order by</label>
        <div class="row-inputs">
          <select :value="filters.orderBy" @change="update('orderBy', $event.target.value)">
            <option value="alphabeticalTitle">Title (A-Z)</option>
            <option value="reverseAlphabeticalTitle">Title (Z-A)</option>
          </select>
          <button :class="{active : filters.isReversed}" @click="toggleReverse"> Reverse order </button>
        </div>
      </div>
    </div>
</template>

<style scoped>
  #filters{
      background-color:#E8DEDF;
      width: 100%;
      height: 100%;
      align-self: stretch;
      border-left: 3px solid #5A051A;
      padding: 16px;

      display:flex;
      flex-direction: column;

      gap: 24px;
      box-sizing: border-box;
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

  .sublabel {
    font-size: .8rem;
  }

  .select-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
  }

  select {
    width: 100%;
    background: #EEE9E9;
    padding: 7px 30px 7px 12px; /*top right bottom left*/
    border: .1rem solid #5A051A;
    border-radius: 8px;
    font-size: .75rem;
    appearance: none;
    cursor: pointer;
    color: #5A051A;
  }

  .select-arrow {
    position: absolute;
    right: 12px;
    width: 12px;
    height: 12px;
    pointer-events: none;
    transition: transform 0.3s ease;
  }

  select::focus+.select-arrow {
    transform: rotate(180deg);
  }

  select option {
    color: #5A051A;
    background-color: #EEE9E9;
  }

  input[type="text"] {
    width: 12rem;
    background: #EEE9E9 url("/icons/search-icon.svg") no-repeat right 8px center;
    background-size: 15px 15px;
    padding: 7px 30px 7px 12px;
    border: .1rem solid #5A051A;
    border-radius: 8px;
    font-size: .75rem;
    color:#5A051A
  }

  input[type="number"] {
    width: 4.5rem;
    /* width: 4rem; */
    background-color:#EEE9E9;
    padding: 7px 0 7px 12px;
    border: .1rem solid #5A051A;
    border-radius: 8px;
    font-size: .75rem;
    color:#5A051A;

    /* appearance: none; */
  }

  button {
    /* width: 8rem;
    text-align: left; */
    background: #EEE9E9 url("/icons/reverse-icon.svg") no-repeat right 8px center;
    background-size: 15px 15px;
    padding: 7px 30px 7px 12px; /*top right bottom left*/
    border: .1rem solid #5A051A;
    border-radius: 15px;

    font-size: .75rem;
    cursor: pointer;

    transition: background-color .2s, color .2s;
    color:#5A051A
  }

  button.active {
    background: #5A051A url("/icons/reverse-icon-light.svg") no-repeat right 7% center;
    background-size: 15px 15px;
    color: #E8DEDF;
  }

  /* TODO: when selected with options arrow going up instead of down */

</style>
