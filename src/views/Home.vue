<template>
  <div>
    <home-statistics />

    <home-sales />

    <home-team-sales />
  </div>
</template>

<script>

import HomeStatistics from "../components/HomeStatistics";
import HomeSales from "../components/HomeSales";
import HomeTeamSales from '../components/HomeTeamSales';

export default {
  name: "Home",
  components: {
    HomeStatistics,
    HomeSales,
    HomeTeamSales,
  },
};
</script>
