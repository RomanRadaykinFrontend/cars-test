<template>
  <div class="pagination">
    <n-pagination
        :item-count="total"
        show-size-picker
        :page-sizes="[10,20,30]"
        v-model:page="skip"
        v-model:page-size="limit"
        v-if="items.length"
    />
  </div>
  <div class="search-input">
    <n-input v-model:value="searchString"/>
    <div>
      <n-button type="primary" :disabled="!searchString" @click="searchByString" class="search-input__button">Search
      </n-button>
    </div>
    <div>
      <n-button type="error" @click="resetSearchResult" class="search-input__button">Reset
      </n-button>
    </div>
  </div>
  <div class="parameters-switch" v-if="items.length">
    <n-form-item label="Hide general parameters">
      <n-switch v-model:value="switchValue"/>
    </n-form-item>
  </div>
  <h1 class="no-data-text" v-if="!items.length && !loading"> Nothing was found! Please enter correct value. </h1>
  <div class="card-wrapper">
    <CarCard v-for="item in items" :key="item.id" :car="item" :loading="loading" @select-car="goToPickedCar"/>
  </div>
  <router-view/>
</template>

<script lang="ts">
import {useMessage} from "naive-ui";
import {defineComponent, computed, onMounted, ref, watch} from "vue";
import {storeProxy} from "../store";
import {NCard, NPagination, NInput, NButton, NSwitch, NFormItem} from "naive-ui";
import CarCard from "../features/car-card/CarCard.vue";
import {GetCarsParams} from "../services/car";
import {CarLibraryItem} from "../types/cars";
import router from "../router";
import {useRoute} from "vue-router";

export default defineComponent({
  name: "App",
  components: {NCard, CarCard, NPagination, NInput, NButton, NSwitch, NFormItem},
  setup: () => {
    const route = useRoute();
    const message = useMessage();
    const switchValue = ref(false)
    const loading = ref(false)
    const items = computed((): CarLibraryItem[] => switchValue.value && storeProxy.car.cars.length ?
        storeProxy.car.carsWithoutGeneralParams :
        storeProxy.car.cars
    );
    const total = computed(() => storeProxy.car.carsTotal);

    const skip = ref(route.query.skip ? Number(route.query.skip) + 1 : 1)
    const limit = ref(route.query.limit ? Number(route.query.limit) : 10)
    const searchString = ref(route.query.searchString as string ?? '')

    const fillQuery = (searchString: string, limit: number, skip: number) => {
      const query: Record<string, string | number> = {limit, skip: skip - 1}
      if (!!searchString) query.searchString = searchString
      router.push({path: '/list', query})
    }

    const correctSkip = computed(() => skip.value === 1 ? 10 : (skip.value - 1) * 10)

    const isRequestNeed = ref(true)

    const changeSearchParams = (isNeedRequest: boolean) => {
      if (isNeedRequest) {
        fillQuery(searchString.value, limit.value, skip.value)
        getData(correctSkip.value, limit.value, searchString.value)
        return
      }
      isRequestNeed.value = true
    }

    watch([limit, skip], () => {
      changeSearchParams(isRequestNeed.value)
    })
    const searchByString = () => {
      skip.value = 1
      limit.value = 10
      changeSearchParams(true)
      isRequestNeed.value = false
    }
    const resetSearchResult = () => {
      searchString.value = ''
      skip.value = 1
      limit.value = 10
      changeSearchParams(true)
      isRequestNeed.value = false
    }

    const goToPickedCar = ({name, id}: { name: string, id: string }) => {
      router.push({
        path: `/list/${id}`,
        query: {name}
      })
    }

    const getData = async (skip = 0, limit = 10, searchString: string | undefined = undefined) => {
      const searchParams: GetCarsParams = {skip, limit}
      if (!!searchString) searchParams.searchString = searchString
      try {
        loading.value = true
        await storeProxy.car.getCars(searchParams);
        loading.value = false
      } catch (err) {
        message.error("Ошибка при получении данных!");
        console.error(err);
        loading.value = false
      }
    };

    onMounted(() => {
      getData(correctSkip.value, limit.value, searchString.value)
      fillQuery(searchString.value, limit.value, skip.value)
    })

    return {
      items, total, skip, limit, searchString, goToPickedCar,
      searchByString, resetSearchResult, switchValue, loading
    };
  },
});
</script>
<style scoped lang="scss">
.card-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 30px;
  padding: 20px;

}

.pagination {
  padding: 10px 0;
}

.parameters-switch, .search-input, .pagination, .no-data-text {
  padding-left: 45px;
}

.parameters-switch, {
  margin-top: 10px;
}

.search-input {
  width: 500px;
  display: flex;

  &__button {
    margin-left: 10px;
  }
}
</style>

