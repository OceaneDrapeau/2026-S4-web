<script setup>
import { getObjectById } from '@/services/api/metAPI';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppLoader from './AppLoader.vue';

// Fetch data
const isLoading = ref(false);
const errorMessage = ref(null);
const artworkData = ref(null);

const imageError = ref(false);

const route = useRoute();
const router = useRouter();

const loadArtwork = async () =>
{
  try {
    isLoading.value = true;
    errorMessage.value = null;

    const data = await getObjectById(route.params.id);
    artworkData.value = data;

  } catch (error) {
    console.error ("Error : ", {error});
    errorMessage.value = "Oops ! Can't load the selected artwork, try again later."

  } finally {
    isLoading.value = false;
};
}

onMounted(() => {
  loadArtwork();
});

const handleImageError = () => {
  imageError.value = true;
}

</script>

<template>
  <div class = "detail-container">
    <div id = "loader" v-if="isLoading"><AppLoader/></div>

    <nav class="detail-nav">
        <button @click="router.push('/')" class="back-button">
          Back to collection
        </button>
    </nav>

    <div v-if="artworkData && !errorMessage" class="artwork-layout">

      <div class="image-section">
        <img
          id = "artwork-picture"
          v-if="artworkData.primaryImage && !imageError"
          :src="artworkData.primaryImage"
          :alt="artworkData.title"
          @error = "handleImageError"
          loading="lazy"
        />
        <div v-else class="placeholder-box-detail">
          <span>Image Unavailable</span>
        </div>
      </div>

      <div class = "info-section">
        <span class="artwork-department">{{ artworkData.department }}</span>
        <h1>{{ artworkData.title }}</h1>
        <p class="artwork-artist">By <strong>{{ artworkData.artistDisplayName || 'Unknown Artist' }}</strong></p>


        <div class="bio-section" v-if="artworkData.artistDisplayBio && artworkData.artistDisplayName!=''">
          <h3>About the artist</h3>
          <p>{{ artworkData.artistDisplayBio }}</p>
        </div>

        <div class="technical-details">
          <p v-if="artworkData.objectDate"><strong>Date:</strong> {{ artworkData.objectDate }}</p>
          <p v-if="artworkData.medium"><strong>Medium:</strong> {{ artworkData.medium }}</p>
        </div>
    </div>
  </div>

    <div v-else-if="error" class="error-msg">
      {{ error }}
      <button @click="router.push('/')">Return home</button>
    </div>

  </div>

</template>

<style scoped>
.detail-container {
  min-height: 100vh;
  padding: 40px;
  background-color: #EEE9E9;
}

.detail-nav {
  margin-bottom: 30px;
}

.back-button {
  background: none;
  border: 1px solid #5A051A;
  color: #5A051A;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-family: "InriaSans";
  transition: all 0.2s;
}

.back-button:hover {
  background-color: #5A051A;
  color: #EEE9E9;
}

.artwork-layout {
  display: flex;
  gap: 50px;
  max-width: 1200px;
  margin: 0 auto;
}

.image-section {
  flex: 1;
}

.image-section img {
  width: 100%;
  border-radius: 15px;
  border: 3px solid #5A051A;
}

.placeholder-box-detail {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #E1D5D7;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  color: #7a4e59;
  font-style: italic;
}

.info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.artwork-department {
  color: #7a4e59;
  text-transform: uppercase;
  font-size: 0.8rem;
}

h1 {
  font-family: "WinkySans";
  font-size: 2.5rem;
  margin: 0;
  color: #5A051A;
}

.artwork-artist {
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.bio-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #D1C7C9;
}

.bio-section h3 {
  margin-bottom: 10px;
}

.technical-details {
  margin-top: 20px;
  font-size: 0.9rem;
}

.error-msg {
  text-align: center;
  margin-top: 100px;
  color: #5A051A;
}



@media (max-width: 800px) {
  .artwork-layout { flex-direction: column; }
}
</style>


